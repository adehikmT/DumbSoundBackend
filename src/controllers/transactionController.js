const { transaction, user } = require("../models");

const response = require("../helpers/response");

const userActive = async (status, id) => {
  let a = status.toLowerCase();
  if (a === "approve") {
    await user.update({ subscribe: 1 }, { where: { id: id } });
  } else {
    await user.update({ subscribe: 0 }, { where: { id: id } });
  }
};

module.exports = {
  read: async (req, res) => {
    try {
      const User = await user.findOne({ where: { id: req.user.id } });
      const Transaction = await transaction.findAll({
        include: {
          model: user,
          attributes: {
            exclude: ["listAs", "password", "createdAt", "updatedAt"],
          },
          where: User.listAs === 0 ? { id: User.id } : "",
        },
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        order: [["id", "DESC"]],
      });
      return response(res, 200, 1, Transaction);
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
  create: async (req, res) => {
    const { userId, attache, status } = req.body;
    try {
      const User = await user.findOne({ where: { id: userId } });
      if (!User) {
        await deleteUpload(req.file.filename);
        return response(res, 400, 0, "User not found");
      }

      const Tstatus = await transaction.findOne({
        where: { userId: userId },
        order: [["id", "DESC"]],
      });

      if (Tstatus !== null) {
        if (User.subscribe === 1 || Tstatus.statusPay < 2) {
          await deleteUpload(attache);
          return response(res, 400, 0, "cannot do transaction now");
        }
      }

      const Transaction = await transaction.create(req.body);
      await userActive(status, userId);
      const inserted = await transaction.findOne({
        include: {
          model: user,
          attributes: {
            exclude: ["listAs", "password", "createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        where: { id: Transaction.id },
      });
      return response(res, 200, 1, inserted);
    } catch (err) {
      await deleteUpload(attache);
      return response(res, 500, 0, err);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const check = await transaction.findOne({
        where: { id },
      });

      if (!check) return response(res, 400, 0, "transaction not found");

      await userActive(req.body.status, check.userId);
      await transaction.update(req.body, {
        where: { id: id },
      });

      const updated = await transaction.findOne({
        include: {
          model: user,
          attributes: {
            exclude: ["listAs", "password", "createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        where: { id: id },
      });
      return response(res, 200, 1, updated);
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = await transaction.findOne({
        where: { id },
      });
      const destroy = await transaction.destroy({ where: { id } });
      if (destroy < 1) {
        return response(res, 400, 0, "transaction not found");
      }
      await userActive("Reject", userId.userId);
      return response(res, 200, 1, { id });
    } catch (err) {
      return response(res, 500, 0, "Internal Server Error");
    }
  },
  readSort: async (req, res) => {
    try {
      const { idSort } = req.params;
      const status = null;
      idSort === 1
        ? (status = "approve")
        : idSort == 2
        ? (status = "pendding")
        : (status = "cencel");
      const User = await user.findOne({ where: { id: req.user.id } });
      const Transaction = await transaction.findAll({
        include: {
          model: user,
          attributes: {
            exclude: ["listAs", "password", "createdAt", "updatedAt"],
          },
          where: User.listAs === 0 ? { id: User.id } : "",
        },
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        where: { status },
        order: [["id", "DESC"]],
      });
      return response(res, 200, 1, Transaction);
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
};
