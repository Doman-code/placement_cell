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
        return res.status(404).send(err);


    return res.json(result);
});

// placement schedule
router.get('/getcShedule', async (req, res) => {
    var query = "SELECT Placement_Schedule_ID FROM placement_schedule";
    console.log("called");
    let result = await mysql2.exec(query);
    if (result.length == 0)
        return res.status(404).send(err);
    return res.json(result);
});

// get student
router.get('/getStudent', async (req, res) => {
    var query = "SELECT TnP_Student_Master_Id,Student_First_Name_E FROM tnp_student_master";
    console.log("called");
    let result = await mysql2.exec(query);
    if (result.length == 0)
        return res.status(404).send(err);

    return res.json(result);
});
// get vacancy
router.get('/getVacancy', async (req, res) => {
    var query = "SELECT Vacancy_ID,Job_Title FROM tnp_vacancy_details";
    console.log("called");
    let result = await mysql2.exec(query);
    if (result.length == 0)
        return res.status(404).send(err);

    return res.json(result);
});

router.get('/allJoiningDetail', async (req, res) => {
    var query = "SELECT * FROM placement_joining_details";
    console.log("called");
    let result = await mysql2.exec(query);
    
    if (result.length == 0)
        return res.status(404).send(err);

    return res.json(result);
});

router.get('/getTabledata', async (req, res) => {
    var query = "SELECT jd.Placement_Joining_ID,jd.Student_ID,tn.Student_First_Name_E,ps.Placement_Schedule_ID,jd.Company_ID,cr.Name,jd.Vacancy_ID,vd.Job_Title,jd.Offer_Date,jd.Joining_Date,jd.Accept_Reject_Date,jd.Accept_Reject_Status,jd.Reason_for_Rejection FROM placement_joining_details jd  LEFT JOIN tnp_company_registration cr ON cr.Company_ID = jd.Company_ID LEFT JOIN tnp_vacancy_details vd ON vd.Vacancy_ID = jd.Vacancy_ID LEFT JOIN tnp_student_master tn ON tn.TnP_Student_Master_Id = jd.Student_ID LEFT JOIN placement_schedule ps ON ps.Placement_Schedule_ID = jd.Placement_Schedule_ID WHERE jd.Delete_YN IS NULL";
    console.log("called");
    let result = await mysql2.exec(query);
    if (result.length == 0)
        return res.status(404).send(err);

    return res.json(result);
});

router.put('/updateDetail/:id', async (req, res) => {
    var query = "UPDATE placement_joining_details SET ? WHERE Placement_Joining_ID = ?";
    var Placement_Joining_ID = req.params.id;
    var values = req.body;
    try {
        let result = await mysql2.exec(query, [values, Placement_Joining_ID])
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
        var query = "update placement_joining_details SET Delete_YN ='Y' where Placement_Joining_ID = ?"

        var Placement_Joining_ID = req.params.id;
    try{
        let result = await mysql2.exec(query, Placement_Joining_ID)
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send('error...');     
        }
        return res.json({status: "data deleted" })
    }
    catch(err){
        if(err){
            return res.status(404).send(err); }
      }
    })


// post data in department detail
router.post('/PostData', async (req, res) => {
    var values = req.body;
    var query = "INSERT INTO placement_joining_details SET ? ";
    try {
        let data = await mysql2.exec(query, values);
        res.json({
            Placement_Joining_ID: data.insertId
        });
    } catch (err) {
        return res.status(404).json(err);
    }
});



module.exports = router;