const mysql = require("mysql2")

const sharedConfig = {
    connectTimeout: 60000,
    waitForConnections: true,
    queueLimit: 0,
};

const masterConfig = {
    ...sharedConfig,
    connectionLimit: 18,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

const connectFunction = () => {
    const master = mysql.createConnection(masterConfig);
    return master
}

module.exports = {
    master:connectFunction()
}