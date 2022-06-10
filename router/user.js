
'use strict';
const dotenv = require("dotenv")
dotenv.config()
const { master } = require(process.env.ENVIRONMENT === "local" ? "./../tool/database":process.env.TOOL_LOCATION + "database")
const { myCache } = require(process.env.ENVIRONMENT === "local" ? "./../tool/cache":process.env.TOOL_LOCATION + "cache")
const userController = require("./../controller/user")
const uuid = require("uuid")
exports.handler = async (event,context,callback) => {
  try{
    const body = JSON.parse(event.body)
    let sendCache = '';
    if( ! myCache.has(body.key) ){
      sendCache = await userController.getUser(master.promise())
      myCache.set(body.key,sendCache)
    }else{
      sendCache = myCache.get(body.key)
    }
    //const master = connectFunction()
    return {
      statusCode:200,
      body:JSON.stringify({
        uuid:uuid.v4(),
        //data,
        data:sendCache
      }),
      headers: {'Content-Type': 'application/json'},
    }
  }catch(e) {
    return {
      statusCode:404,
      body:JSON.stringify({
        err:e,
        message:"some error"
      })
    }
  }
};
