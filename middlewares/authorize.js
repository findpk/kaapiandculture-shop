const _ = require("lodash");

const authorize = (rolePrivileges, requiredRole) => {
  return (req, res, next) => {
    let currentPrivilege =
      rolePrivileges[_.get(req, "headers.user_details.role")];
    let minimumPrivilege =
      rolePrivileges[requiredRole] || rolePrivileges[_.get(req, "role")] + 1;
    if (currentPrivilege < minimumPrivilege) {
      return res.status(403).send({
        error: "Insufficient permissions",
      });
    }
    next();
  };
};

module.exports = {
  authorize,
};
