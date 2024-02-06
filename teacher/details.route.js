const express = require('express');
var router = express.Router();
var request = require('request');
const con = require('../connection');

router.get('/teacher/chatUser/:id',async(req,res,next)=>{
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        const user_id = req.params.id;
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var teacher_id = header['teacher_id'];
        
        let selectSql = 'SELECT * FROM chatuesr where userid = '+user_id;

        con.query(selectSql,function(err,result){
                console.log(result);
                var data = {
                    status: 200,
                    data: result
                };
                
                res.status(200).send(data);
            });

    }catch (error) {

        var resData = {
            "status": 201,
            "message":error
        }
        res.status(201).send(resData);
        
    }

})
router.get('/teacher/mystudent',async(req, res, next)=>{
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        // res.send(header['role_id']);
        // return;
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var teacher_id = header['teacher_id'];
        var user_id = header['user_id'];
        var data = header['type'];

        // var routines = "SELECT sr.* FROM `routines` as rt INNER JOIN enrollments as en ON rt.batch_id=en.batch_id RIGHT JOIN students_registration as sr ON en.student_id=sr.id WHERE rt.teacher_id="+teacher_id;
        
        // var routines = "SELECT * FROM `routines` where teacher_id = "+teacher_id+" and school_id = "+school_id;

        var routines = "SELECT DISTINCT rt.batch_id, en.course_id as course_ID , sr.* FROM `routines` as rt INNER JOIN enrollments as en ON rt.batch_id = en.batch_id RIGHT JOIN students_registration as sr ON en.student_id = sr.id where rt.teacher_id = "+teacher_id+" and rt.school_id = "+school_id;
        // var studata = [];
        // var batch_id = [];
        // con.query(routines,function(err,result){
            // console.log(result);
            // result.forEach(element => {
                // if(!batch_id.includes(element.batch_id)){
                    // batch_id.push(element.batch_id);
                    // var sql =  "SELECT sr.* FROM enrollments as en RIGHT JOIN students_registration as sr ON en.student_id=sr.id WHERE en.batch_id="+element.batch_id;
                    // con.query(sql,function(errmain,resultmain){
                    //     studata.push(resultmain);
                    //     // studata.push({...obj});
                    //     console.log("Under",studata);        
                    // })
                // }
        // });
            
            // batch_id.forEach(element => {
            //     // console.log(element);
            //     var sql =  "SELECT sr.* FROM enrollments as en RIGHT JOIN students_registration as sr ON en.student_id=sr.id WHERE en.batch_id="+element;
            //     con.query(sql,function(errmain,resultmain){
            //         studata.push(resultmain);
            //         // studata.push({...obj});
            //         console.log("Under",studata);       
            //     })
            // })
            // console.log("Bahar",studata);
            // var data = {
            //     status: 200,
            //     data: result
            // };
            // res.send(data);
        // });

        // return
        if(data == 'number'){
            con.query(routines,function(err,result){
                var num = 0;
                result.forEach(element => {
                    num++;
                });
                console.log(num);
                var data = {
                    status: 200,
                    data: num
                };
                res.status(200).send(data);
            });
        
        }else if(data == 'data'){
            // console.log("routines",routines);
            con.query(routines,function(err,result){
                console.log(result);
                var data = {
                    status: 200,
                    data: result
                };
                res.status(200).send(data);
            });

        }else if (data == 'all'){
            var sql = "SELECT * FROM students_registration where school_id = "+school_id +" order by id DESC ";
            // res.send(sql);
            // return;
            con.query(sql,function(err,result){
                
                console.log(result);
                var data = {
                    status: 200,
                    data: result
                };
                res.status(200).send(data);
            });

        }else{
            console.log('Nothing');
            var data = {
                status: 401,
                message: 'Something Wrong in Params'
            };
            res.status(401).send(data);
        }

    } catch (error) {

        let message = 'Unauthorized: Wrong Username and Password';
        var data = {
            status: 401,
            message: message
        };
        console.log(message);
        res.status(401).send(data);
        
    }
})



