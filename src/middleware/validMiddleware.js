const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const response = require("../helpers/response");
const unupload = require("../helpers/unupload");

module.exports = {
  validRegist: async (req, res, next) => {
    try {
      const listAs = 0;
      const subscribe = 0;
      schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        fullName: Joi.string().min(3).required(),
        gender: Joi.string(),
        phone: Joi.string().min(12),
        address: Joi.string(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return response(res, 400, 0, error.details[0].message);
      } else {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body = { ...req.body, listAs, subscribe, password: hashedPassword };
        next();
      }
    } catch (err) {
      return response(res, 400, 0, err);
    }
  },
  validLogin: async (req, res, next) => {
    try {
      schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return response(res, 400, 0, error.details[0].message);
      } else {
        next();
      }
    } catch (err) {
      return response(res, 400, 0, err);
    }
  },
  validArtis: async (req, res, next) => {
    try {
      schema = Joi.object({
        name: Joi.string().required(),
        old: Joi.number().required(), 
        type: Joi.string().required(),
        startCareer: Joi.number().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return response(res, 400, 0, error.details[0].message);
      } else {
        next();
      }
    } catch (err) {
      return response(res, 400, 0, err);
    }
  },
  validMusic: async (req, res, next) => {
    try {
      const thumbnail = req.file.filename;
      schema = Joi.object({
        title: Joi.string().required(),
        year: Joi.string().required(),
        attache: Joi.string(),
        artisId: Joi.required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        await unupload(thumbnail);
        return response(res, 400, 0, error.details[0].message);
      } else {
        req.body = { ...req.body, thumbnail };
        next();
      }
    } catch (err) {
      return response(res, 400, 0, "image required");
    }
  },
  valTrans: async (req, res, next) => {
    try {
      const attache = req.file.filename;
      const userId = req.user.id;
      const statusPay = 0;
      schema = Joi.object({
        startDate: Joi.string().required(),
        dueDate: Joi.string().required(),
        status: Joi.string().required(),
        statusPay: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        await unupload(attache);
        return response(res, 400, 0, error.details[0].message);
      } else {
        req.body = { ...req.body, attache, userId, statusPay };
        next();
      }
    } catch (err) {
      return response(res, 400, 0, "image required");
    }
  },
};
