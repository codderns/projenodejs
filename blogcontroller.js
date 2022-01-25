const { myblogAdminModel } = require("./models/AdminUser");
const { myblogBlogModel } = require("./models/Blog");
const { myblogCategoryModel } = require("./models/BlogCategory");
const { myblogImagesModel } = require("./models/BlogImages");
const { myblogContactModel } = require("./models/Contact");

const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator'); 

const blogControllerforBlog = {

    getAll: (req,res)=>{
        myblogBlogModel.find({},function (err,results){
            if(err){
                console.log(err);
            }
            else{
                res.json(results)
            }
        })
    },
   
    addData:(req,res)=>{
        category_name = req.body.categoryname
        //var idlist = [myblogCategoryModel.findOne(category_name)]
        ///console.log(category_name);
        myblogCategoryModel.find({Name:category_name},(err,doc)=>{
            
            if(!err && doc!=undefined){
                //console.log(doc[0]._id);
                try {
                    var newBlog = new myblogBlogModel({
                        Title:req.body.title,
                        Content:req.body.content,
                        MainImg:req.body.mainImg,
                        BlogCategoryId:doc[0]._id, //kategorideki id buraya eşitlenmeli
                    })
                    newBlog.save((hata,veriler)=>{
                        if(!hata){
                            res.status(200).json(veriler)
                        }
                        else{
                            res.status(500).json(veriler)
                        }
                    })
                } catch (error) {
                    res.json({'hata':'Böyle bir kategori bulunmamaktadır'})
                }
                
            }
            else{
                res.json({'hata':'Böyle bir kategori bulunmamaktadır'})
            }
        })

        
    },

    update:(req,res)=>{
        var id = req.body.id 
        myblogBlogModel.findById(id,(err,doc)=>{
            if(!err){
                doc.Title = req.body.title
                doc.Content = req.body.content
                doc.MainImg = req.body.mainimg
                doc.save()
                res.json(doc) 
            }
            else{
                res.status(500).json(err)
            }
        })
    },

    delete:(req,res)=>{
        var blogId = req.body.id 

        myblogBlogModel.findByIdAndRemove(blogId,(err,doc)=>{
            if(!err){
                res.json(doc) //hata yoksa yani sildiyse silinen dökümanı göster
            }
            else{
                res.status(500).json(err)
            }
        })
    }
}

const blogControllerforCategory = {
    getAll: (req,res)=>{

        myblogCategoryModel.find({},(err,doc)=>{
            if (!err) {
                res.json(doc)
            }
            else{
                res.json(err)
            }
        })
    },

    addData:(req,res)=>{
        var newCategory = new myblogCategoryModel({
            Name:req.body.name //kategorideki id buraya eşitlenmeli
        })
        newCategory.save((hata,veriler)=>{
            if(!hata){
                res.status(200).json(veriler)
            }
            else{
                res.status(500).json(veriler)
            }
        })
    },
    update:(req,res)=>{

        var id = req.body.id

        myblogCategoryModel.findById(id,(err,doc1)=>{
            if(!err){
                if(doc1==null || doc1 == undefined){
                    res.json({"bildiri":"bu id'de kategori yoktur"})
                }
                else{
                    myblogBlogModel.find({BlogCategoryId:id},(err,doc2)=>{
                        if(!err){
                            //console.log(doc2);
                            if(doc2==null || doc2==undefined || doc2.length==0){
                                doc1.Name = req.body.name
                                doc1.save()
                                res.json(doc1)
                            }
                            else{
                                res.json({"cevap":"blog içinde bu id'de kategori var, önce blogu güncelleyin"});
                            }
                        }
                        else{
                            res.status(500).json(err)
                        }
                    })
                }
            }
            else{
                res.status(500).json("böyle bir id yoktur")
            }
        })

        
    },
    delete:(req,res)=>{
        //silinecek olan kategorinin id'si
        var id = req.body.id
        //console.log(id);
        myblogCategoryModel.findById(id,(err,doc1)=>{
            if(!err){
                //console.log(doc1)
                if(doc1==null || doc1 == undefined){
                    res.json({"bildiri":"bu id'de kategori yoktur"})
                }
                else{
                    myblogBlogModel.find({BlogCategoryId:id},(err,doc2)=>{
                        if(!err){
                            //console.log(doc2);
                            if(doc2==null || doc2==undefined || doc2.length==0){
                                myblogCategoryModel.findByIdAndRemove(id,(err,doc3)=>{
                                    console.log(doc3);
                                    if(!err){
                                        res.json(doc3)
                                    }
                                    else{
                                        res.status(500).json(err)
                                    }
                                })
                            }
                            else{
                                res.json({"cevap":"blog içinde bu id'de kategori var, önce blogu güncelleyin"});
                            }
                        }
                        else{
                            res.status(500).json(err)
                        }
                    })
                }
            }
            else{
                res.status(500).json("böyle bir id yoktur")
            }
        })
    }
}


module.exports = {
    blogControllerforBlog,
    blogControllerforCategory
}

