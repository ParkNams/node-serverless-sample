module.exports = {
    mytest(callback){
        callback(null,
         { 
            statusCode: 200,
            body: JSON.stringify(
              {
                message: 'it is serverless callback test',
              },
              null,
              2
            ),
            headers: {'Content-Type': 'application/json'},
        
        })
    }
}