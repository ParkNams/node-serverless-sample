require("dotenv").config();

exports.handler = function (event, context, callback) {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // A simple request-based authorizer example to demonstrate how to use request
  // parameters to allow or deny a request. In this example, a request is
  // authorized if the client-supplied headerauth1 header, QueryString1
  // query parameter, and stage variable of StageVar1 all match
  // specified values of 'headerValue1', 'queryValue1', and 'stageValue1',
  // respectively.

  // Retrieve request parameters from the Lambda function input:
  var { authcode } = event.headers;
  var queryStringParameters = event.queryStringParameters;
  var pathParameters = event.pathParameters;
  var stageVariables = event.stageVariables;

  // Parse the input for the parameter values
  //   var tmp = event.methodArn.split(":");
  //   var apiGatewayArnTmp = tmp[5].split("/");
  //   var awsAccountId = tmp[4];
  //   var region = tmp[3];
  //   var restApiId = apiGatewayArnTmp[0];
  //   var stage = apiGatewayArnTmp[1];
  //   var method = apiGatewayArnTmp[2];
  //   var resource = "/"; // root resource
  //   if (apiGatewayArnTmp[3]) {
  //     resource += apiGatewayArnTmp[3];
  //   }

  // Perform authorization to return the Allow policy for correct parameters and
  // the 'Unauthorized' error, otherwise.
  var authResponse = {};
  var condition = {};
  condition.IpAddress = {};
  console.log(`authcode: ${authcode}`);
  if (
    // headers.headerauth1 === "headerValue1" &&
    // queryStringParameters.QueryString1 === "queryValue1" &&
    // stageVariables.StageVar1 === "stageValue1"
    authcode === process.env.API_KEY
  ) {
    callback(null, generateAllow("user", event.methodArn));
  } else {
    callback("Unauthorized");
  }
};

// Help function to generate an IAM policy
var generatePolicy = function (principalId, effect, resource) {
  // Required output:
  var authResponse = {};
  authResponse.principalId = principalId;
  if (/*effect && resource*/ true) {
    var policyDocument = {};
    policyDocument.Version = "2012-10-17"; // default version
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = "*"; // default action
    statementOne.Effect = effect;
    statementOne.Resource = "*";
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

var generateAllow = function (principalId, resource) {
  console.log(`resource: ${resource}`);
  return generatePolicy(principalId, "allow", resource);
};

var generateDeny = function (principalId, resource) {
  return generatePolicy(principalId, "Deny", resource);
};
