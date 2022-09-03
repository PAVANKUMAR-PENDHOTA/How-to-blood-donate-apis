const mysql = require('mysql');
const express = require('express');
const unirest = require('unirest');
var request = require('request');
const cors = require('cors');
var app = express();
var axios = require('axios');
app.use(cors());
const bodyparser = require('body-parser');
const { response } = require('express');
app.use(bodyparser.json());

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sparity@123',
    database: 'blooddonation',
    // multipleStatements: true
});
mysqlconnection.connect((err) => {
    if (!err)
        console.log('DB connection successfully...')
    else
        console.log('DB connection faild \n Error : ' + JSON.stringify(err, undefined, 2));
})
app.get('/admin', (req, res) => {
    mysqlconnection.query('select * from admin_table;', (err, rows, fields) => {
        if (!err) {
            var success_json = {
                "data": rows,
                "status": "success",
                "message": "successfully"
            };
            res.send(success_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "fail"
            };
            res.send(success_json);
        }
    });
});
app.get('/admin/:username/:password', (req, res) => {
    var sql = 'SELECT admin_username,admin_password FROM admin_table where admin_username=? and admin_password=?;';
    mysqlconnection.query(sql, [req.params.username, req.params.password], (err, rows, fields) => {
        if (!err)
            // console.log(row)
            res.send(rows);
        else
            console.log(err)
    });
});
app.get('/admin', (req, res) => {
    mysqlconnection.query('select * from admin_table;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
});
app.get('/enquiry', (req, res) => {
    mysqlconnection.query('select * from enquiry_table;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });

});
app.post('/enquiry', (req, res) => {
    var emp = req.body;
    var sql = 'insert into enquiry_table(enquiry_name,enquiry_mobileno,enquiry_message) values(?,?,?);';
    mysqlconnection.query(sql, [emp.enquiry_name, emp.enquiry_mobileno, emp.enquiry_message], (err, rows, fields) => {
        if (!err) {
            res.send('success');
        }
        else {
            console.log(err);
        }
    });
});
// app.post('/donations',(req,res)=>{
//     var emp=req.body;
//     var sql='INSERT INTO `blooddonation`.`donations_table` (donations_name,donations_mobile,donations_email,donations_amount) VALUES (?,?,?,?);';
//     mysqlconnection.query(sql,[emp.donations_name,emp.donations_mobile,emp.donations_email,emp.donations_amount],(err,rows,fields)=>{
//    if(!err)
//    {
//        res.send('success');
//    }
//    else{
//        console.log(err);
//    }
//     });
// });

app.get('/feedback', (req, res) => {
    mysqlconnection.query('SELECT * FROM feedback_table', (err, rows, fields) => {
        if (!err)
            // console.log(row) 
            res.send(rows);
        else
            console.log(err)
    });
});
app.get('/feedback/:id', (req, res) => {
    mysqlconnection.query('SELECT * FROM feedback_table WHERE feedback_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            // console.log(row)
            res.send(rows);
        else
            console.log(err)
    });
});
app.delete('/feedback/:id', (req, res) => {
    mysqlconnection.query('DELETE FROM feedback_table WHERE feedback_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            // console.log(row)
            res.send('Delete Successfully');
        else
            console.log(err)
    });
});
app.post('/feedback-insert', (req, res) => {
    let emp = req.body;
    // var sql = 'SET @EmpID = ?; SET @name = ?;SET @Empcode = ?;SET @Salary = ?; \
    // CALL employeesaddoredit(@EmpID,@Name,@Empcode,@Salary);';
    //var sql = "INSERT INTO employee (name, Empcode, Salary) VALUES ('"+emp.name+"','"+ emp.Empcode+"', "+emp.Salary+")";
    var sql = "INSERT INTO feedback_table (feedback_name, feedback_emaill, feedback_message) VALUES (?,?,?);";

    mysqlconnection.query(sql, [emp.feedback_name, emp.feedback_emaill, emp.feedback_message], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            // // console.log(row)
            res.send("success");
            // rows.forEach(element => {
            //     if(element.constructor == Array)
            //     res.send("inserted id is:"+element[0].EmpID);
            //     // res.send({register:"success"});
            // });
        }
        else
            console.log(err);
        // res.send({register:"fail"});
    });
});

