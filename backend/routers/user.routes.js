const express = require("express");
const Router = express.Router();
const auth = require("../services/auth");

const User = require("../controllers/user.controller");

class UserRouter {
  constructor() {
    Router.post("/user", auth.hashPassword, User.create);
    Router.put("/user/:id", User.update);
    Router.get("/user/:id", User.readById);
    Router.get("/user/", User.readAll);
    Router.delete("/user/:id", User.deleteById);
  }
}
new UserRouter();

module.exports = Router;
