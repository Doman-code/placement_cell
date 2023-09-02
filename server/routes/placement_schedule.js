const express = require('express'); //Load express moudule which returns a function express)
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql2 = require('../mysql2');
const config=require('config');
const multer=require('multer');
const path=require('path');
const app=express();

// get company
router.get('/getCompany', async (req, res) => {
    var query = "SELECT Company_ID,Name FROM tnp_company_registration";
    console.log("called");
    let result = await mysql2.exec(query);
    
    if (result.length == 0)
        return res.status(404).send("Data Not Found");

    return res.json(result);
});


// get vacancy
router.get('/getVacancy', async (req, res) => {
    var query = "SELECT Vacancy_ID,Job_Title FROM tnp_vacancy_details";
    console.log("called");
    let result = await mysql2.exec(query);
    if (result.length == 0)
        return res.status(404).send("Data Not Found");

    return res.json(result);
});

router.get('/allPlace_Sche', async (req, res) => {
    var query = "SELECT * FROM placement_schedule";
    console.log("called");
    let result = await mysql2.exec(query);
    
    if (result.length == 0)
        return res.status(404).send("Data Not Found");

    return res.json(result);
});

router.get('/getTabledata', async (req, res) => {
    var query = "SELECT pa.Placement_Schedule_ID,pa.Company_ID,vd.Job_Title,vd.Vacancy_ID,cr.Name,pa.Placement_Date,pa.Placement_Venue FROM placement_schedule pa  LEFT JOIN tnp_company_registration cr ON cr.Company_ID = pa.Company_ID LEFT JOIN tnp_vacancy_details vd ON vd.Vacancy_ID = pa.Vacancy_ID WHERE pa.Delete_YN IS null";
    console.log("called");
    let result = await mysql2.exec(query);
    if (result.length == 0)
        return res.status(404).send("Data Not Found");

    return res.json(result);
});

router.put('/updateResourceAssign/:id', async (req, res) => {
    var query = "UPDATE placement_schedule SET ? WHERE Placement_Schedule_ID = ?";
    var Placement_Schedule_ID = req.params.id;
    var values = req.body;
    try {
        let result = await mysql2.exec(query, [values, Placement_Schedule_ID])
        if (result.affectedRows < 1) { //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send(err);
        }
        return res.json({ status: "success" })
    }
    catch (err) {
        if (err) {
            return res.status(404).send(err);
        }
    }

});

// Delete departmetnt detail
    router.delete('/deletedataByid/:id',async (req,res)=>{
        var query = "update placement_schedule SET Delete_YN ='Y' where Placement_Schedule_ID = ?"

        var Placement_Schedule_ID = req.params.id;
    try{
        let result = await mysql2.exec(query, Placement_Schedule_ID)
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send('error...');     
        }
        return res.json({status: "data deleted" })
    }
    catch(err){
        if(err){
            return res.status(404).send('error'); }
      }
    })


// post data in department detail
router.post('/PostSchedule', async (req, res) => {
    var values = req.body;
    var query = "INSERT INTO placement_schedule SET ? ";
    try {
        let data = await mysql2.exec(query, values);
        res.json({
            Placement_Schedule_ID: data.insertId
        });
    } catch (err) {
        return res.status(404).json(err);
    }
});


const upload = multer({   //here upload is function
    storage: multer.diskStorage({
      destination: function (req, file, cb) {   //it decide where we want to store our file //cb is a call back function
        cb(null, "uploads"); //it contain two parameter second one is upload path(****uploads is a folder name*****)
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname+Date.now()+path.extname(file.originalname)); //here first parameter is error ,second parameter is filename(which can be modify)
      }
    }),
    limits:{fileSize:1000000000000000}   //this for limiting file size
  });   
          //.single("user")///here we have to define that we have to upload single file or multiple file and also define the key name(field name)
  router.use('/api/images', express.static('uploads'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path
  router.post("/uploadfile",upload.single("Logo_Path"),(req, resp,next) => {  //here file_Path is the key for image which must be same in frotend(angular)
    const file = req.file;
    if(!file){
      return next("no file found")
    }
     resp.json({
          profile_url: `http://localhost:3000/api/images/${req.file.filename}`, //when we are using multer then we get file information on req.file
          // profile_url: `images/${req.file.filename}`,
          sucess:'file uploaded'
      })
      // console.log(req.file)
  });

function validatedepartmentdata(departDetail) {
    const schema = Joi.object({
        Dept_Name: Joi.string().required(),
        Parent_Dept_ID: Joi.number(),
        Dept_Type_ID: Joi.number().required(),
        Email_ID: Joi.string().required(),
        Website_Url: Joi.string().min(3).required(),
        About_Department: Joi.string().required(),
        Work_Description:Joi.string(),
        Address:Joi.string(),
        State: Joi.number(),
        Distric: Joi.number(),
        Block: Joi.string(),
        Pincode: Joi.string().required(),
        Contact_Number: Joi.string(),
        Contact_Person_ID: Joi.number(),
      
        // gender: Joi.string().min(3).required(),
        // dob: Joi.date().required(),
        // Mobile_no: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    }).unknown(true);
    return schema.validate(departDetail);

}

module.exports = router;