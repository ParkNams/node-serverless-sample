const jwt = require("jsonwebtoken");

const signTokenByUser = (params, callback) => {
  const { id, name } = params;
  try {
    if (id && name) {
      const token = jwt.sign({ id, name }, "private");
      console.log(`token: ${token}`);
      callback(null, { token, ...params });
    } else {
      callback({
        statusCode: 400,
        body: JSON.stringify({ message: "id or name not exist" }),
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    callback({
      statusCode: 500,
      body: JSON.stringify({ err: e }),
      headers: { "Content-Type": "application/json" },
    });
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

module.exports = {
  signTokenByUser,
  verifyToken,
};
