const express = require('express');
var router = express.Router();
const Stripe = require('stripe');
const cors = require("cors");
const stripe = Stripe('');
var request = require('rsk_test_51O7ty9SANh4m1yKlFj7KYAjs3zuzSr0lRJh1j1N20FGUiBvsCCu14cfbW4jr1qWvYYNFt1ZsRZ5VU4FR7GnoUEDT00IDgUSUqDequest');
const con = require('../connection');

router.get('/student/details',async(req, res, next)=>{
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var user_id = header['user_id'];
        var type = header['type'];

        if(type == 'data'){
            let sql = 'SELECT * FROM students_registration where user_id = '+user_id;
            const result = await new Promise((resolve , reject) =>
            {
                con.query(sql, (err, result) => {
                    if (err) {
                      reject(err); // If there's an error, reject the Promise
                    } else {
                      resolve(result); // If successful, resolve the Promise with the result
                    }
                });                  
            });

            var data = {
                status: 200,
                data: result 
            };
            res.send(data);
            
        }else{
            var data = {
                status: 401,
                message: 'Data Type is Not Valid!'
            };
            res.send(data);
        }

    } catch (error) {

        let message = 'Unauthorized: Wrong Username and Password';
        var data = {
            status: 401,
            message: error
        };
        console.log(error);
        
    }
});

//SELECT ev.* FROM enrollments AS en LEFT JOIN routines as rt ON en.batch_id = rt.batch_id LEFT JOIN events as ev ON rt.id = ev.routine_id WHERE en.student_id = 6 AND en.batch_id IS NOT NULL AND ev.role_id = 4 AND ev.school_id = 2;

router.get('/student/event',async(req, res, next)=>{
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var user_id = header['user_id'];
        var student_id = header['student_id'];
        var type = header['type'];
        var datetime = new Date();
        var today = datetime.toISOString().slice(0,10);

        if(type == 'all'){
            let sql = "SELECT ev.* FROM enrollments AS en LEFT JOIN routines as rt ON en.batch_id = rt.batch_id LEFT JOIN events as ev ON rt.id = ev.routine_id WHERE en.student_id = "+student_id+" AND en.batch_id IS NOT NULL AND ev.role_id = "+role_id+" AND ev.school_id = "+school_id+" AND ev.event_from >= '"+today+"' ORDER BY ev.event_from ASC";
            const result = await new Promise((resolve , reject) =>
            {
                con.query(sql, (err, result) => {
                    if (err) {
                      reject(err); // If there's an error, reject the Promise
                    } else {
                      resolve(result); // If successful, resolve the Promise with the result
                    }
                });                  
            });
            var ddData = {
                data : result,
                count: result.length
            }

            var data = {
                status: 200,
                data: ddData
            };
            res.send(data);
            
        }else{
            var data = {
                status: 401,
                message: 'Data Type is Not Valid!'
            };
            res.send(data);
        }

    } catch (error) {

        let message = 'Unauthorized: Wrong Username and Password';
        var data = {
            status: 401,
            message: error
        };
        console.log(error);
        
    }
});
router.get('/student/mycourses',async(req, res, next)=>{
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var user_id = header['user_id'];
        var student_id = header['student_id'];
        var type = header['type'];

        if(type == 'data'){
            let sql = 'SELECT en.*,co.course_name,co.course_price FROM `enrollments` as en LEFT JOIN courses as co ON en.course_id = co.id where en.student_id = '+student_id;
            const result = await new Promise((resolve , reject) =>
            {
                con.query(sql, (err, result) => {
                    if (err) {
                      reject(err); // If there's an error, reject the Promise
                    } else {
                      resolve(result); // If successful, resolve the Promise with the result
                    }
                });                 
            });

            var data = {
                status: 200,
                data: result 
            };
            res.send(data);
            
        }else if(type == 'number'){
            let sql = 'SELECT * FROM `enrollments` where student_id = '+student_id;
            const result = await new Promise((resolve , reject) =>
            {
                con.query(sql, (err, result) => {
                    if (err) {
                      reject(err); // If there's an error, reject the Promise
                    } else {
                      resolve(result.length); // If successful, resolve the Promise with the result
                    }
                });                  
            });

            var data = {
                status: 200,
                data: result 
            };
            res.send(data);
        }else{
            var data = {
                status: 401,
                message: 'Data Type is Not Valid!'
            };
            res.send(data);
        }

    } catch (error) {

        let message = 'Unauthorized: Wrong Username and Password';
        var data = {
            status: 401,
            message: error
        };
        console.log(error);
        
    }
});

