const jwt = require("jsonwebtoken");

const signTokenByUser = (params, callback) => {
  const { id, name } = params;
  try {
    if (id && name) {
      const token = jwt.sign({ id, name }, "private");
      callback(null, { token, ...params });
    } else {
      callback({
        message: "id or name not exist",
      });
    }
  } catch (e) {
    callback(e);
  }
};

const verifyToken = (params, callback) => {
  const { token } = params;
  try {
    jwt.verify(token, "private", (err, decoded) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { ...params, userData: decoded });
      }
    });
  } catch (e) {
    callback(e);
  }
};
