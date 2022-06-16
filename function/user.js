"use strict";
const dotenv = require("dotenv");
dotenv.config();
//const { master } = require(process.env.ENVIRONMENT === "local" ? "./../tool/database":process.env.TOOL_LOCATION + "database")
//const { myCache } = require(process.env.ENVIRONMENT === "local" ? "./../tool/cache":process.env.TOOL_LOCATION + "cache")
const userController = require("../controller/user");
const uuid = require("uuid");
exports.handler = async (event, context, callback) => {
  try {
    const { body, headers } = event;
    console.log(body);
    if (body.route === "get") {
      userController.getUser({ ...body, ...headers }, callback);
    } else if (body.route === "create") {
      userController.createUser({ ...body, ...headers }, callback);
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          uuid: uuid.v4(),
          //data,
          err: "not route",
        }),
        headers: { "Content-Type": "application/json" },
      };
    }
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     uuid: uuid.v4(),
    //     //data,
    //     data: sendCache,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // };
  } catch (e) {
    console.log(e);
    callback(e);
  }
};
