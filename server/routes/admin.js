const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql2 = require('../mysql');
var mysql3 = require('../mysql2');

const config=require('config');
const path=require('path');
const app=express();
var db=require('./dbconnection');
const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");



// select all vacancies
router.get('/vacancydetail', (req, res) => {

   //var query = "SELECT * from tnp_vacancy_details ";

   var query = "SELECT * FROM signup INNER JOIN tnp_vacancy_details ON signup.Registration_No = tnp_vacancy_details.Company_Id";
    //   var query = "SELECT * FROM signup su , tnp_vacancy_details tvd ,tnp_company_registration cr ON su.Registration_No = tvd.Company_Id  and su.Registration_No = cr.Tnp_Registration_No";
 
   var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Vacancy Not Found");
        }
        return res.json(result);
    });


});

//get students by enrollno 
router.get('/getStuden/:id', (req, res) => {

    var query = "SELECT * from tnp_student_master tnp_sm , salutation_e se    WHERE tnp_sm.Salutation_E = se.Salutation_Id AND   UE_ID = ?";
    //var query = "";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Student Not Found");
        }
        return res.json(result);
    });

});


//academicdetail api 

router.get('/academicdetai', (req, res) => {

    var query = "SELECT * from tnp_student_academic_details ";

    //var query = "";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Academic detail Not Found");
        }
        return res.json(result);
    });

});


//view all registered companies 
router.get('/registerdcompany', (req, res) => {

  var query = "SELECT * from tnp_company_registration ";

  //var query = "";
  var id = req.params.id;

  mysql2.exec(query, [id], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send("Students detail Not Found");
      }
      return res.json(result);
  });

});


//view all registered students
router.get('/registerdstudents', (req, res) => {

  var query = "SELECT * from tnp_student_master ";

  //var query = "";
  var id = req.params.id;

  mysql2.exec(query, [id], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send("Students detail Not Found");
      }
      return res.json(result);
  });

});

// view all registered users  

router.get('/registerdusers', (req, res) => {

  var query = "SELECT User_Name,Email,Registration_No from signup ";

  //var query = "";
  var id = req.params.id;

  mysql2.exec(query, [id], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send("Students detail Not Found");
      }
      return res.json(result);
  });

});

//forgetpassword
router.put('/updatepassword/:Registration_No', async (req, res) => {
   

  const password = req.body.password;
  let passwordKey = '08t16e502526fesanfjh8nasd2';
  let passwordDncyt = CryptoJS.AES.decrypt(password, passwordKey).toString(CryptoJS.enc.Utf8);
  console.log('Decrpyt Pwd', passwordDncyt);

  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashed = await bcrypt.hash(passwordDncyt, salt);
  console.log(hashed);

  // const { error } = validateusers(req.body);
  // if (error) {
  //     res.status(404).send(error.details[0].message);
  // }

  var values = {
    password: hashed,
  };

  var query ="update signup set ? where Registration_No = ? ";

  try {
    let data = await mysql3.exec(query, [values, req.params.Registration_No]);
    res.json({
      id: data.insertId,
    });
  } catch (err) {
    return res.status(404).json(err);
    }
  });


//apporve vacancy
// update applicants status  selecting students
// router.put('/approvevacancy/:id', (req, res) => {

//     var id = req.params.id;
//   //  var values = req.body;
//     var query = "UPDATE tnp_vacancy_details SET Status='approved' WHERE Vacancy_ID = ? ";
  
//     // Return Query Status
//     mysql2.exec(query, [ id], function (err, data) {
//         if (err) { if (err) return res.status(404).send(err); };
//         if (data.affectedRows < 1) {
//             return res.status(404).send(err);
//         }
//         res.json(data);
//     });
  
//   });


