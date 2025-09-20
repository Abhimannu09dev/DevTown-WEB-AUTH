const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const password = "DummyPassword";

// Password hashed
bcrypt.hash(password, 15, (err, hashedPassword) => {
  if (err) {
    console.error("Error hashing password:", err);
    return;
  }

  console.log("Hashed Password:", hashedPassword);

  //   Create a JWT token with the hashed password
  //   Dummy user

  const user = {
    id: 1,
    username: "anmolkunwar07@gmail.com",
    role: "Admin",
    hashedPassword: hashedPassword,
  };

  const secretKey = "hackerStayAway";

  // Generate JWT Token
  const token = JWT.sign(
    { userId: user.id, username: user.username, role: user.role },
    secretKey,
    { expiresIn: "1h" }
  );

  console.log("Generated JWT Token:", token);
});
