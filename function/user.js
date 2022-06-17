"use strict";
const dotenv = require("dotenv");
dotenv.config();
//const { master } = require(process.env.ENVIRONMENT === "local" ? "./../tool/database":process.env.TOOL_LOCATION + "database")
//const { myCache } = require(process.env.ENVIRONMENT === "local" ? "./../tool/cache":process.env.TOOL_LOCATION + "cache")
const userController = require("../controller/user");
const uuid = require("uuid");
exports.createUserHandler = (event, context, callback) => {
  try {
    const { body, headers } = event;
    const bodyJson = JSON.parse(body);
    userController.createUser({ ...bodyJson }, callback);
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

exports.getUserHandler = (event, context, callback) => {
  try {
    const { body } = event;
    const bodyJson = JSON.parse(body);
    userController.getUser({ ...bodyJson }, callback);
  } catch (e) {
    callback(e);
  }
};
