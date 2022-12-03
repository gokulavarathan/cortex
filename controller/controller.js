const registerSchema = require('../model/register')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const todoSchema = require('../model/toDo')

exports.userRegister=((req,res)=>{
    var data = req.body
        if(req.body.password == req.body.cnfmPassword){
        registerSchema.create(data,(err,resp)=>{
            if(resp){
                res.render('login.ejs');
            }else{
                res.json({status:false,msg:"Error occur while registering the user",err:err})
            }
        })
        
        }else{
        res.json({ "status": false, "message": "Password and confirm password must be same" })
        }
        
})

exports.crud=((req,res)=>{

    registerSchema.find({emailId:req.body.emailId,password:req.body.password},((err,resp)=>{
        if(resp){
            if(resp.length !=0){
                let payload = { subject: resp[0]._id };
                let token = jwt.sign(payload, "embeddedJavaScript");
                todoSchema.find({}).then(data => res.render("viewToDo.ejs", { data:data,token:token }))
                .catch(err => console.log(err))
            }else{
                res.json({status:false,err:err,msg:"Please check the credential"})
            }
        }else{
            res.json({status:false,err:err})
        }
    }))
})

exports.createToDo=((req,res)=>{
    var data={
        title:req.body.title,
        subject:req.body.subject,
        description:req.body.description
    }
    todoSchema.create(data,(err,resp)=>{
            if(resp){
                todoSchema.find({})
                .then(data => {res.render("viewToDo.ejs", { data:data,token:req.body.token })})
                .catch(err => {})
            }else{
                res.json({status:false,msg:"Error occur while registering the user",err:err})
            }
        
    })
})

exports.delete=((req,res)=>{
    var token = req.body.gotoNode.split(' ')[1]
        var where = { _id: req._id }
        todoSchema.deleteOne(where,(err,resp)=>{

        if (!err) {
            todoSchema.find({}).then(data => res.render("viewToDo.ejs", { data:data,token:token }))
            .catch(err => console.log(err))  
        } 
            else {
            res.status(400).send({ status: false, msg: "Error Occur while  Deleting user data", error: error })
        }
        })
    
})