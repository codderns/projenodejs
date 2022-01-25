const mongoose = require('mongoose')
const {Schema} = mongoose 

const myblogSchema = new Schema({ 
    Id :String,
    Path:String,
    BlogId:String, //Bu id'yi blog id'sinden al
    AddDate : {type: Date, default: Date.now},
    IsDeleted: {type:Boolean,default: false}
})
const myblogImagesModel = mongoose.model("BlogImages",myblogSchema)

module.exports = {
    myblogImagesModel
}