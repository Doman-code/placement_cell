const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql2 = require('../mysql');
const config=require('config');
const multer=require('multer');
const path=require('path');
const { log } = require('console');
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

//get students by enrollno 
router.get('/getStudent/:id', (req, res) => {

    var query = "SELECT * from tnp_student_master tnp_sm , salutation_e se    WHERE tnp_sm.Salutation_E = se.Salutation_Id AND   UE_ID = ?";
    //var query = "";
    var id = req.params.id;
    console.log(id);
    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Student Not Found");
        }
        return res.json(result);
    });

});


//academicdetail api working

router.get('/academicdetail', (req, res) => {

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

//admission session api working
router.get('/admissionsession', (req, res) => {

    var query = "SELECT * from admission_session ";

    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Admission session Not Found");
        }
        return res.json(result);
    });

});

// get api for salutation without id
router.get('/salutationenglish', (req, res) => {

    var query = "SELECT * FROM salutation_e";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Salutation Not Found");
        }
        return res.json(result);
    });

});

// get api for salutation_hindi without id
router.get('/salutationhindi', (req, res) => {

    var query = "SELECT * FROM salutaion_h";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Salutation Not Found");
        }
        return res.json(result);
    });

});


//get api for country withoud id
router.get('/country/', (req, res) => {

    var query = "SELECT * FROM country";
    //var query = "";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Country Not Found");
        }
        return res.json(result);
    });

});

//get api for country with id

router.get('/country/:id', (req, res) => {

    var query = "SELECT * FROM country WHERE Current_Country_Id = ?";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Country Not Found");
        }
        return res.json(result);
    });

});


// get api for state without id
router.get('/state/', (req, res) => {

   // var query = "SELECT * FROM state";
   var  query= "SELECT DISTINCT lg.State_Code ,lg.State_Name  FROM lgdcodes lg ORDER BY lg.State_Name  ASC ";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("State Not Found");
        }
        return res.json(result);
    });

});

// get api for state with id
// router.get('/state/:id', (req, res) => {

//     var query = "SELECT * FROM state where Country_Id=?";
//     var id = req.params.id;

//     mysql2.exec(query, [id], function (err, result) {
//         if (err) return res.status(404).json(err);
//         if (result.length == 0) {
//             return res.status(404).send("State Not Found");
//         }
//         return res.json(result);
//     });

// });


// get api for district with id
router.get('/district/:id', (req, res) => {

    var query = "SELECT DISTINCT lg.District_Code ,lg.District_Name  FROM lgdcodes lg where State_Code=? ORDER BY lg.District_Name  ASC";
    var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("State Not Found");
        }
        return res.json(result);
    });

});

// get api for Blocks with id
router.get('/block/:id', (req, res) => {

   //var query = "SELECT DISTINCT lg.Block_Code , lg.Block_Name  FROM lgdcodes lg where District_Code=?  ORDER BY lg.Block_Name  ASC";
   var query="SELECT DISTINCT lg.Block_Code  , lg.Block_Name FROM lgdcodes lg WHERE lg.District_Code=? ORDER BY lg.Block_Name  ASC "; 
   var id = req.params.id;

    mysql2.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("State Not Found");
        }
        return res.json(result);
    });

});


//post api working 
router.post('/rf', (req, res) => {
    console.log(res);
    var query = "INSERT INTO tnp_student_master set ? ";
  
    var id = req.params.id;
    var values=req.body;

    mysql2.exec(query, [values], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Student Not Found");
        }
        return res.json(result);
    });
    
});

