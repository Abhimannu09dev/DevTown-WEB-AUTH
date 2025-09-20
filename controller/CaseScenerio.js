// Scenerio: Role based access in a school system according to role
// THe password will be always incorrect as the demo data doesn't have hased password and it compares hashed password

const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Demo user data
const users = [
  {
    id: 1,
    username: "admin@example.com",
    password: "AdminPassword",
    role: "Admin",
  },
  {
    id: 2,
    username: "teacher@example.com",
    password: "TeacherPassword",
    role: "Teacher",
  },
  {
    id: 3,
    username: "student@example.com",
    password: "StudentPassword",
    role: "Student",
  },
];

// Function to authenticate user and create JWT token
const authenticateUser = (username, password) => {
  const user = users.find((u) => u.username === username);

  if (!user) {
    console.log("User not found");
    return;
  }
  // Compare the plain password with the hashed password
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      console.error("Error comparing password:", err);
      return;
    }

    if (!isMatch) {
      console.log("Incorrect password");
      return;
    }

    console.log("Password matched!");

    // Create JWT token with the user ID, username, and role
    const secretKey = "hackerStayAway"; // Replace with your secret key

    const token = JWT.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    console.log("Generated JWT Token:", token);

    // Return the token
    return token;
  });
};

// Function to verify token and check user role
const verifyToken = (token) => {
  const secretKey = "hackerStayAway";

  JWT.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return;
    }

    console.log("Decoded Token:", decoded);
    const { role } = decoded; // Extract role from decoded token

    // Return role-based message
    if (role === "Admin") {
      console.log("Welcome Admin");
    } else if (role === "Teacher") {
      console.log("Welcome Teacher");
    } else if (role === "Student") {
      console.log("Welcome Student");
    } else {
      console.log("Role not recognized");
    }
  });
};

// Simulate logging in and getting a token
const username = "admin@example.com";
const password = "AdminPassword";

authenticateUser(username, password);