router.get('/teacher/myclasses',async(req, res, next)=>{

    try {

        var header = JSON.parse(JSON.stringify(req.headers));

        var role_id = header['role_id'];

        var school_id = header['school_id'];

        var teacher_id = header['teacher_id'];

        var user_id = header['user_id'];

        var data = header['type'];
        
        var datetime = new Date();
        var today = datetime.toISOString().slice(0,10);

        var sqlold = "SELECT e.* FROM `routines` as r INNER JOIN events as e ON r.id = e.routine_id where r.teacher_id = "+teacher_id+" and r.school_id = "+school_id+" and e.event_from <= '"+today+"' and e.role_id = "+role_id;

        var sqlupcomming = "SELECT e.* FROM `routines` as r INNER JOIN events as e ON r.id = e.routine_id where r.teacher_id = "+teacher_id+" and r.school_id = "+school_id+" and e.event_from >= '"+today+"' and e.role_id = "+role_id;

        // console.log("SQL -> " +sqlupcomming);

        // console.log('sqlold',sqlold);
        // console.log('sqlupcoming',sqlupcomming);
        // return;
        if(data == 'number'){

            var upcomming = 0;
            var old = 0;

            con.query(sqlupcomming,function(err,result){

                if(!err && result ){

                    result.forEach(element => {
                        upcomming++;
                    });

                    con.query(sqlold,function(err,result){

                        if(!err && result ){

                            result.forEach(element => {
                                old++;
                            });

                            var data = {
                                status: 200,
                                old: old,
                                upcoming : upcomming
                            };

                            res.status(200).send(data);

                        }else{

                            console.log('Nothing');

                            var data = {
                                status: 401,
                                message: 'Something Wrong in Params'
                            };

                            res.status(401).send(data);

                        }
                    })
                }else{

                    console.log('Nothing');

                    var data = {
                        status: 401,
                        message: 'Something Wrong in Params'
                    };

                    res.status(401).send(data);
                }
            });

        }else if(data = 'data'){

            var upcomming;
            var old;

            con.query(sqlupcomming,function(err,result){

                if(!err && result ){

                    upcomming = result;

                    con.query(sqlold,function(err,result){

                        if (!err&&result ) {

                            old = result;

                            var data = {
                                status: 200,
                                old: old,
                                upcoming : upcomming
                            };

                            res.status(200).send(data);
                        }

                    })

                }

            })

        }
         
    } catch (error) {

        let message = 'Unauthorized: Wrong Username and Password';

        var data = {
            status: 401,
            message: error
        };

        res.status(401).send(data);

        console.log(error);

    }
})


router.post('/teacher/mystudent',async(req,res,next)=>{

    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var teacher_id = header['teacher_id'];
        var user_id = header['user_id'];
        var type = header['type'];

        if(type == 'add'){
            var body = req.body;
            // console.log(body);
            let firstname = body.firstname;
            let lastname = body.lastname;
            let fathername = body.fathername;
            let fathercont = body.fathercont;
            let email = body.email;
            let password = body.password;
            let studentcont = body.studentcont;
            let gender = body.gender;
            let studentic = body.studentic;
            let ictype = body.ictype;
            let dob = body.dob;
            let bufferObj = Buffer.from(password, "utf8");
  
            // Encode the Buffer as a base64 string
            let temp_password = bufferObj.toString("base64");

            var usersData = [
                [role_id,school_id,temp_password,email,temp_password,1,password]
            ];

            var leadsData = [
                [school_id,teacher_id,firstname+' '+lastname,'',email,studentcont,'Direct']
            ]

            var usersSql = "INSERT INTO users(role_id,school_id,temp_password,username,reset_key,status,password) values ?";

            var leadsSql = "INSERT INTO leads(school_id,assign_id,name,course_name,email,mobile,medium) values ?";

            var studentSql = "INSERT INTO students_registration(first_name,last_name,user_id,fathers_name,fathers_contact,email,mobile,gender,student_ic,passport_type,date_of_birth,school_id) values ?";

            con.query(usersSql,[usersData],function(err,result){
                if(!err && result){
                    var usersTblId = result.insertId;
                    con.query(leadsSql,[leadsData],function(errleads,resultleads){
                        if (!errleads && resultleads ){
                            var leadsTblId = resultleads.insertId;

                            var studentData = [
                                [firstname,lastname,usersTblId,fathername,fathercont,email,studentcont,gender,studentic,ictype,dob,school_id]
                            ]

                            con.query(studentSql,[studentData],function(errstu,resultstu){
                                if (!errstu && resultstu ){
                                    var resData = {
                                        "status": 200,
                                        "date":{ insertid: resultstu.insertId,message:"Student Added Successfully"
                                        }
                                    }
                                    res.status(200).send(resData);
                                }else{
                                    var resData = {
                                        "status": 201,
                                        "message":"Something Went wrong in 3 Registation"
                                    }
                                    res.status(201).send(resData);
                                }
                            })


                        }else{
                            var resData = {
                                "status": 201,
                                "message":"Something Went wrong in 2 Registation"
                            }
                            res.status(201).send(resData);
                        }
                    })

                }else{
                    var resData = {
                        "status": 201,
                        "message":"Something Went wrong User name is already Registerd"
                    }
                    res.status(201).send(resData);
                }
            })

        }

    } catch (error) {

        var resData = {
            "status": 201,
            "message":error
        }
        res.status(201).send(resData);
        
    }

    /// Adding Data in Users Table to login User
})