app.put('/feedback-update', (req, res) => {
    let emp = req.body;
    // var sql = 'SET @EmpID = ?; SET @name = ?;SET @Empcode = ?;SET @Salary = ?; \
    // CALL employeesaddoredit(@EmpID,@Name,@Empcode,@Salary);';
    var sql = "UPDATE feedback_table SET EmpID= ?,name=?,Empcode= ?,Salary=?";
    mysqlconnection.query(sql, [emp.feedback_name, emp.feedback_emaill, emp.feedback_message], (err, rows, fields) => {
        if (!err)
            // // console.log(row)
            // res.send(rows);
            res.send("success");
        else
            res.send("fail");
    });
});
app.get('/bloodbank', (req, res) => {
    mysqlconnection.query('select * from bloodbank_table;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });

});
app.get('/bloodbank/:username/:password', (req, res) => {
    var sql = 'SELECT bloodbank_username,bloodbank_password FROM bloodbank_table where bloodbank_username=? and bloodbank_password=?;';
    mysqlconnection.query(sql, [req.params.username, req.params.password], (err, rows, fields) => {
        if (!err)
            // console.log(row)
            res.send(rows);
        else
            console.log(err)
    });
});
app.post('/bloodbank', (req, res) => {
    var emp = req.body;
    var sql = 'insert into bloodbank_table(bloodbank_name,bloodbank_location,bloodbank_contactno,bloodbank_username,bloodbank_password) values(?,?,?,?,?);';
    mysqlconnection.query(sql, [emp.bloodbank_name, emp.bloodbank_location, emp.bloodbank_contactno, emp.bloodbank_username, emp.bloodbank_password], (err, rows, fields) => {
        if (!err) {
            res.send('success');
        }
        else {
            console.log(err);
        }
    });
});
app.get('/verify_user/:mobileno', (req, res) => {
    var sql = 'SELECT count(*) as count FROM mobile where mobile_no=?;';
    mysqlconnection.query(sql, [req.params.mobileno], (err, rows, fields) => {
        var obj = JSON.parse(JSON.stringify(rows));
        var keys = Object.keys(obj);
        var a = obj[keys[0]].count;
        var b = a.toString();
        if (b == '0') {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "You are not an registered user"
            };
            res.send(error_json);

        }
        else if (b == '1') {
            var req1 = unirest("GET", "https://textbeam.in/api/v1/send-sms");
            var OTP = Math.floor(Math.random() * Math.floor(9999));
            var mb = req.params.mobileno;
            message = "Namasthe, Get your running shoes ready to meet the fellow runners stepping their foot for cause. Just few hours to go. Here are your route maps THIS IS TEST MAP LOCATION ONLY -Seva Bharathi",
                message1 = message.replace("THIS IS TEST MAP LOCATION ONLY", OTP);
            req1.query({
                "api-key": "uE2OR8Oasq6CMedFJNztN5Ygl0aJF5BjMwLcwuv2",
                "sms-type": 1,
                "sender-id": 'SEVBRT',
                "mobile": mb,
                "te_id": "1507164792638289184",
                "message": message1,

            });
            req1.end(function (res) {
                if (res.error) throw new Error(res.error);
                console.log(res.body);
            });
            // var success_json="{\"response\":\"success\"}"
            var success_json = {
                "data": { OTP, mb },
                "status": "success",
                "message": "successfully"
            };
            res.send(success_json);
        }

    });
});