//post api for application form 
router.post('/Application', (req, res) => {
    console.log(res);
    var query = "INSERT INTO tnp_student_application_details set ? ";
  
    var id = req.params.id;
    var values=req.body;

    mysql2.exec(query, [values], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("Application not filled");
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
router.post('/uploadPhoto',upload.single('photo'),(req, resp,next) => {  //here user is the key for image which must be same in frotend(angular)
  const file = req.file;
  if(!file){
    return next("no file found")
  }

  
  resp.json({
        
// profile_url: `http://localhost:5000/images/${req.file.filename}`//when we are using multer then we get file information on req.file
profile_url: `/photo/images/${req.file.filename}` //when we are using multer then we get file information on req.file


     })


});

router.post('/uploadSignature',upload.single('signature'),(req, resp,next) => {  //here user is the key for image which must be same in frotend(angular)
    const file = req.file;
    if(!file){
      return next("no file found")
    }
  
    
    resp.json({
          
  Signature_url: `/signature/uploads/${req.file.filename}`//when we are using multer then we get file information on req.file
  //Signature_url: `http://192.168.137.79:5000/images/${req.file.filename}`//when we are using multer then we get file information on req.file
  
       })
  
  
  });
  


// documents upload
const Document = multer({   //here upload is function
  
    storage: multer.diskStorage({
      destination: function (req, file, cb) {   //it decide where we want to store our file //cb is a call back function
       
        cb(null, "Documents"); //it contain two parameter second one is upload path(**uploads is a folder name***)
      },
  
      filename: function (req, file, cb) {
    
        cb(null,Date.now()+path.extname(file.originalname)); //here first parameter is error ,second parameter is filename(which can be modify)
        
      }
      
    }),
    limits:{fileSize:10000000}   //this for limiting file size
  });  


  // Marksheets upload
const Marksheets = multer({   //here upload is function
  
    storage: multer.diskStorage({
      destination: function (req, file, cb) {   //it decide where we want to store our file //cb is a call back function
       
        cb(null, "Marksheets"); //it contain two parameter second one is upload path(**uploads is a folder name***)
      },
  
      filename: function (req, file, cb) {
    
        cb(null,Date.now()+path.extname(file.originalname)); //here first parameter is error ,second parameter is filename(which can be modify)
        
      }
      
    }),
    limits:{fileSize:10000000}   //this for limiting file size
  });

  router.post('/uploadmarksheet',Marksheets.single('Marksheet'),(req, resp,next) => {  //here user is the key for image which must be same in frotend(angular)
    const file = req.file;
    if(!file){
      return next("no file found")
    }
  
    
    resp.json({
          
  marksheet_url: `/marksheets/Marksheets/${req.file.filename}`//when we are using multer then we get file information on req.file
  
       })
  
  
  });
  

 
  router.post('/uploadDoc',Document.single('resume'),(req, resp,next) => {  //here user is the key for image which must be same in frotend(angular)
  const file = req.file;
  if(!file){
    return next("no file found")
  }

  
  resp.json({
        
// profile_url: `http://localhost:5000/Documents/${req.file.filename}`//when we are using multer then we get file information on req.file
doc_url: `/resume/Documents/${req.file.filename}`//when we are using multer then we get file information on req.file


     })


});



function validateRegister(register) {
    const schema = Joi.object({
        TnP_Student_Master_Id:Joi.required(),
        UE_ID:Joi.required(),
        Registration_Type:Joi.required(),
        Admission_Session_id:Joi.required(),
        Salutation_E:Joi.required(),
        Salutation_H:Joi.required(),
        Student_First_Name_E:Joi.required(),
        Student_Middle_Name_E:Joi.required(),
        Student_Last_Name_E:Joi.string(),
        Student_First_Name_H:Joi.required(),
        Student_Middle_Name_H:Joi.required(),
        Student_Last_Name_H:Joi.required(),
        DOB:Joi.required(),
        Gender_Id:Joi.required(),
        Mobile_No:Joi.number(),
        Email_Id:Joi.required(),
        Father_Name_E:Joi.required(),
        Mother_Name_E:Joi.required(),
        Father_Name_H:Joi.required(),
        Mother_Name_H:Joi.required(),
        Guardian_Name_E:Joi.required(),
        Spouse_Name_E:Joi.required(),
        Permanent_Address1:Joi.required(),
        Permanent_Block_Id:Joi.required(),
        Permanent_District_Id:Joi.required(),
        Permanent_State_Id:Joi.required(),
        Permanent_Country_Id:Joi.required(),
        Permanent_Pin_Code:Joi.required(),
        Permanent_Nationality:Joi.required(),
        Permanent_City:Joi.required(),
        Current_Address1:Joi.required(),
        Current_Block_Id:Joi.required(),
        Current_District_Id:Joi.required(),
        Current_State_Id:Joi.required(),
        Current_Country_Id:Joi.required(),
        Current_Pin_Code:Joi.required(),
        Current_City:Joi.required(),
        Nationality:Joi.required(),
        Degree_Completed_YN:Joi.required(),
        Degree_Completed_Session_id:Joi.required(),
        Resume_Path:Joi.required(),
        Created_By:Joi.required(),
        Created_Date:Joi.required(),
        Modified_By:Joi.required(),
        Modified_Date:Joi.required(),
        Delete_Flag:Joi.required(),
        Public_IP_Address:Joi.required(),
        Private_IP_Address:Joi.required(),
        Student_Photo:Joi.required(),
        Student_Signature:Joi.required(),
    
    });
    return schema.validate(register);

}

function validatedemo(demo){
    const schema = Joi.object({
        name:Joi.string(),
        course:Joi.string()
    })
    return schema.validate(demo);
}



module.exports = router;