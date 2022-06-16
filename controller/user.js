const uuid = require("uuid");
require("dotenv").config();

const jwtPath = `${
  process.env.ENVIRONMENT === "local" ? "./../tool/" : process.env.TOOL_LOCATION
}jwt`;

const { signTokenByUser, verifyToken } = require(jwtPath);

module.exports = {
  createUser(params, callback) {
    signTokenByUser(params, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback({
          statusCode: 200,
          body: JSON.stringify({
            uuid: uuid.v4(),
            //data,
            data: {
              result,
            },
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
    });
  },
  getUser(params, callback) {},
};
