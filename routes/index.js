var express = require('express');
var router = express.Router();
var validation =require('../helper/regValidation');
var toDo = require("../model/toDo")
var controller = require("../controller/controller")
/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('login.ejs');
});
router.post('/register', function(req, res, next) {
  
  res.render('register.ejs');
});

router.post('/todo',function(req, res, next) {
  res.render('crud.ejs');
});
router.post('/delete',controller.delete );

router.post('/viewToDo', controller.createToDo);
router.post('/login', validation.postValidation,controller.userRegister);

router.post('/crud', validation.postValidation,controller.crud);





router.post('/createToDo', validation.postValidation,controller.createToDo);

module.exports = router;
