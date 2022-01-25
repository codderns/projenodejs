const mongoose = require('mongoose');
const { connectionstring } = require('./config');


const connectionhelper = {
    connect: () =>{
        mongoose.connect(connectionstring)
        .catch(err=>{
            console.log("Connection Error",err);
        })
    }
}

module.exports = {
    connectionhelper
}