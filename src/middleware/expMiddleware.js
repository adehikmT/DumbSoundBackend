const { user, transaction } = require("../models");
const response = require("../helpers/response");

const dayjs = require("dayjs");

module.exports = {
  userExp: async (req, res, next) => {
    const { id } = req.user;
    try {
      const User = await user.findOne({ where: { id } });
      if (User.listAs === 1) {
        next();
      } else {
        if (User.subscribe === 0) {
          return response(res, 401, 0, "Ups.. Subscribe first!");
        } else {
          const expaired = await transaction.findOne({
            where: { userId: id },
            order: [["id", "DESC"]],
          });
          var dueDate = expaired.dueDate;
          var theDay = dayjs().format("YYYY/MM/DD");
          var due = dayjs(dueDate);
          var Exp = due.diff(theDay, "day");
          if (Exp < 1) {
            await user.update({ subscribe: 0 }, { where: { id } });
            await transaction.update(
              { statusPay: 2 },
              { where: { id: expaired.id } }
            );
            return response(res, 401, 0, "Subscribe Expaired!");
          } else {
            next();
          }
        }
      }
    } catch (err) {
      return response(res, 401, 0, err);
    }
  },
};
