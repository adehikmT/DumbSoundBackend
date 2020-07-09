module.exports = response = (res, status, statusCode, data, pagination) => {
  const result = {};
  result.status = status || 200;
  statusCode === 0 ? (result.error = data) : (result.data = data);
  result.pagination = pagination;
  return res.status(status).json(result);
};