app.get('/validateuser/:mobileno', (req, res) => {
    var sql = 'SELECT count(*) as count FROM mobile where mobile_no=?;';
    mysqlconnection.query(sql, [req.params.mobileno], (err, rows, fields) => {
        var obj = JSON.parse(JSON.stringify(rows));
        var keys = Object.keys(obj);
        var a = obj[keys[0]].count;
        var b = a.toString();
        if (b == '0') {
            var req1 = unirest("GET", "https://textbeam.in/api/v1/send-sms");
            var OTP = Math.floor(Math.random() * Math.floor(9999));
            var mb = req.params.mobileno;
            message = "Namasthe, Get your running shoes ready to meet the fellow runners stepping their foot for cause. Just few hours to go. Here are your route maps THIS IS TEST MAP LOCATION ONLY -Seva Bharathi",
                message1 = message.replace("THIS IS TEST MAP LOCATION ONLY", OTP);
            req1.query({
                "api-key": "uE2OR8Oasq6CMedFJNztN5Ygl0aJF5BjMwLcwuv2",
                "sms-type": 1,
                "sender-id": 'SEVBRT',
                "mobile": mb,
                "te_id": "1507164792638289184",
                "message": message1,

            });
            req1.end(function (res) {
                if (res.error) throw new Error(res.error);
                console.log(res.body);
            });
            var success_json = {
                "data": { OTP, mb },
                "status": "success",
                "message": "OTP sent successfully"
            };
            res.send(success_json);
        }
        else if (b == '1') {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "mobile number already exist (You are already registered goto login page then login)"
            };
            res.send(error_json);

        }

    });
});

app.post('/mobile', (req, res) => {                     
    var emp = req.body;
    var sql = 'insert into mobile(mobile_no) values(?);';
    mysqlconnection.query(sql, [emp.mobile_no], (err, rows, fields) => {
        if (!err) {
            var success_json = {
                "data": '',
                "status": "success",
                "message": "validated successfully"
            };
            res.send(success_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "Mobile number already exists"
            };
            res.send(error_json);
        }
    });
});
app.get('/userstatus', (req, res) => {
    mysqlconnection.query('select * from donor_status_table;', (err, rows, fields) => {
        if (!err) {
            var response = {
                "data": rows,
                "status": "success",
                "message": "Data fetched successfully"
            };
            res.send(response);
        }
        else {
            var error = {
                "data": '',
                "status": "fail",
                "message": "Data not fetched "
            };
            res.send(response);
        }
    });
});


app.get('/country', (req, res) => {
    mysqlconnection.query('select * from country_table;', (err, rows, fields) => {
        if (!err) {
            var response = {
                "data": rows,
                "status": "success",
                "message": "Data fetched successfully"
            };
            res.send(response);
        }
        else {
            var error = {
                "data": '',
                "status": "fail",
                "message": "Data not fetched "
            };
            res.send(response);
        }
    });
});
app.get('/state/:cid', (req, res) => {
    mysqlconnection.query('select * from state_table where country_id=?;', [req.params.cid], (err, rows, fields) => {
        if (!err) {
            var response = {
                "data": rows,
                "status": "success",
                "message": "Data fetched successfully"
            };
            res.send(response);
        }
        else {
            var error = {
                "data": '',
                "status": "fail",
                "message": "Data not fetched "
            };
            res.send(response);
        }
    });
});
app.get('/district/:sid', (req, res) => {
    mysqlconnection.query('select * from district_table where state_id=?;', [req.params.sid], (err, rows, fields) => {
        if (!err) {
            var response = {
                "data": rows,
                "status": "success",
                "message": "Data fetched successfully"
            };
            res.send(response);
        }
        else {
            var error = {
                "data": '',
                "status": "fail",
                "message": "Data not fetched "
            };
            res.send(response);
        }
    });
});

