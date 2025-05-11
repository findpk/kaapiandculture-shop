const jwt = require("jsonwebtoken"),
  _ = require("lodash");

const authenticate = (jwtOptions) => {
  return (req, res, next) => {
    let token = _.get(req, "cookies.jwt", req.body.jwt);
    if (!token) {
      return res.status(403).send({
        error: "Missing jwt token",
      });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, jwtOptions.secret, {
        algorithms: [jwtOptions.algorithm],
      });
    } catch (e) {
      return res.status(409).send({
        message: "JsonWebTokenError: invalid token",
      });
    }
    _.unset(decoded, 'pwd')
    _.set(req, "headers.user_details", decoded);
    next();
  };
};

const checkSignIn = (jwtOptions) => {
  return (req, res, next) => {
    let token = _.get(req, "cookies.jwt");
    if (token) {
      try {
        jwt.verify(token, jwtOptions.secret, {
          algorithms: [jwtOptions.algorithm],
        });
        return res.status(200).send({
          message: "Logged in already",
        });
      } catch (e) { }
    }
    next();
  };
};

module.exports = {
  authenticate,
  checkSignIn,
};
