const uuid = require("uuid")
module.exports = {
    async getUser(con){
        const [row] = await con.query("SELECT * FROM gift");
        //con.end()
        return row
    }
}