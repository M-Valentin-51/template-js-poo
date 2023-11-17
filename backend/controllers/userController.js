const UserManager = require("../managers/UserManager");
const auth = require("../services/auth");
const { Prisma } = require("@prisma/client");

const userManager = new UserManager();

class UserController {
  static async create(req, res) {
    this.email = req.body.email;
    this.name = req.body.name;
    try {
      this.hashPassword = await auth.hashPassword(req.body.password);
    } catch (err) {
      res.sendStatus(500);
    }

    try {
      const result = await userManager.insert({
        email: this.email,
        name: this.name,
        hashPassword: this.hashPassword,
      });

      const user = { ...result };
      delete user.hashPassword;

      res.status(201).json(user);
    } catch (err) {
      console.error(err);

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        //Foreign key constraint failed on the field
        if (err.code == "P2003") {
          res.sendStatus(404);
        }
        // Unique constraint failed on the {constraint}
        if (err.code == "P2002") {
          res.status(400).send("Le pseudo ou l'adresse email existe déjà");
        } else {
          res.sendStatus(500);
        }
      }
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await userManager.deleteById(id);

      res.sendStatus(204);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // An operation failed because it depends on one or more records that were required but not found. {cause}
        if (e.code == "P2025") {
          res.sendStatus(404);
        } else {
          res.sendStatus(500);
        }
      }
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      await userManager.update(data, id);

      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // An operation failed because it depends on one or more records that were required but not found. {cause}
        if (e.code == "P2025") {
          res.sendStatus(404);
        } else {
          res.sendStatus(500);
        }
      }
    }
  }

  static async readById(req, res) {
    const { id } = req.params;

    try {
      const customers = await userManager.findByUserId(id);

      if (customers) {
        res.json(customers);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  static async readAll(req, res) {
    try {
      const customers = await userManager.findAll();

      if (customers) {
        res.json(customers);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = UserController;
