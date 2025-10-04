const express = require("express");
const { createSubCategory } = require("../Controllers/SubCategory");
const { authMiddleware } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.route('/create').post(authMiddleware, createSubCategory);

module.exports= router;