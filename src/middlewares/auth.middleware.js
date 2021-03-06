const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const emailAlreadyInUse = (email) => {
  return User.findOne({ email }).then((user) => {
    if (user) {
      return Promise.reject("E-mail already in use");
    }
  });
};

const userWithEmailExist = (email) => {
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject("E-mail not found");
    }
  });
};

const userPasswordMatch = (password, { req }) => {
  return User.findOne({ email: req.body.email }).then(async (user) => {
    if (!(await user.comparePassword(password, user.password))) {
      return Promise.reject("Wrong username or password");
    }
  });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (token === null) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.SECRET_KEY || "secret", (err, user) => {
    console.log(err);
    if (err) return res.status(403).json({ error: "Forbidden" });

    next();
  });
};

module.exports = {
  emailAlreadyInUse,
  userWithEmailExist,
  userPasswordMatch,
  authenticateToken,
};