router.get('/student/trandingcourses',async(req,res,next)=>{
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var user_id = header['user_id'];
        var student_id = header['student_id'];
        var type = header['type'];

        let sql = 'SELECT * FROM `courses` where status = 1 and school_id = '+school_id;
        const result = await new Promise((resolve , reject) =>
        {
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err); // If there's an error, reject the Promise
                } else {
                    resolve(result); // If successful, resolve the Promise with the result
                }
            });                  
        });

        var data = {
            status: 200,
            data: result 
        };
        res.send(data);

    } catch (error) {
        var data = {
            status: 402,
            message: "Sometings went wrong Please try after sometime!"
        };
        res.send(data);
    }
})



router.get('/student/invoice',async(req, res, next)=>{
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var user_id = header['user_id'];
        var student_id = header['student_id'];
        var lead_id = header['lead_id'];
        var type = header['type'];

        if(type == 'data'){
            let sql = 'SELECT * FROM `invoicegen` where lead_id = '+lead_id;
            const result = await new Promise((resolve , reject) =>
            {
                con.query(sql, (err, result) => {
                    if (err) {
                      reject(err); // If there's an error, reject the Promise
                    } else {
                      resolve(result); // If successful, resolve the Promise with the result
                    }
                });                  
            });

            var data = {
                status: 200,
                data: result 
            };
            res.send(data);
            
        }else if(type == 'number'){

            let sql = 'SELECT * FROM `invoicegen` where lead_id = '+lead_id;
            const result = await new Promise((resolve , reject) =>
            {
                con.query(sql, (err, result) => {
                    if (err) {
                      reject(err); // If there's an error, reject the Promise
                    } else {
                      resolve(result); // If successful, resolve the Promise with the result
                    }
                });                  
            });

            // var num = 0;
            //SELECT rt.* FROM enrollments AS en LEFT JOIN routines as rt ON en.batch_id = rt.batch_id WHERE en.student_id = 6 AND en.batch_id IS NOT NULL;
            var myTotalPrice = 0;
            var myPaidAmount = 0;
            result.forEach(element => {
                myPaidAmount = parseFloat(myPaidAmount)+parseFloat(element.paidamount)+parseFloat(element.discount);
                myTotalPrice = parseFloat(myTotalPrice)+parseFloat(element.price);
            });

            // console.log('My Paid Amount -> ', myPaidAmount);
            // console.log('My Total Amount -> ', myTotalPrice);
            var due = myTotalPrice-myPaidAmount;
            var expenses = myPaidAmount;

            var amount = {
                due: due,
                expences: expenses
            }
            

            var data = {
                status: 200,
                data: amount 
            };
            res.send(data);
        }else{
            var data = {
                status: 401,
                message: 'Data Type is Not Valid!'
            };
            res.send(data);
        }

    } catch (error) {

        let message = 'Unauthorized: Wrong Username and Password';
        var data = {
            status: 401,
            message: error
        };
        console.log(error);
        
    }
});

router.post('/student/coursePayment',async(req,res,next)=>{
    try {
        const data = req.body;
        console.log(req.body);
        const params = {
            email: data.email,
            name: data.name,
        };
        const customer = await stripe.customers.create(params);
        console.log(customer.id);

        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2020-08-27'}
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(data.amount),
            currency: data.currency,
            customer: customer.id,
            automatic_payment_methods: {
            enabled: true,
            },
        });
        const response = {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
        };
        res.status(200).send(response);
    } catch(e) {
        next(e);
    }
})


module.exports = router;
