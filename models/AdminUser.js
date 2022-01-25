const mongoose = require('mongoose')
const {Schema} = mongoose 

const myblogSchema = new Schema({ 
    Id :String,
    EMail:String,
    Password:String,
    LastLoginDate:{type: Date}, //bunu string yaparsın olmazsa
    AddDate : {type: Date, default: Date.now},
    IsDeleted: {type:Boolean,default: false} 
})
const myblogAdminModel = mongoose.model("BlogAdminUser",myblogSchema)

module.exports = {
    myblogAdminModel
}