//   tushil transaction code
router.put('/approvevacancy/:id', function (req, res) {
    
    db.getConnection(function (err, connection) {
      if (err) {
        console.error('Error getting database connection:', err);
        return res.status(500).send('Internal server error');
      }

      var id = req.params.id;
    //   value=req.body
  
    //   let student_name = req.body.student_name;
    //   let dob = req.body.dob;
    //   let course_id = req.body.course_id;
    //   let mobile_no = req.body.mobile_no;
  
      connection.beginTransaction(function (beginTransactionError) {
        if (beginTransactionError) {
          console.error('Error starting transaction:', beginTransactionError);
          return res.status(500).send('Internal server error');
        }
  
        connection.query(
          `UPDATE tnp_vacancy_details SET Status='approved' WHERE Vacancy_ID = ? `,
          [id],
        // `INSERT INTO studentdetails set ? `,[value],
          function (error, results, fields) {
            if (error) {
              console.error('Error inserting data:', error);
              connection.rollback(function () {
                connection.release();
                return res.status(500).send('Internal server error');
              });
              return res.json(results);

            }

            //second quert
            connection.query(
                `select * from tnp_vacancy_details where Vacancy_ID= ?`,
                [id],
                function (error, results, fields) {
                  if (error) {
                    console.error("Error inserting data:", error);
                    connection.rollback(function () {
                      connection.release();
                      return res.status(500).send("Internal server error");
                    });
                    return;

                  }
                console.log('doman ',results[0].id);

                let vacancy_id = results[0].Vacancy_ID;
                let job_title = results[0].Job_Title;
                let job_description = results[0].Job_Description;
               let date=new Date();
               let dateOnly = date.toISOString().split('T')[0]

            //third query
            connection.query(
                // `select * from tnp_vacancy_details where Vacancy_ID= ?`,
                `insert into notification_details(Vacancy_Id,Notification_Title,Notification_Description,Notification_Date) VALUES (?, ?, ?,?)`,

                [vacancy_id,job_title,job_description,dateOnly],
                function (error, results, fields) {
                  if (error) {
                    console.error("Error inserting data:", error);
                    connection.rollback(function () {
                      connection.release();
                      return res.status(500).send("Internal server error");
                    });
                    return;
                  }
                  
                console.log(' inserted notification : ',results);
                
                }
              );

                
                }
              );



              //after all transaction commint code 

             if(results.affectedRows >=1){
                connection.commit(function (err) {
                    if (err) {
                      console.error('Error committing transaction:', err);
                      connection.rollback(function () {
                        connection.release();
                        return res.status(500).send('Internal server error');
                      });
                      return;
                    }
                    connection.release();
                    
                  });
            } 
            res.json({ message:'successfully updated'});  
          }
        );
      });
    });
  });

  //reject vacancy code
router.put('/rejectvacancy/:id', function (req, res) {
    
  db.getConnection(function (err, connection) {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).send('Internal server error');
    }

    var id = req.params.id;
 

    connection.beginTransaction(function (beginTransactionError) {
      if (beginTransactionError) {
        console.error('Error starting transaction:', beginTransactionError);
        return res.status(500).send('Internal server error');
      }

      connection.query(
        `UPDATE tnp_vacancy_details SET Status='rejected' WHERE Vacancy_ID = ? `,
        [id],
      // `INSERT INTO studentdetails set ? `,[value],
        function (error, results, fields) {
          if (error) {
            console.error('Error inserting data:', error);
            connection.rollback(function () {
              connection.release();
              return res.status(500).send('Internal server error');
            });
            return;

          }

          //second quert
          connection.query(
              `DELETE FROM notification_details where Vacancy_ID= ?`,
              [id],
              function (error, results, fields) {
                if (error) {
                  console.error("Error inserting data:", error);
                  connection.rollback(function () {
                    connection.release();
                    return res.status(500).send("Internal server error");
                  });
                  return;

                }
             // console.log('doman ',results[0].id);

            //   let vacancy_id = results[0].Vacancy_ID;
            //   let job_title = results[0].Job_Title;
            //   let job_description = results[0].Job_Description;
            //  let date=new Date();
            //  let dateOnly = date.toISOString().split('T')[0]

          //third query
          // connection.query(
          //     // `select * from tnp_vacancy_details where Vacancy_ID= ?`,
          //     `insert into notification_details(Vacancy_Id,Notification_Title,Notification_Description,Notification_Date) VALUES (?, ?, ?,?)`,

          //     [vacancy_id,job_title,job_description,dateOnly],
          //     function (error, results, fields) {
          //       if (error) {
          //         console.error("Error inserting data:", error);
          //         connection.rollback(function () {
          //           connection.release();
          //           return res.status(500).send("Internal server error");
          //         });
          //         return;
          //       }
                
          //     console.log(' inserted notification : ',results);
              
          //     }
          //   );

              
              }
            );



            //after all transaction commint code 

           if(results.affectedRows >=1){
              connection.commit(function (err) {
                  if (err) {
                    console.error('Error committing transaction:', err);
                    connection.rollback(function () {
                      connection.release();
                      return res.status(500).send('Internal server error');
                    });
                    return;
                  }
                  connection.release();
                  
                });
          } 
          res.json({ message:'successfully updated'});  
        }
      );
    });
  });
}); 

module.exports = router;