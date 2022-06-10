const { master } = require("/opt/database")
exports.handler = async (event) => {
    try{
        const masterPromise = master.promise()
        const { Records } = event
        console.log(Records[0].s3.object)
        await masterPromise.query(`INSERT INTO testData VALUES('${Records[0].s3.object.key}',1)`)
        // TODO implement
        const response = {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),
            headers: {'Content-Type': 'application/json'},
        };
        return response;
    }catch(e){
        
        return {
            statusCode: 404,
            body: JSON.stringify(e)
        }
        
    }
};
