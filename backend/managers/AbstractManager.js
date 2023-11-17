const { PrismaClient } = require("@prisma/client");

class AbstactManger {
  prisma = new PrismaClient();

  constructor({ model }) {
    this.model = this.prisma[model];
  }

  async deleteById(id) {
    return this.model.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async findByUserId(id) {
    return this.model.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async findAll() {
    return this.model.findMany({});
  }
}

module.exports = AbstactManger;
