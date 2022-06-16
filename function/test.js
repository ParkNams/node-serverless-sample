"use strict";
const testController = require("./../controller/test");
exports.handler = async (event, context, callback) => {
  testController.mytest(event, callback);
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
