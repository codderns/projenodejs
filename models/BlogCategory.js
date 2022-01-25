const mongoose = require('mongoose')
const {Schema} = mongoose 

const myblogSchema = new Schema({ 
    Id :String,
    Name:String,
    AddDate : {type: Date, default: Date.now},
    IsDeleted: {type:Boolean ,default: false}
})
const myblogCategoryModel = mongoose.model("BlogCategory",myblogSchema)

module.exports = {
    myblogCategoryModel
}