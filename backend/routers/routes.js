const app = require("../index");
const express = require("express");
const router = express.Router();

const user = require("./user.routes");

router.use(user);

module.exports = router;