app.get('/area/:did', (req, res) => {
    mysqlconnection.query('select * from area_table where district_id=?;', [req.params.did], (err, rows, fields) => {
        if (!err) {
            var response = {
                "data": rows,
                "status": "success",
                "message": "Data fetched successfully"
            };
            res.send(response);
        }
        else {
            var error = {
                "data": '',
                "status": "fail",
                "message": "Data not fetched "
            };
            res.send(response);
        }
    });
});
app.get('/benf', (req, res) => {
    var sql = 'select benf_table.benf_fullname,benf_table.benf_age,gender_table.gender_name,blood_type_table.blood_type_name,bloodgroup_table.bloodgroup_name,benf_table.benf_units_required,accepted_bloodgroup_table.benf_accepted_bloodgroup,benf_table.benf_deadline,benf_table.benf_mobile1,benf_table.benf_mobile2,benf_table.benf_hospital_name,benf_table.benf_hospital_address,country_table.country_name,state_table.state_name,district_table.district_name,area_table.area_name,benf_table.benf_pincode from benf_table inner join gender_table on benf_table.benf_gender=gender_table.gender_id inner join blood_type_table on benf_table.benf_blood_type=blood_type_table.blood_type_id inner join bloodgroup_table on benf_table.benf_bloodgroup=bloodgroup_table.bloodgroup_id inner join accepted_bloodgroup_table on benf_table.benf_acc_bloodgroup=accepted_bloodgroup_table.bloodgroup_id inner join country_table on benf_table.benf_country=country_table.country_id inner join state_table on benf_table.benf_state=state_table.state_id inner join district_table on benf_table.benf_district=district_table.district_id inner join area_table on benf_table.benf_area=area_table.area_id;'
    mysqlconnection.query(sql, (err, rows, fields) => {
        if (!err) {
            var response = {
                "data": rows,
                "status": "success",
                "message": "Fetch benificiary data successfully"
            }
            res.send(response);
        }
        else {
            var error = {
                "data": '',
                "status": "fail",
                "message": "Fetching of benificiary data is failed"
            }
            res.send(error);
        }
    });
});
app.get('/benf/:mobile1', (req, res) => {
    var sql = 'select benf_table.benf_fullname,benf_table.benf_age,gender_table.gender_name,blood_type_table.blood_type_name,bloodgroup_table.bloodgroup_name,benf_table.benf_units_required,accepted_bloodgroup_table.benf_accepted_bloodgroup,benf_table.benf_deadline,benf_table.benf_mobile1,benf_table.benf_mobile2,benf_table.benf_hospital_name,benf_table.benf_hospital_address,country_table.country_name,state_table.state_name,district_table.district_name,area_table.area_name,benf_table.benf_pincode from benf_table inner join gender_table on benf_table.benf_gender=gender_table.gender_id inner join blood_type_table on benf_table.benf_blood_type=blood_type_table.blood_type_id inner join bloodgroup_table on benf_table.benf_bloodgroup=bloodgroup_table.bloodgroup_id inner join accepted_bloodgroup_table on benf_table.benf_acc_bloodgroup=accepted_bloodgroup_table.bloodgroup_id inner join country_table on benf_table.benf_country=country_table.country_id inner join state_table on benf_table.benf_state=state_table.state_id inner join district_table on benf_table.benf_district=district_table.district_id inner join area_table on benf_table.benf_area=area_table.area_id where benf_table.benf_mobile1=?;'
    mysqlconnection.query(sql, [req.params.mobile1], (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": rows,
                "status": "success",
                "message": " successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error" + err.toString()
            };
            res.send(error_json);
        }
    })

});

app.post('/benfsignup', (req, res) => {
    var emp = req.body;
    var sql = 'INSERT INTO benf_table(benf_fullname, benf_age,benf_gender,benf_blood_type,benf_bloodgroup,benf_units_required,benf_acc_bloodgroup,benf_deadline,benf_mobile1,benf_mobile2,benf_hospital_name,benf_hospital_address,benf_country,benf_state,benf_district,benf_area,benf_pincode,benf_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1);';
    mysqlconnection.query(sql, [emp.benf_fullname, emp.benf_age, emp.benf_gender, emp.benf_blood_type, emp.benf_bloodgroup, emp.benf_units_required, emp.benf_acc_bloodgroup, emp.benf_deadline, emp.benf_mobile1, emp.benf_mobile2, emp.benf_hospital_name, emp.benf_hospital_address, emp.benf_country, emp.benf_state, emp.benf_district, emp.benf_area, emp.benf_pincode], (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": '',
                "status": "success",
                "message": "You  are  registered successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "You are not registered successfully" + err.toString()
            };
            res.send(error_json);
        }
    });
});

