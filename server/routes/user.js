const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql2 = require('../mysql2');
let rollNumberCounter = 0; // Counter to keep track of roll numbers


function generateRollNumber() {
    rollNumberCounter++; // Increment the counter
    const rollNumber = `RN${padNumber(rollNumberCounter, 6)}`; // Generate roll number with a padded counter
    
    return rollNumber;
  }
  
  // Helper function to pad a number with leading zeros
  function padNumber(number, length) {
    let str = number.toString();
    
    while (str.length < length) {
      str = '0' + str;
    }
    
    return str;
  }
  
// get all working

// router.get('/academicdetail', (req, res) => {

//     var query = "SELECT * FROM TnP_Student_Academic_Details";
//     //var query = "";
//     var id = req.params.id;

//     mysql2.exec(query, function (err, result) {
//         if (err) return res.status(404).json(err);
//         if (result.length == 0) {
//             return res.status(404).send("Student Not Found");
//         }
//         return res.json(result);
//     });

// });





// api for profile photo 
router.get('/photo/images/:id',async (req,resp)=>{
    // const query = "SELECT CONCAT('" + req.protocol + '://' + req.get('host')  + "', mbd.Emp_Photo_Path) as Emp_Photo_Path FROM manpower_basic_detail mbd WHERE Emp_Id = ?";
    // var query = "SELECT Emp_ID,mbd.Emp_Photo_Path, FROM manpower_basic_detail mbd WHERE Emp_Id = ?";
    const query = `SELECT  CONCAT('${req.protocol + '://' + req.get('host')}', tnpsm.Student_Photo) AS Student_Photo_Path ,CONCAT('${req.protocol + '://' + req.get('host')}', tnpsm.Student_Signature) AS Student_Signature_Path, CONCAT('${req.protocol + '://' + req.get('host')}', tnpsm.Resume_Path) AS Student_Resume_Path from tnp_student_master  tnpsm WHERE tnpsm.Registration_No = ?`;

    var Emp_Id = req.params.id;
   try {
        let result = await mysql2.exec(query,[Emp_Id])
        if (result.length == 0){
        return resp.status(405).send("Data not found");    
        } 
    return resp.json(result);
  }
  catch(err){
         return resp.status(406).json(err);
    }
  })

router.get('/academicdetail', async (req, resp) => {
    var query = "select * from TnP_Student_Academic_Details "
    try {
        let result = await mysql2.exec(query)
        if (result.length == 0) {
            resp.status(404).send("Academic details not found")
        }
        resp.status(200).json(result)
    }

    catch (err) {
        resp.status(404).json(err);
    }
})

