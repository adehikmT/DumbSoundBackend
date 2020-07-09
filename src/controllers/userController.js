const { user } = require("../models");

module.exports = Cek = async (req, res) => {
  try {
    const { id } = req.user;
    const User = await user.findOne({
      where: { id },
    });
    return response(res, 200, 1, User);
  } catch (err) {
    return response(res, 500, 0, err);
  }
};
