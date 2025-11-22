const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/adminAuthController");

const router = express.Router();

// Register new admin
router.post("/register",
  body("name").notEmpty().withMessage("Name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
  register
);

// Login admin
router.post("/login", login);

module.exports = router;
