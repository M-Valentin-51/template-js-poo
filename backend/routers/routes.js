const app = require("../index");
const express = require("express");
const router = express.Router();
const User = require("../routers/user.routes");

router.use(User);

module.exports = router;
