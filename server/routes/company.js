const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql2 = require('../mysql');
var mysql3 = require('../mysql2')
const config=require('config');
const multer=require('multer');
const path=require('path');
const app=express();

 //all data  get api without id working
router.get('/', (req, res) => {

    var query = "SELECT * from tnp_student_master ";

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


// company logo url
router.get('/photo/images/:id',async (req,resp)=>{
  // const query = "SELECT CONCAT('" + req.protocol + '://' + req.get('host')  + "', mbd.Emp_Photo_Path) as Emp_Photo_Path FROM manpower_basic_detail mbd WHERE Emp_Id = ?";
  // var query = "SELECT Emp_ID,mbd.Emp_Photo_Path, FROM manpower_basic_detail mbd WHERE Emp_Id = ?";
  const query = `SELECT  CONCAT('${req.protocol + '://' + req.get('host')}', tnpcr.Company_Logo) AS company_logo_Path from tnp_company_registration tnpcr WHERE tnpcr.Tnp_Registration_No = ?`;

  var Emp_Id = req.params.id;
 try {
      let result = await mysql3.exec(query,[Emp_Id])
      if (result.length == 0){
      return resp.status(405).send(err);    
      } 
  return resp.json(result);
}
catch(err){
       return resp.status(406).json(err);
    }
  })

// get company category
 router.get('/CompanyType', (req, res) => {

    var query = "SELECT * from company_type";

    //var query = "";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Company Not Found");
        }
        return res.json(result);
    });


});

//is registered api 
router.get('/isregistered/:id',  (req, res) => {

  var query = "SELECT Name from tnp_company_registration where Tnp_Registration_No=?";

  //var query = "";
  var id = req.params.id;

  mysql2.exec(query, [id], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send("Company Not Found");
      }
      return res.json(result);
  });


});




router.get('/CompanyCategory', (req, res) => {

    var query = "SELECT * from company_category";

    //var query = "";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Company Not Found");
        }
        return res.json(result);
    });


});

//get applicants
router.get('/applicants/:id', (req, res) => {

  var query = "SELECT * from tnp_student_application_details where Company_ID=?";

  //var query = "";
  var id = req.params.id;

  mysql2.exec(query, [id], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send("Company Not Found");
      }
      return res.json(result);
  });


});


//get applicants resume
router.get('/applicantsresume/:id', (req, res) => {

  var query = `SELECT  CONCAT('${req.protocol + '://' + req.get('host')}', tnpsm.Resume_Path) AS resume_path from tnp_student_master tnpsm where Registration_No=?`;

  //var query = "";
  var id = req.params.id;

  mysql2.exec(query, [id], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send(err);
      }
      return res.json(result);
  });


});

//get applicants by id
router.get('/appliedjobs/:id', (req, res) => {

  //var query = "SELECT * from tnp_student_application_details where Student_ID=?";
  
  // demo 
  var query = "SELECT sad.Student_Application_ID, sad.Post_Name, sad.Application_Submission_Date, sad.Status, tnpcr.Name from tnp_student_application_details sad join tnp_company_registration tnpcr where sad.Company_ID = tnpcr.Tnp_Registration_No AND  Student_ID=?";


  //var query = "";
  var id = req.params.id;

  mysql2.exec(query, [id], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send(err);
      }
      return res.json(result);
  });


});


// update applicants status  selecting students
router.put('/selectapplicants/:id', (req, res) => {

  var id = req.params.id;
//  var values = req.body;
  var query = "UPDATE tnp_student_application_details SET Status='selected' WHERE Student_Application_ID = ? ";

  // Return Query Status
  mysql2.exec(query, [ id], function (err, data) {
      if (err) { if (err) return res.status(404).send(err); };
      if (data.affectedRows < 1) {
          return res.status(404).send(err);
      }
      res.json(data);
  });

});


//update applicants status rejecting students
router.put('/rejectapplicants/:id', (req, res) => {


  var id = req.params.id;
//  var values = req.body;
  var query = "UPDATE tnp_student_application_details SET Status='rejected' WHERE Student_Application_ID = ? ";

  // Return Query Status
  mysql2.exec(query, [ id], function (err, data) {
      if (err) { if (err) return res.status(404).send(err); };
      if (data.affectedRows < 1) {
          return res.status(404).send(err);
      }
      res.json(data);
  });

});


//get vacancy detail

router.get('/vacancydetail/:id', (req, res) => {

  //var query = "SELECT * from tnp_vacancy_details where Vacancy_ID=?";
  var query = "SELECT * from tnp_vacancy_details where Company_Id=? AND Status ='approved'";
  

  //var query = "";
  var id = req.params.id;

  mysql2.exec(query, [id], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send("vacancy Not Found");
      }
      return res.json(result);
  });
  
});


// post api for company registraion
router.post('/register', (req, res) => {
    console.log(res);
    var query = "INSERT INTO  tnp_company_registration set ? ";
  
    var id = req.params.id;
    var values=req.body;

    mysql2.exec(query, [values], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("company Not Found");
        }
        return res.json(result);
    });
    
});

// postjob data aip 

// post api for company registraion
router.post('/jobPost', (req, res) => {
  console.log(res);
  var query = "INSERT INTO  tnp_vacancy_details set ? ";

  var id = req.params.id;
  var values=req.body;

  mysql2.exec(query, [values], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send("company Not Found");
      }
      return res.json(result);
  });
  
});

// post job academic detail
router.post('/academicDetail', (req, res) => {
  console.log(res);
  var query = "INSERT INTO  tnp_vacancy_academic_details set ? ";

  var id = req.params.id;
  var values=req.body;

  mysql2.exec(query, [values], function (err, result) {
      if (err) return res.status(404).json(err);
      if (result.length == 0) {
          return res.status(404).send("academic detail Not Found");
      }
      return res.json(result);
  });
  
});



//fileUploads code 

const upload = multer({   //here upload is function
  
    storage: multer.diskStorage({
      destination: function (req, file, cb) {   //it decide where we want to store our file //cb is a call back function
       
        cb(null, "uploads"); //it contain two parameter second one is upload path(**uploads is a folder name***)
      },
  
      filename: function (req, file, cb) {
    
        cb(null, Date.now()+path.extname(file.originalname)); //here first parameter is error ,second parameter is filename(which can be modify)
        
      }
      
    }),
    limits:{fileSize:10000000}   //this for limiting file size
  });           //.single("user")///here we have to define that we have to upload single file or multiple file and also define the key name(field name)
//app.use('/images', express.static('uploads'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path

// Logog File End point
router.post('/uploadLogo',upload.single('company_logo'),(req, resp,next) => {  //here user is the key for image which must be same in frotend(angular)
  const file = req.file;
  if(!file){
    return next("no file found")
  }

  
  resp.json({
        
logo_url: `/logo/images/${req.file.filename}`//when we are using multer then we get file information on req.file

     })


});

// Broucher file end point
router.post('/uploadBroucher',upload.single('company_broucher'),(req, resp,next) => {  //here user is the key for image which must be same in frotend(angular)
    const file = req.file;
    if(!file){
      return next("no file found")
    }
  
    
    resp.json({
          
  broucher_url: `/broucher/images/${req.file.filename}`//when we are using multer then we get file information on req.file
  
       })
  
  
  });
  
// Other File end piont
router.post('/uploadOther',upload.single('company_other'),(req, resp,next) => {  //here user is the key for image which must be same in frotend(angular)
  const file = req.file;
  if(!file){
    return next("no file found")
  }

  
  resp.json({
        
other_url: `/other/images/${req.file.filename}`//when we are using multer then we get file information on req.file

     })


});


module.exports = router;
