const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const { sendEmail } = require("../middlewares/sendGridMail.middleware");

const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.SECRET_KEY || "secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      ok: true,
      message: "User logged in successfully",
      data: {
        id: user._id,
        email: user.email,
        rol: user.rol,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: err,
    });
  }
};

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    rol = "USER",
    phone = null,
    about = null,
  } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: await User.hashPassword(password),
      rol,
      phone,
      about,
    });

    await sendEmail(newUser);

    res.status(201).json({
      ok: true,
      message: "User has been created successfully",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err,
    });
  }
};

const professionalRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    rol = "PROFESSIONAL",
    phone = null,
    about = null,
    skills = [],
  } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: await User.hashPassword(password),
      rol,
      phone,
      about,
      skills,
    });

    res.status(201).json({
      ok: true,
      message: "response message register",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err,
    });
  }
};

const logout = async (req, res) => {
  res.status(204).json({
    ok: true,
    message: "response message logout",
  });
};

module.exports = {
  login,
  register,
  professionalRegister,
  logout,
};