app.get('/gender', (req, res) => {
    mysqlconnection.query('select * from gender_table;', (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": rows,
                "status": "success",
                "message": " successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error"
            };
            res.send(error_json);
        }
    });

});
app.get('/bloodtype', (req, res) => {
    mysqlconnection.query('select * from blood_type_table;', (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": rows,
                "status": "success",
                "message": " successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error"
            };
            res.send(error_json);
        }
    });

});
app.get('/bloodgroup', (req, res) => {
    mysqlconnection.query('select * from bloodgroup_table;', (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": rows,
                "status": "success",
                "message": " successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error"
            };
            res.send(error_json);
        }
    });

});
app.get('/accbloodgroup', (req, res) => {
    mysqlconnection.query('select * from accepted_bloodgroup_table;', (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": rows,
                "status": "success",
                "message": " successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error"
            };
            res.send(error_json);
        }
    });

});
app.get('/user', (req, res) => {
    var sql = 'select user_table.user_fullname,user_table.user_age,gender_table.gender_name,bloodgroup_table.bloodgroup_name,user_table.user_mobile1,user_table.user_mobile2,user_table.user_emailid,user_table.user_fulladdress,country_table.country_name,state_table.state_name,district_table.district_name,area_table.area_name,user_table.user_pincode,user_table.userstatus from user_table inner join gender_table on user_table.user_gender=gender_table.gender_id inner join bloodgroup_table on user_table.user_bloodgroup=bloodgroup_table.bloodgroup_id inner join country_table on user_table.user_country=country_table.country_id inner join state_table on user_table.user_state=state_table.state_id inner join district_table on user_table.user_district=district_table.district_id inner join area_table on user_table.user_area=area_table.area_id where user_table.userstatus=1; ';
    mysqlconnection.query(sql, (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": rows,
                "status": "success",
                "message": " successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error"
            };
            res.send(error_json);
        }
    });
});
app.get('/user1', (req, res) => {
    var sql = 'select user_table.user_fullname,user_table.user_age,gender_table.gender_name,bloodgroup_table.bloodgroup_name,user_table.user_mobile1,user_table.user_mobile2,user_table.user_emailid,user_table.user_fulladdress,country_table.country_name,state_table.state_name,district_table.district_name,area_table.area_name,user_table.user_pincode from user_table inner join gender_table on user_table.user_gender=gender_table.gender_id inner join bloodgroup_table on user_table.user_bloodgroup=bloodgroup_table.bloodgroup_id inner join country_table on user_table.user_country=country_table.country_id inner join state_table on user_table.user_state=state_table.state_id inner join district_table on user_table.user_district=district_table.district_id inner join area_table on user_table.user_area=area_table.area_id ;';
    mysqlconnection.query(sql, (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": rows,
                "status": "success",
                "message": " successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error"
            };
            res.send(error_json);
        }
    });
});

app.get('/user/:mobile1', (req, res) => {
    mysqlconnection.query('select * from user_table where user_mobile1=?;', [req.params.mobile1], (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": rows,
                "status": "success",
                "message": " successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error" + err.toString()
            };
            res.send(error_json);
        }
    })

});
app.delete('user/:mobile1', (req, res) => {
    mysqlconnection.query('DELETE FROM `blooddonation`.`user_table` WHERE user_mobile1=?;', [req.params.mobile1], (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": '',
                "status": "success",
                "message": " successfully"
            };
            res.send(response_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error" + err.toString()
            };
            res.send(error_json);
        }

    })
});
app.post('/usersignup', (req, res) => {
    var emp = req.body;
    var sql = 'INSERT INTO user_table(user_fullname,user_age,user_gender,user_bloodgroup,user_mobile1,user_mobile2,user_emailid,user_fulladdress,user_country,user_state,user_district,user_area,user_pincode,userstatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    mysqlconnection.query(sql, [emp.user_fullname, emp.user_age, emp.user_gender, emp.user_bloodgroup, emp.user_mobile1, emp.user_mobile2, emp.user_emailid, emp.user_fulladdress, emp.user_country, emp.user_state, emp.user_district, emp.user_area, emp.user_pincode, emp.userstatus], (err, rows, fields) => {
        if (!err) {
            var response_json = {
                "data": '',
                "status": "success",
                "message": " successfully"
            };
            res.send('success');
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error" + err.toString()
            };
            res.send(error_json);
        }
    });
});
// app.get('/address',(req,res)=>{
//     var con,stat,dist,are;
//     mysqlconnection.query('select * from country_table;',(err,rows,fields)=>{
//         if(!err)
//         {
//             var con=rows;
//             var response={
//                 "data":{con},
//                 "status":"success",
//                 "message":"success"
//             };// res.send(response);
//             mysqlconnection.query('select * from state_table where country_id=?;',[req.params.],(err,rows,fields)=>{
//                 var stat=rows;

