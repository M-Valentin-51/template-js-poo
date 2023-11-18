const AbstactManger = require("./AbstractManager");

class UserManger extends AbstactManger {
  constructor() {
    super({ model: "user" });
  }

  async insert(user) {
    return this.model.create({
      data: user,
    });
  }

  async update(user, userId) {
    return this.model.update({
      where: {
        id: Number(userId),
      },
      data: user,
    });
  }
}

module.exports = UserManger;
