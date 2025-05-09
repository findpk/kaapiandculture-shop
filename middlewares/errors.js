// https://medium.com/@xiaominghu19922/proper-error-handling-in-express-server-with-typescript-8cd4ffb67188

const ErrorHandler = (err, message, req, res, next) => {
  res.status(500).send({ errors: [{ message: message }] })
};

module.exports = ErrorHandler