//             });
//         }
//         else
//         {
//             var error={
//                 "data":'',
//                 "status":"fail",
//                 "message":"fail"
//             };
//             res.send(error);
//         }
//        });
//     mysqlconnection.query('select * from state_table;',(err,rows,fields)=>{
//         var stat=rows;
//      });
//      mysqlconnection.query('select * from district_table;',(err,rows,fields)=>{
//         var dist=rows;
//      });
//      mysqlconnection.query('select * from area_table;',(err,rows,fields)=>{
//         var are=rows;
//      });

// if(!err)
// {
//     var response={
//         "data":{count,stat,dist,are},
//         "status":"success",
//         "message":"Data fetched successfully"
//     };
//     res.send(response);
// }
// else{
//     var error={
//         "data":'',
//         "status":"fail",
//         "message":"Data not fetched "
//     };
//     res.send(error);
// }
// });
// app.post('/autocall',(req,res)=>{

// function callback(error, response, body)
//  {
//     if (!error && response.statusCode == 200) 
//     {
//         console.log(body);
//     }
// }
//});

//     app.get('/call',(request,response)=>{
//  var sql='select * from user_table where user_table.userstatus=1 and user_table.user_bloodgroup=2;';
//         mysqlconnection.query(sql,(err,rows,fields)=>{
//             if(!err)
//             {
//                for(var i=0;i<rows.length;i++)
//                {
//                    var r1=rows[i];
//                    var m=r1.user_mobile1;
//                    var mobile=m.toString();
//                    console.log(mobile);
//                    const r = x =>Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
//         url="https://e62c99bb016cfef646886992c7f1002e72223e8ec6a68661:cc88955507b18eb154b0f8051683fc9c8d4c1ad9005d11a5@api.exotel.com/v1/Accounts/sevabharathi1/Calls/connect.json"
//         axios.post(url, 
//            r({
//           "From":mobile,
//           "CallerId":'04048212529',
//           "CallerType": 'trans',
//            "Url" :'http://my.exotel.com/sevabharathi1/exoml/start_voice/481283',
//         }),
//         { withCredentials: true,
//           headers: {
//               "Accept":"application/x-www-form-urlencoded",
//               "Content-Type": "application/x-www-form-urlencoded"
//           }},)
//         .then((res) => {
//           console.log(`statusCode: ${res.statusCode}`)
//           console.log(res)
//         })
//         .catch((error) => {
//           console.error(error)
//         })

//                 //    response.send('success');
//                }

//         }
//             else
//             {
//                 var error_json={
//                     "data":'',
//                     "status":"fail",
//                     "message":"error"
//                 };
//                response.send(error_json);
//             }
//         });
//     });


