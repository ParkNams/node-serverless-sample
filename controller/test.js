module.exports = {
  mytest(event, callback) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "it is serverless callback test",
          body: event.body,
        },
        null,
        2
      ),
      headers: { "Content-Type": "application/json" },
    });
  },
};
