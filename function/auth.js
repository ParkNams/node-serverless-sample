require("dotenv").config();

exports.handler = function (event, context, callback) {
  console.log("Received event:", JSON.stringify(event, null, 2));
  var { token, authcode } = event.headers;
  var queryStringParameters = event.queryStringParameters;
  var pathParameters = event.pathParameters;
  var stageVariables = event.stageVariables;

  var authResponse = {};
  var condition = {};
  condition.IpAddress = {};
  console.log(`Received Headers: ${JSON.stringify(event.headers, null, 2)}`);
  //console.log(`authcode: ${authcode}`);
  if (authcode === process.env.API_KEY) {
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