router.get('/teacher/mycourses',async(req,res,next)=>{

    // res.send("heelo");
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var teacher_id = header['teacher_id'];
        var user_id = header['user_id'];

        let sql = "SELECT * FROM courses where school_id = "+school_id;
        con.query(sql,function(err,result){
            // console.log("result", result);
            if(!err && result ){
                // res.send(result);
                var data = {
                    status: 200,
                    data: result
                };
                res.status(200).send(data);

            }else{
                var resData = {
                    "status": 201,
                    "message":err
                }
                res.status(201).send(resData);
            }
        })

    }catch(error){
        var resData = {
            "status": 201,
            "message":error
        }
        res.status(201).send(resData);

    }

})

router.get('/teacher/mybatches',async(req,res,next)=>{

    var header = JSON.parse(JSON.stringify(req.headers));
        
    var role_id = header['role_id'];
    var school_id = header['school_id'];
    var teacher_id = header['teacher_id'];
    var user_id = header['user_id'];
    var course_id = header['course_id'];

    let sql = "SELECT * FROM course_batch where course_id = "+course_id+" and school_id = "+school_id;

    // let sql = "SELECT * FROM `routines` where teacher_id = "+teacher_id+" and school_id = "+school_id+" and class_id = "+course_id;

    con.query(sql,function(err,result){
        //console.log('result',result)
        if(!err && result){
            var resData = {
                "status": 200,
                "data":result
            }
            res.status(200).send(resData);
        }else{
            var resData = {
                "status": 201,
                "message":err
            }
            res.status(200).send(resData);
        }
        
    })

})

router.get('/teacher/getBatchStudents',async(req,res,next)=>{
    try {
        var header = JSON.parse(JSON.stringify(req.headers));
        var role_id = header['role_id'];
        var school_id = header['school_id'];
        var teacher_id = header['teacher_id'];
        var user_id = header['user_id'];
        var course_id = header['course_id'];
        var batch_id = header['batch_id'];
        var date = header['dateofattendance'];

        // let sql = "SELECT c.course_name, en.course_id as enroll_course_Id,en.batch_id,sr.* FROM enrollments as en LEFT JOIN students_registration as sr ON en.student_id = sr.id LEFT JOIN courses as c ON en.course_id = c.id where en.course_id =  and en.batch_id = "+batch_id;

        let mainSql = "SELECT c.course_name, en.course_id AS enroll_course_Id, en.batch_id, sr.*, sa2.status AS attendancestatus,sa2.date AS attendancedate FROM enrollments AS en LEFT JOIN students_registration AS sr ON en.student_id = sr.id LEFT JOIN courses AS c ON en.course_id = c.id LEFT JOIN student_mainattendance AS sa2 ON en.student_id = sa2.student_id AND sa2.date = '"+date+"' WHERE en.course_id = "+course_id+" AND en.batch_id = "+batch_id +" AND sr.school_id = "+school_id;

        con.query(mainSql,function(err,result){
            if(!err && result){
                var resData = {
                    "status": 200,
                    "data":result
                }
                res.status(200).send(resData);
            }else{
                var resData = {
                    "status": 201,
                    "message":"There Are Somting wrong to get Details. Please Try After some time.",
                    "err":err
                }
                res.status(201).send(resData);
            }
            
        })
        
    } catch (error) {

        var resData = {
            "status": 203,
            "message":"Data Not Responding"
        }
        res.status(203).send(resData);
        
    }

})

