const { artis } = require("../models");
//fungsi custome
const response = require("../helpers/response");

module.exports = {
  read: async (req, res) => {
    try {
      const Artis = await artis.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });
      return response(res, 200, 1, Artis);
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
  create: async (req, res) => {
    try {
      const Artis = await artis.create(req.body);
      return response(res, 200, 1, Artis);
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
};
