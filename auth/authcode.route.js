const express = require('express');
var router = express.Router();
var request = require('request');
const md5 = require('md5');
const con = require('../connection');
router.get('/account/login',async(req, res, next)=>{

    try{
        var header = JSON.parse(JSON.stringify(req.headers));

        // console.log(header);

        let email = header['email'];
        let password = md5(header['password']);

        let sql = "SELECT * FROM users where username ='"+email+"' AND password = '"+password+"' limit 1";

        con.query(sql,function(err,result){
            if(!err && result[0]){
                console.log(result);
                
                var data = {
                    status: 200,
                    data: result
                };
                res.send(data);
            }else{
                let message = 'Unauthorized: Wrong Username and Password';
                var data = {
                    status: 401,
                    message: message
                };
                res.send(data);
                console.log(err);
            }
        })
        
        
    }catch(error){

        console.log(error);
        let message = 'Unauthorized: Wrong Username and Password';
        var data = {
            status: 401,
            message: message
        };

        res.send(data);
    }
});

router.get('/getid',async(req,res,next)=>{
    try {

        var header = JSON.parse(JSON.stringify(req.headers));
        var role_id = header['role_id'];
        var user_id = header['user_id'];
        if(!role_id ||!user_id ){
            let message = 'User Id and role id are not set';
            var data = {
                status: 401,
                message: message
            };
        }else{

            if(role_id == '5'){

                var sql = "SELECT * FROM teachers where user_id = "+user_id;

            }else if(role_id == '4'){

                var sql = "SELECT * FROM students_registration where user_id = "+user_id;

            }else{

                var sql = "SELECT * FROM teachers where user_id = "+user_id;

            }
            // console.log(sql);
            // res.send(sql);
            // return;
            
            con.query(sql,function(err,result){
                if(!err && request){
                    console.log(result);
                
                    var data = {
                        status: 200,
                        data: result
                    };
                    res.send(data);
                }else{
                    console.log(err);
                    let message = 'Someting Wrong Please Try Leter..';
                    var data = {
                        status: 500,
                        message: message
                    };
                    res.send(data);
                    console.log(message);

                }
            })
        }

        
    } catch (error) {

        let message = 'Unauthorized: Wrong Username and Password';
        var data = {
            status: 401,
            message: message
        };
    }
})
module.exports = router;
