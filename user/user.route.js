const express = require('express');
var router = express.Router();
var request = require('request');
const con = require('../connection');
const md5 = require('md5');

router.get('/user/forgetpass', async(req,res,next)=>{
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        // console.log(header);
        let email = header['email'];
        let x_api_key = header["x_api_key"];
        let Authorization = header['Authorization'];
        
        var options = {
            'method': 'POST',
            'url': 'https://inspizone.sg/apis/authentication/forget',
            'headers': {
              'x-api-key': 'InspiGenius@123',
              'email': email,
              'Authorization': 'Basic YWRtaW46MTIzNA==',
              'Cookie': 'gmsms=mphgodtusacglgh1pr7n187rbgp7bf95'
            }
          };
        request(options, function (error, response) {
            if(error){
                res.send(error);
            }else{
                res.send(response.body);
            }
        });

    } catch (error) {
        
    }
})
router.get('/user/list',async(req,res,next)=>{
    const query = 'SELECT * FROM users';
    con.query(query, (err, results) => {
        if (err) {
            console.error('Error executing the query:', err);
            return;
        }
        // return results;
        res.send(results);
    });
})
module.exports = router;