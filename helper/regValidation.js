const validator = require('node-validator');

let emptycheck = /([^\s])/;
let email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports.postValidation = (req, res, next) => {

    try {
        let path = req.route.path;
        let data = req.body;
        if (path == '/login') {
            check = validator.isObject()
            .withRequired('name', validator.isString({ regex: emptycheck, message: "Please provide the name" }))
            .withRequired('emailId', validator.isString({ regex: emptycheck, message: "Please provide the emailId" }))
            .withRequired('password', validator.isString({ regex: emptycheck, message: "Please provide the password" }))
            .withRequired('cnfmPassword', validator.isString({ regex: emptycheck, message: "Please provide the cnfmPassword" }))
            
        }else if (path == '/crud') {
            check = validator.isObject()
            .withRequired('emailId', validator.isString({ regex: emptycheck, message: "Please provide the emailId" }))
            .withRequired('password', validator.isString({ regex: emptycheck, message: "Please provide the password" }))            
        }else if( path == '/createToDo') {
            check = validator.isObject()
            .withRequired('title', validator.isString({ regex: emptycheck, message: "Please provide the title" }))
            .withRequired('subject', validator.isString({ regex: emptycheck, message: "Please provide the subject" }))    
            .withRequired('description', validator.isString({ regex: emptycheck, message: "Please provide the description" }))            

        }

        validator.run(check, data, (errorcount, errors) => {
            if (errorcount == 0) {
                next();
            } else {
                let errormsg = '';
                for (let i = 0; i < errors.length; i++) {
                    if (errormsg != '') {
                        errormsg += ', ';
                    }
                    if (errors[i].message == 'Required value.' && errors[i].value == undefined) {
                        errors[i].message = errors[i].parameter + ' is required'
                    } else if (errors[i].value != undefined || errors[i].value == "" || errors[i].value == [] || errors[i].message == "Unexpected value.") {
                        errors[i].message = "Not a valid " + errors[i].parameter
                    } else {
                        errors[i].message = errors[i].message;
                    }
                    errormsg += errors[i].message;
                }
                res.json({ "status": false, "message": errormsg })
            }
        })
    } catch (e) {
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.tokenMiddlewareAdmin = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        if (token != null) {
            jwt.verify(token, jwtTokenAdmin, (err, payload) => {
                if (payload) {
                    let userid = decrypt(payload.subject);
                    req.userId = userid;
                    next();
                } else {
                    res.json({ "status": false, "message": "Unauthorized" })
                }
            })
        } else {
            res.json({ "status": false, "message": "Unauthorized" })
        }
    } else {
        res.json({ "status": false, "message": "Unauthorized" })
    }
}
