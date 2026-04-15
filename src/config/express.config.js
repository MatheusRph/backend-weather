const { urlencoded } = require("express");

module.exports = {
    port: process.env.PORT || 3000, 
    env: process.env.NODE_ENV || 'development', 
    apiPrefix: '/api',
    bodyLimit: process.env.PORT || '10mb', 
    urlencoded: { extended: false }
}