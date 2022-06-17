const uuid = require("uuid");
require("dotenv").config();

const jwtPath = `${
  process.env.ENVIRONMENT === "local" ? "./../tool/" : process.env.TOOL_LOCATION
}jwt`;

const { signTokenByUser, verifyToken } = require(jwtPath);

module.exports = {
  createUser(params, callback) {
    signTokenByUser(params, (err, result) => {
      console.log(`[err] : ${err}`);
      if (err) {
        callback(null, err);
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            uuid: uuid.v4(),
            //data,
            message: "success",
            data: {
              ...result,
            },
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
    });
  },
  getUser(params, callback) {
    verifyToken(params, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            uuid: uuid.v4(),
            data: {
              ...result,
            },
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
    });
  },
};