router.get('/teacher/notificationTeacher',async(req,res,next)=>{
    var header = JSON.parse(JSON.stringify(req.headers));

    var role_id = header['role_id'];

    var school_id = header['school_id'];

    // let mysql = "SELECT * FROM `notices` where viewstatus = 0 and role_id = 5";

    // con.query(mysql,function(err,result){

    //     if(!err && result){
    //         for(i of result ){
    //             trole = i.role_id;
    //             noticeId=i.id;
    //             sql = "SELECT * FROM users where role_id = "+ trole+" orderby id DESC";
    //             con.query(sql,(e,r)=>{
    //                 if(!e && r){
    //                     for(user of r){
    //                         userid = user.id;
    //                         console.log("userid",user.id,"noticeID",noticeId );
                            // selectSql = "SELECT * FROM usernotification where notice_id = "+noticeId+" and user_id = "+userid;
                            // con.query(selectSql,(er,re)=>{
                            //     var num = 0;
                            //     re.forEach(element => {
                            //         num++;
                            //     });

                            //     console.log("Hello",num);

                                // if(num == 0){
                                //     insertData = "INSERT INTO usernotification (school_id,notice_id,user_id) values('"+school_id+"','"+noticeId+"','"+userid+"')";
                                //     con.query(insertData,(err,res)=>{
                                //         console.log("done");
                                //     });
                                // }
                                
                            // })
                            
    //                     }
    //                 }
    //             })

                
    //         }
    //     }

    // });

    // return;




    

        var teacher_id = header['teacher_id'];



        var sqlold = "SELECT * FROM `notices` where role_id = "+role_id+ " and school_id = "+school_id+" and viewstatus = 0";

        // res.send(sqlold);
        // return;

        con.query(sqlold,function(err,result){
            
            if(!err && result){
                var num = 0;
                result.forEach(element => {
                    num++;
                });
                var resData = {
                    "status": 200,
                    "data":result,
                    "number": num
                }
                res.status(200).send(resData);
            }else{
                var resData = {
                    "status": 201,
                    "message":err
                }
                res.status(201).send(resData);
            }
            
        })

});

router.get('/teacher/markattendance',async(req,res,next)=>{
    var header = JSON.parse(JSON.stringify(req.headers));
    var course_id = header['course_id'];
    var batch_id = header['batch_id'];
    var student_id = header['student_id'];
    var school_id = header['school_id'];
    var attendancedate = header['attendancedate'];
    var attendanceStatus = header['attendancestatus'];
    var teacher_id = header['teacher_id'];

    let selectSql = "SELECT * FROM student_mainattendance where course_id = "+course_id+" and batch_id ="+batch_id+" and student_id = "+student_id+" and school_id = "+school_id+" and date = '"+attendancedate+"'";

    // console.log(selectSql);
    // return;

    con.query(selectSql,function(err,result){
        // console.log('result',result);
        var num = 0;

        result.forEach(element => {
            num++;
        });

        if(num == 1){

            var muFunSql="UPDATE student_mainattendance SET status='"+attendanceStatus+"' WHERE course_id = "+course_id+" and batch_id ="+batch_id+" and student_id = "+student_id+" and school_id = "+school_id+" and date = '"+attendancedate+"'";

            // console.log(updateSql);
            
        }else{
            
            var muFunSql = "INSERT INTO student_mainattendance (course_id ,batch_id,student_id,school_id,date,status,created_by,updated_by ) VALUES ('"+course_id+"','"+batch_id+"', '"+student_id+"','"+school_id+"' ,'"+attendancedate+"','"+attendanceStatus+"','"+teacher_id+"','"+teacher_id+"')";

            // console.log(insertSql);
        }
        // return;
        con.query(muFunSql,function(errw,resultw){
            if(!errw && resultw){
                var resData = {
                    "status": 200,
                    "data":resultw
                }
                res.status(200).send(resData);
            }else{
                var resData = {
                    "status": 201,
                    "message":errw
                }
                res.status(201).send(resData);
            }
        })
        
        
    })


})


module.exports = router;