//degreetye api
router.get('/degreetype', async (req, res) => {

    var query = "SELECT * from degree_type ";
    //var query = "";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send("degree type not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});

// select all degree program 
router.get('/degreeprogram/', async (req, res) => {

    var query = "SELECT * from degree_program";
    //var query = "";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send("degree program not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});


// api for retriving degree program type (degree program), "working"
router.get('/degreeprogram/:id', async (req, res) => {

    var query = "SELECT * from degree_program where Degree_Programme_Type_Id= ? ";
    //var query = "";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send("degree program not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});

// get subject 
router.get('/subjects', async (req, res) => {

    var query = "SELECT * from subjects";
    //var query = "";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send("subject not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});

// get academicdetail by id working
router.get('/academicDetails/:id', async (req, res) => {

    //var query = "SELECT *FROM tnp_student_academic_details_array sada  JOIN degree_type dt ON sada.Degree_Programme_Type_Id = dt.Degree_Programme_Type_Id  JOIN degree_program dp ON sada.Degree_Programme_Type_Id=dp.Program_Id   JOIN admission_session ads ON sada.Admission_Year_Id=ads.Admission_Session_id where Registration_No =?";
    
   var query = "SELECT *FROM tnp_student_academic_details_array sada   LEFT  JOIN degree_type dt ON sada.Degree_Programme_Type_Id = dt.Degree_Programme_Type_Id  LEFT JOIN degree_program dp ON sada.Degree_Programme_Id=dp.Program_Id    LEFT JOIN admission_session ads ON sada.Admission_Year_Id=ads.Admission_Session_id  where Registration_No =?;";

    

    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send("academic detail not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});


//  put api for academic detail

router.put('/academic/:id', async (req, res) => {


    //Validate Course

    // const { error } = validateRegister(req.body);// Object Destructor 

    // if (error) {
    //     res.status(404).send(error.details[0].message);
    // }
    var id = req.params.id;
    var values = req.body;
    var query = "UPDATE TnP_Student_Academic_Details SET ? WHERE Academic_Detail_Id = ? ";

    // Return Query Status
    try {
        let result = await mysql2.exec(query, [values, id])
        if (result.affectedRows < 1) { //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send('error');
        }
        return res.json({ status: "success" })
    }

    catch (err) {
        if (err) {
            return res.status(404).send('error');

        }
    }

});


// api for retriving Personal detail
router.get('/personaldetail/:id', async (req, res) => {

     var query = "SELECT * , CONCAT('"+req.protocol +'://'+ req.get('host') + "', sm.Resume_Path) AS Student_resume_Path from tnp_student_master sm , passing_out_year poy where sm.Degree_Completed_Session_id = poy.PassingOut_Year_Id AND Registration_No=?";
   //  var query = "select * from tnp_student_master where Registration_No=?";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return res.status(404).send("student personal detail not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});
// api for retriving Skills
router.get('/skills', async (req, res) => {

    var query = "SELECT * from tnp_m_skill";
    //var query = "";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send(err);
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});



// api for retriving Skills by id
router.get('/skilldata/:id', async (req, res) => {

    // running
    //var query = "SELECT * from tnp_student_skills tnpss , tnp_m_skill tnpms where tnpss.Skill_Id=tnpms.Skill_ID AND Registration_No=?";

    // testing
    var query = "SELECT *, CONCAT('"+req.protocol +'://'+ req.get('host') + "', tnpss.Skill_Cetificate_Url) AS Student_Skill_Path  from tnp_student_skills tnpss , tnp_m_skill tnpms where tnpss.Skill_Id=tnpms.Skill_ID AND Registration_No=?";

    //var query = "CONCAT('${req.protocol + '://' + req.get('host')}', tnpms.Skill_Certificate_Url) AS Student_Photo_Path ,";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send("skills not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});

// api for retriving Skills
router.get('/colleges', async (req, res) => {

    var query = "SELECT * from college";
    //var query = "";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return res.status(404).send("college not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});

//post api  for academic detail working 
// router.post('/academicdata', async (req, res) => {
//     console.log(res);
//     // const rollNumber1 = generateRollNumber();
//     //  console.log(rollNumber1); // Output: RN000001
    

//     var query = "INSERT INTO tnp_student_academic_details_array  set ? ";

//     var id = req.params.id;
//     var values = req.body;
//    // values.Student_Id= `${rollNumber1}`;

   
    
//     try {
//         let result = await mysql2.exec(query, [values, id])
//         if (result.affectedRows < 1) { //affectRows denote any changes is done through any operation (put,post)
//             return res.status(404).send('error');
//         }
//         return res.json({ id: result.insertId })
//     }

//     catch (err) {
//         if (err) {
//             return res.status(404).send('error');
//         }
//     }

// });


router.post('/academicdata', async(req, res) => {
    console.log(res);

    var query = "INSERT INTO tnp_student_academic_details_array set ? ";

    var values = req.body;
    console.log(values);
    try{
        let result = await mysql2.exec(query,[values])
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send('error doamn');}
     return res.json({id:result.insertId})
    }

    catch(err){
            if(err){
                return res.status(404).send(err); }
            }

});


router.get('/academicdata', async(req, res) => {
    console.log(res);

    var query = "select * from  tnp_student_academic_details_array ";

  

    var values = req.body;
    console.log(values);
    try{
        let result = await mysql2.exec(query,[values])
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send('error doamn');}
     return res.json(result)
    }

    catch(err){
            if(err){
                return res.status(404).send(err); }
            }

});

//post api  for skill detail working 
router.post('/skilldata', async(req, res) => {
    console.log(res);

    var query = "INSERT INTO tnp_student_skills set ? ";

    var values = req.body;
    console.log(values);
    try{
        let result = await mysql2.exec(query,[values])
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send('error ');}
     return res.json({id:result.insertId})
    }

    catch(err){
            if(err){
                return res.status(404).send(err); }
            }


});

// Experience by id
router.get('/experiencedata/:id',async (req, res) => {

    var query = "SELECT * FROM tnp_student_experience where Registration_No=?";
    //var query = "";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send("Experience not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});


//post api  for experiencedata  working 
router.post('/experiencedata', async(req, res) => {
    console.log(res);

    var query = "INSERT INTO tnp_student_experience set ? ";

    var id = req.params.id;
    var values = req.body;

    try{
        let result = await mysql2.exec(query,[values])
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send(err);}
     return res.json({id:result.insertId})
    }

    catch(err){
            if(err){
                return res.status(404).send(err); }
            }

});

//get notification detail APi for home page

router.get('/notificationdetail', async (req, res) => {

   var query = "SELECT * FROM notification_details  ";
    //var query = "SELECT * FROM tnp_vacancy_details tnpvd, notification_details nd WHERE tnpvd.Vacancy_ID=nd.Vacancy_ID ";

    //var query = "";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return res.status(404).send("notification detail not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});


router.get('/notificationdetailforuser/:id', async (req, res) => {

    // runnnin
   // var query = "SELECT * FROM notification_details  ";

//    demo running 
   // var query = "SELECT * FROM tnp_vacancy_details tnpvd, notification_details nd WHERE tnpvd.Vacancy_ID=nd.Vacancy_ID  ";
 
  var query = "SELECT *,CONCAT('"+req.protocol +'://'+ req.get('host') + "', tnpvad.Document_Url) AS PDF_PATH FROM tnp_vacancy_academic_details tnpvad ,notification_details nd  WHERE tnpvad.Degree_Programme_Type_Id IN (SELECT Degree_Programme_Type_Id FROM  tnp_student_academic_details_array where Registration_No=?) AND tnpvad.Vacancy_ID=nd.Vacancy_Id ";
     var id = req.params.id;
 
     try {
         let result = await mysql2.exec(query, [id])
         if (result.length == 0) {
             return res.status(404).send("notification detail not found");
         }
         return res.json(result);
     }
     catch (err) {
         return res.status(404).json(err);
     }
 
 });
 


//get application details

router.get('/applicationdetail', async (req, res) => {

    var query = "SELECT * FROM tnp_student_application_details";
     //var query = "SELECT * FROM tnp_vacancy_details tnpvd, notification_details nd WHERE tnpvd.Vacancy_ID=nd.Vacancy_ID ";
 
     //var query = "";
     var id = req.params.id;
 
     try {
         let result = await mysql2.exec(query, [id])
         if (result.length == 0) {
             return res.status(404).send("application detail not found");
         }
         return res.json(result);
     }
     catch (err) {
         return res.status(404).json(err);
     }
 
 });
 

// notification by id
router.get('/notificationdetail/:id',async (req, res) => {

    //runnning
   var query = "SELECT  * FROM tnp_vacancy_details tnpvd, tnp_vacancy_academic_details tnpvad, notification_details nd WHERE tnpvd.Vacancy_ID=nd.Vacancy_ID AND tnpvd.Vacancy_ID=tnpvad.Vacancy_ID AND nd.Vacancy_ID=? ";
    //  var query = "SELECT  CONCAT('${req.protocol + '://' + req.get('host')}', tnpvad.Document_Url) AS Vac_Doc_Url FROM tnp_vacancy_academic_details ";
//demo
  // var query = "SELECT  *, CONCAT('"+req.protocol +'://'+ req.get('host') + "', tnp_vad.Document_Url) AS Document_Path FROM tnp_vacancy_academic_details tnp_vad,  tnp_vacancy_details tnpvd, tnp_vacancy_academic_details tnpvad, notification_details nd WHERE tnpvd.Vacancy_ID=nd.Vacancy_ID AND tnpvd.Vacancy_ID=tnpvad.Vacancy_ID AND  nd.Vacancy_ID=? ";


    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return res.status(404).send("notification detail not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});

//vacancy academic detail
router.get('/vacancyacademic', async (req, resp) => {
    var query = "select Degree_Programme_Type_Id from tnp_vacancy_academic_details "
    try {
        let result = await mysql2.exec(query)
        if (result.length == 0) {
          return  resp.status(404).send("vacancy Academic details not found")
        }
      return  resp.status(200).json(result)
    }

    catch (err) {
       return resp.status(404).json(err);
    }
})

//user academic detail for filtering data

router.get('/useracademic/:id', async (req, resp) => {
    var query = "select Degree_Programme_Type_Id from tnp_student_academic_details_array where Registration_No=? "
    var id = req.params.id;
    try {
        let result = await mysql2.exec(query,[id])
        if (result.length == 0) {
          return  resp.status(404).send(" user Academic details not found")
        }
      return  resp.status(200).json(result)
    }

    catch (err) {
      return  resp.status(404).send('not found useracdemic');
    }
})



//notification pdf for dialog box

router.get('/notification_docuement/:id',async (req, res) => {

    //runnning
  // var query = "SELECT  * FROM tnp_vacancy_details tnpvd, tnp_vacancy_academic_details tnpvad, notification_details nd WHERE tnpvd.Vacancy_ID=nd.Vacancy_ID AND tnpvd.Vacancy_ID=tnpvad.Vacancy_ID AND nd.Notification_ID=? ";
    //  var query = "SELECT  CONCAT('${req.protocol + '://' + req.get('host')}', tnpvad.Document_Url) AS Vac_Doc_Url FROM tnp_vacancy_academic_details ";
//demo
   var query = "SELECT   CONCAT('"+req.protocol +'://'+ req.get('host') + "', tnp_vad.Document_Url) AS Document_Path FROM tnp_vacancy_academic_details tnp_vad WHERE   tnp_vad.Vacancy_ID=? ";


    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send("Document detail not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});



// notification pdf s
router.get('/notificationpdf/:id',async (req, res) => {

  //var query = "SELECT  *  FROM tnp_vacancy_details tnpvd, tnp_vacancy_academic_details tnpvad, notification_details nd WHERE tnpvd.Vacancy_ID=nd.Vacancy_ID AND tnpvd.Vacancy_ID=tnpvad.Vacancy_ID AND nd.Notification_ID=? ";
 // var query = "SELECT  * CONCAT('${req.protocol + '://' + req.get('host')}', tnpvad.Document_Url) AS Vac_Doc_Url FROM tnp_vacancy_academic_details tnpvad where Vacancy_ID=? ";
 var   query=`SELECT CONCAT('${req.protocol + '://' + req.get('host')}', tvd.Document_Url)  AS photo FROM tnp_vacancy_academic_details tvd where Vacancy_ID=?`
 
     var id = req.params.id;
 
     try {
         let result = await mysql2.exec(query, [id])
         if (result.length == 0) {
             return re.status(404).send("notification detail not found");
         }
         return res.json(result);
     }
     catch (err) {
         return res.status(404).json(err);
     }
 
 });



// post api working

router.post('/', async(req, res) => {


    // const { error } = validateRegister(req.body);
    // if (error) {
    //     res.status(404).send(error.details[0].message);
    // }
    var values = req.body;
    var query = "INSERT INTO TnP_Student_Academic_Details SET ? ";

    try{
        let result = await mysql2.exec(query,[values,id])
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send('error');}
     return res.json({id:result.insertId})
    }

    catch(err){
            if(err){
                return res.status(404).send('error'); }
            }



});

//  api put working

router.put('/:id',async (req, res) => {


    //Validate Course

    // const { error } = validateRegister(req.body);// Object Destructor 

    // if (error) {
    //     res.status(404).send(error.details[0].message);
    // }
    var id = req.params.id;
    var values = req.body;
    var query = "UPDATE TnP_Student_Academic_Details SET ? WHERE Academic_Detail_Id = ? ";

    // Return Query Status
    try{
        let result = await mysql2.exec(query,[values,id])
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return res.status(404).send('error');}
     return res.json({id:result.insertId})
    }

    catch(err){
            if(err){
                return res.status(404).send('error'); }
            }

});

// api working for delete  

router.delete('/:id', (req, res) => {

    var id = req.params.id;
    var query = "DELETE FROM TnP_Student_Academic_Details WHERE Academic_Detail_Id = ?";
    mysql2.exec(query, [id], function (err, data) {
        if (err) { if (err) res.status(404).send('error'); return; };
        if (data.affectedRows < 1) {

            res.status(404).send('error'); return;
        }
        res.json({ success: true });
    });

});


function validateRegister(register) {
    const schema = Joi.object({
        Academic_Detail_Id: Joi.required(),
        Registration_No: Joi.required(),
        College_Id: Joi.required(),
        Admission_Year_Id: Joi.required(),
        PassigOut_Year_Id: Joi.required(),
        Degree_Program_Type_Id: Joi.required(),
        Subject_Id: Joi.required(),
        Attach_Doc: Joi.required(),
        OGPA: Joi.required(),
        Student_Id: Joi.required(),


    });
    return schema.validate(register);

}

function validateAcademic(details) {
    const schema = Joi.object({
        student_name: Joi.string().required().min(3),
        dob: Joi.required(),
        course_id: Joi.required(),
        mobile_no: Joi.string().pattern(/^[6-9][0-9]+$/).length(10).required()
    }).unknown(true);
    return schema.validate(details)
}

function validatedemo(demo) {
    const schema = Joi.object({
        name: Joi.string(),
        course: Joi.string()
    })
    return schema.validate(demo);
}

module.exports = router;

