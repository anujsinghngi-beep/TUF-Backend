const { users } = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret_key = "Secret_key";
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isMatch = await users.findOne({ where: { username } });
    if (isMatch) {
      return res.status(400).json({
        message: "User already exist...",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await users.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(200).json({
      message: "User created Successfully",
      error: null,
      User: newUser,
    });
  } catch (error) {
    console.log("Error while creating the user...", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isMatch = await users.findOne({ where: { username } });
    if (!isMatch) {
      return res.status(200).json({
        message: "User doesn't Exist...",
      });
    }

    const decryptPassword = await bcrypt.compare(password, isMatch.password);
    if (!decryptPassword) {
      return res.status(400).json({
        message: "Invalid credentials....",
      });
    }

    const token = await jwt.sign({ id: isMatch.id, username }, secret_key, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Login Successfully..",
      token:token
    });
  } catch (error) {
    console.log("Error while login the user", error);
  }
};

module.exports = { createUser, loginUser };
