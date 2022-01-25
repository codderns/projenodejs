const mongoose = require('mongoose')
const {Schema} = mongoose 

const myblogSchema = new Schema({ 
    Id :String,
    Title:String,
    Message:String,
    AddDate : {type: Date, default: Date.now},
    IsDeleted: {type:Boolean,default: false}
})
const myblogContactModel = mongoose.model("Contact",myblogSchema)

module.exports = {
    myblogContactModel
}