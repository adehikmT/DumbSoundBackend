const jwt = require("jsonwebtoken");
const { user } = require("../models");
const response = require("../helpers/response");

module.exports = {
  authToken: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
        const verified = jwt.verify(token, process.env.API_KEY);
        req.user = verified;
        next();
      } else {
        return response(res, 401, 0, "Access denied!");
      } 
    } catch (err) {
      return response(res, 401, 0, err);
    }
  },
  authAdmin: async (req, res, next) => {
    try {
      const { id } = req.user;
      const User = await user.findOne({ where: { id } });
      if (User.listAs === 1) {
        next();
      } else {
        return response(res, 401, 0, "Access denied!");
      }
    } catch (err) {
      return response(res, 401, 0, err);
    }
  },
};
