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

  async update(data, userId) {
    return this.model.update({
      where: {
        id: Number(userId),
      },
      data,
    });
  }
}

module.exports = UserManger;
