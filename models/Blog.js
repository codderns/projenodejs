const mongoose = require('mongoose')
const {Schema} = mongoose 

const myblogSchema = new Schema({ 
    Id :String,
    Title:String,
    Content:String,
    MainImg:String,
    BlogCategoryId:String,//{type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory'}, 
    AddDate : {type: Date, default: Date.now},
    IsDeleted: {type:Boolean,default: false}
})
const myblogBlogModel = mongoose.model("Blog",myblogSchema)

module.exports = {
    myblogBlogModel
}