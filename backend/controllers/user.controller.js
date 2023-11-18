const UserManager = require("../managers/UserManager");
const { Prisma } = require("@prisma/client");

const userManager = new UserManager();

class User {
  static create = async (req, res) => {
    const data = {
      email: req.body.email,
      name: req.body.name,
      hashPassword: req.body.hashPassword,
    };

    try {
      const result = await userManager.insert(data);

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
  };

  static update = async (req, res) => {
    const { id } = req.params;

    try {
      await userManager.update(req.body, id);

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
  };

  static readById = async (req, res) => {
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
  };

  static deleteById = async (req, res) => {
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
  };

  static readAll = async (req, res) => {
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
  };
}

module.exports = User;
