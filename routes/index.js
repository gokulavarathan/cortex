var express = require('express');
var router = express.Router();
var validation =require('../helper/regValidation');
var toDo = require("../model/toDo")
var controller = require("../controller/controller");
var common =require("../helper/regValidation")



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
router.post('/delete',common.tokenMiddlewareAdmin,controller.delete );

router.post('/viewToDo', common.tokenMiddleware,controller.createToDo);
router.post('/login', validation.postValidation,controller.userRegister);

router.post('/crud', validation.postValidation,controller.crud);





router.post('/createToDo', validation.postValidation,controller.createToDo);

module.exports = router;
