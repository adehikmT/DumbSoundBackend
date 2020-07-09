const { user } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../helpers/response");

module.exports = {
  register: async (req, res) => {
    try {
      const { email } = req.body;
      const User = await user.findOne({
        where: { email },
      });
      if (User) return response(res, 409, 0, "Email already exists");
      const userCreated = await user.create(req.body);
      const token = jwt.sign({ id: userCreated.id }, process.env.API_KEY);
      return response(res, 200, 1, { email, token });
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const User = await user.findOne({
        where: { email },
      });
      if (!User) return response(res, 409, 0, "wrong email");
      const validPass = await bcrypt.compare(password, User.password);
      if (!validPass) return response(res, 409, 0, "wrong password");
      const token = jwt.sign({ id: User.id }, process.env.API_KEY);
      return response(res, 200, 1, { email, token ,role:User.listAs});
    } catch (err) {
      return response(res, 500, 0, err);
    }
  },
};