app.get('/data', (req1, res1) => {
    mysqlconnection.query('SELECT * FROM blooddonation.benf_table where benf_status=1', (err, rows, fields1) => {

        for (var i = 0; i < rows.length; i++) {
            add(rows[i]);
        }
        function add(msg) {
            var msgblood = msg.benf_bloodgroup;
            var sql = 'select * from user_table where user_table.userstatus=1 and user_table.user_bloodgroup=' + msgblood + ';';
            mysqlconnection.query(sql, (err, rows, fields) => {
                if (!err) {
                    for (var i = 0; i < rows.length; i++) {
                        var r1 = rows[i];
                        var m = r1.user_mobile1;
                        var mobile = m.toString();
                        console.log(mobile);
                        const r = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
                        url = "https://e62c99bb016cfef646886992c7f1002e72223e8ec6a68661:cc88955507b18eb154b0f8051683fc9c8d4c1ad9005d11a5@api.exotel.com/v1/Accounts/sevabharathi1/Calls/connect.json"
                        axios.post(url,
                            r({
                                "From": mobile,
                                "CallerId": '04048212529',
                                "CallerType": 'trans',
                                "Url": 'http://my.exotel.com/sevabharathi1/exoml/start_voice/481283',
                            }),
                            {
                                withCredentials: true,
                                headers: {
                                    "Accept": "application/x-www-form-urlencoded",
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            })
                            .then((res) => {
                                console.log(`statusCode: ${res.statusCode}`)
                                console.log(res)
                            })
                            .catch((error) => {
                                console.error(error)
                            })

                        //    response.send('success');
                    }

                }
                else {
                    var error_json = {
                        "data": '',
                        "status": "fail",
                        "message": "error"
                    };
                    response.send(error_json);
                }
            });

        }
    });
});


// var Razorpay = require('razorpay');
// app.post('order1', (req, res) => {
//     emp = req.body;
//     var sql = 'INSERT INTO `blooddonation`.`donations_table` (donations_name,donations_mobile,donations_email,donations_amount) VALUES (?,?,?,?);';
//     mysqlconnection.query(sql, [emp.donations_name, emp.donations_mobile, emp.donations_email, emp.donations_amount], (err, rows, fields) => {
//         if (!err) {
//             // url='https://api.razorpay.com/v1/orders';
//             var instance = new Razorpay({ key_id: 'rzp_test_zd7KjX26901Xjb', key_secret: '0cd05HPC2xDt9t8FSROBxYjc' })
//             instance.orders.create({
//                 amount: 100,
//                 currency: "INR",
//                 receipt: "rec#2",
//                 notes: {
//                     key1: "value3",
//                     key2: "value2"
//                 }

//             })
//         }
//         else { 
//             console.log(err);
//         }

//     });

// });


















// app.post('/donations',(req,res)=>{
//     var emp=req.body;
//     var sql='INSERT INTO `blooddonation`.`donations_table`(donations_name,donations_mobile,donations_email,donations_amount) VALUES (?,?,?,?);';
//     mysqlconnection.query(sql,[emp.donations_name,emp.donations_mobile,emp.donations_email,emp.donations_amount],(err,rows,fields)=>{
//    if(!err)
//    {
//     var instance = new Razorpay({ key_id: 'rzp_test_zd7KjX26901Xjb', key_secret: '0cd05HPC2xDt9t8FSROBxYjc' })
//     instance.orders.create({
//         amount: 100,
//         currency: "INR",
//         receipt: "rec#2",
//         notes: {
//             key1: "value3",
//             key2: "value2"
//         }

//     })
//    }
//    else{
//        console.log(err+toString());
//    }
//     });
// });



const Razorpay = require('razorpay')
const razorpay = new Razorpay({
    key_id: 'rzp_test_zd7KjX26901Xjb',
    key_secret: '0cd05HPC2xDt9t8FSROBxYjc'
})
app.post('/orders1', async (req, res) => {
    console.log(req.body.amount);
    const options = {
        amount: req.body.amount * 100,
        currency: 'INR',
        receipt: "rec#5"

    }
    console.log(options);
    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error);
        res.status(400).send('Unable to create order');
    }
})
app.post('/donation1', (req, res) => {
    var emp = req.body;
    var sql = 'INSERT INTO blooddonation.pay_table(pay_name,pay_mobile,pay_email,amount,pay_status) VALUES(?,?,?,?,1);';
    mysqlconnection.query(sql, [emp.pay_name, emp.pay_mobile, emp.pay_email, emp.amount], (err, rows, fields) => {
        if (!err) {
            var success_json = {
                "data": {},
                "status": "success",
                "message": "successfully"
            };
            res.send(success_json);
        }
        else {
            var error_json = {
                "data": '',
                "status": "fail",
                "message": "error"
            };

            res.send(error_json.toString());
        }
    });
});



app.listen(4000, () => {
    console.log('server is running at port no: 4000')
})