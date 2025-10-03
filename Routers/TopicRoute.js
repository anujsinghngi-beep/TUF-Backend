const express = require("express");
const { createTopic, getAllTopics, getAllTopicsWithoutOrm } = require("../Controllers/TopicController");
const { authMiddleware } = require("../Middlewares/authMiddleware");
const router = express.Router();

router.route("/create").post(authMiddleware,createTopic);
router.route("/all").post(authMiddleware,getAllTopicsWithoutOrm)

module.exports = router;