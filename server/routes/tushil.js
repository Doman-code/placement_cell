const express = require('express');
const router = express.Router();
const Joi = require('joi')
var mysql=require('../mysql2'); // importing (only those thing will import which are exporting on the require folder(mysql) i.e function exec )

router.get('/doman',async (req,resp)=>{
    var query = "select * from user"
    try{
        let result = await mysql.exec(query)
        if(result.length==0){
            resp.status(404).send("student details not found")            
        }
        resp.status(200).json(result)
    }

    catch(err){
        resp.status(404).json(err);
    }
})

router.get('/getStudentDetails',async (req,resp)=>{
    var query = "SELECT s.student_id,s.student_name,s.dob,c.name AS course_name,s.course_id,s.mobile_no FROM studentdetails s INNER JOIN courses c on s.course_id=c.id"
    try{
        let result = await mysql.exec(query)
        if(result.length==0){
            resp.status(404).send("student details not found")            
        }
        resp.status(200).json(result)
    }

    catch(err){
        resp.status(404).json(err);
    }
})


router.get('/userlist/:id',async (req,resp)=>{
    var query = "select * FROM user WHERE role = ?";
    // var query = " ";
    var id = req.params.id;

   try {
        let result = await mysql.exec(query,[id])
        if (result.length == 0){
        return resp.status(404).send("user details not found");    
        } 
    return resp.json(result);
  }
  catch(err){
         return resp.status(404).json(err);
    }
  })


//insert into studentdentails set = ? //here we send json in array form where it key works as column and value works as value
//whenever insertion is performed then it return a id (data.InsertID)
router.post('/userlist',async(req,resp)=>{
   

  // const {error} = validateCourse(req.body)
    // if (error){
    //    return resp.status(404).send(error.details[0].message)
    //     }

    var query = "INSERT into user SET ?";
    var value = req.body;
    try{
        let result = await mysql.exec(query,value)
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return resp.status(404).send('error');}
     return resp.json({id:result.insertId})
    }

    catch(err){
            if(err){
                return resp.status(404).send('error'); }
            }
})


router.put('/updateStudentDetailsById/:id',async (req,resp)=>{

    const {error} = validateCourse(req.body)
    if (error){
       return resp.status(404).send(error.details[0].message) 
    }
     
    var query = "update studentdetails set ? where student_id = ? ";
    var value = req.body;
    var id = req.params.id;

    try{
       let result = await mysql.exec(query,[value, id])
        if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
            return resp.status(404).send('error');
        }
        return resp.json({status: "success" })    
     }

     catch(err){
            if(err){
                return resp.status(404).send('error');   
                
        }
    }
})


router.delete('/:id',async (req,resp)=>{

     
    var query = "delete from studentdetails where student_id = ? ";
    var id = req.params.id;
try{
    let result = await mysql.exec(query, id)
    if(result.affectedRows < 1){ //affectRows denote any changes is done through any operation (put,post)
        return resp.status(404).send('error');     
    }
    return resp.json({status: "data deleted" })
}

catch(err){
    if(err){
        return resp.status(404).send('error'); }
    }
})

function validateCourse(details){
    const schema = Joi.object({
        student_name: Joi.string().required().min(3),
        dob:Joi.required(),
        course_id:Joi.required(),
        mobile_no:Joi.string().pattern(/^[6-9][0-9]+$/).length(10).required()
    }).unknown(true); 
    return schema.validate(details)
}


module.exports = router;

//err will go to reject and result will go to resolve

//try get resolve code  and catch get reject code