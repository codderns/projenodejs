const express = require('express')
const app = express()
const bodyParser = require('body-parser') //post için bodyparser
const { connectionhelper } = require('./connectionHelper')
const { blogControllerforBlog, blogControllerforCategory } = require('./blogcontroller')

const { body, validationResult } = require('express-validator'); 

app.use(bodyParser.urlencoded({extended: false})) 
app.use(bodyParser.json()) 

connectionhelper.connect()

app.get('/api/blogs',(req,res)=>{
    blogControllerforBlog.getAll(req,res);
})

app.post('/api/blog',body('title').notEmpty().withMessage('title boş olmamalıdır'),
    function(req,res){

        //değilse işe bunlar
        const errors = validationResult(req);//request'i error'lara tabi tuttuk ve kurallar yukarıda belirlendi
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });//error varsa fırlat    
        }
        else{
            blogControllerforBlog.addData(req,res);
        }
    }
)

app.put('/api/blog',(req,res)=>{
    blogControllerforBlog.update(req,res);
})

app.delete('/api/blog',(req,res)=>{
    blogControllerforBlog.delete(req,res);
})

/// Category

app.get('/api/categories',(req,res)=>{
    blogControllerforCategory.getAll(req,res);
})

app.post('/api/category',body('name').notEmpty().withMessage('name boş olmamalıdır'),
    function(req,res){

        //değilse işe bunlar
        const errors = validationResult(req);//request'i error'lara tabi tuttuk ve kurallar yukarıda belirlendi
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });//error varsa fırlat    
        }
        else{
            blogControllerforCategory.addData(req,res);
        }
    }
)
app.put('/api/category',(req,res)=>{
    blogControllerforCategory.update(req,res);
})
app.delete('/api/category',(req,res)=>{
    blogControllerforCategory.delete(req,res);
})

app.listen(8000, ()=> {
    console.log("The console is working just not like my brain.");
})