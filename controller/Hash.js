const bcrypt = require("bcrypt");

const password = "DummyPassword";

bcrypt.hash(password, 15, (err, hash) => {
  console.log("Hashed Password", hash);
});
