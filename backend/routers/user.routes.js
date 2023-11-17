const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.post("/user", UserController.create);
router.put("/user", UserController.update);
router.get("/user/:id", UserController.readById);
router.get("/user/", UserController.readAll);
router.delete("/user/:id", UserController.deleteById);

module.exports = router;
