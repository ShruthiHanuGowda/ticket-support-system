const dotenv = require('dotenv')
dotenv.config()

const env = process.env.NODE_ENV

const dev = {
    app: {
        port: process.env.PORT,
        client_url: process.env.CLIENT_URL,
    },
    DB:{
        mongo_connection_string:process.env.MONGODB_URL
    }
   
};

const config = {
    dev
}
module.exports =
    config[env]