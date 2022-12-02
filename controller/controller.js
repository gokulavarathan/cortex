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
                let token = jwt.sign(payload, "embeddedJavaScript", { "expiresIn": 60 * 30 });
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
    todoSchema.create(req.body,(err,resp)=>{
            if(resp){
                todoSchema.find({}).then(data => res.render("viewToDo.ejs", { data:data }))
    .catch(err => console.log(err))
    
            }else{
                res.json({status:false,msg:"Error occur while registering the user",err:err})
            }
        
    })
})

exports.delete=((req,res)=>{
    console.log("comming",req.body.gotoNode)
    if(req.body.gotoNode != "" && req.body.gotoNode !=null){

        var where = { _id: req.body.gotoNode }
        todoSchema.deleteOne(where,(err,resp)=>{
        if (!err) {
            todoSchema.find({}).then(data => res.render("viewToDo.ejs", { data:data }))
            .catch(err => console.log(err))     } 
            else {
            res.status(400).send({ status: false, msg: "Error Occur while  Deleting user data", error: error })
        }
        })
    }else{
        res.status(400).send({ status: false, msg: "Need id of the row" })

    }
})