const { music, artis } = require("../models");
//fungsi custome
const response = require("../helpers/response");

module.exports = {
  read: async (req, res) => {
    try {
      const Music = await music.findAll({
        include: {
          model: artis,
          as: "artis",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        attributes: {
          exclude: ["artisId", "updatedAt", "createdAt"],
        },
      });
      return response(res, 200, 1, Music);
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
  create: async (req, res) => {
    try {
      const Music = await music.create(req.body);
      return response(res, 200, 1, Music);
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const Music = await music.findOne({
        include: {
          model: artis,
          as: "artis",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        attributes: {
          exclude: ["artisId", "updatedAt", "createdAt"],
        },
        where: { id: id },
      });

      if (!Music) return response(res, 400, 0, "Music not pound");

      return response(res, 200, 1, Music);
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
};
