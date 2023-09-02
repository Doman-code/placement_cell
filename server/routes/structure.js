const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql2 = require('../mysql2');
const CryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config()

var config = require('config');
// api for signup details
router.get('/signup', async (req, res) => {

    var query = "SELECT * from signup";
    //var query = "";
    var id = req.params.id;

    try {
        let result = await mysql2.exec(query, [id])
        if (result.length == 0) {
            return re.status(404).send("User not found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }

});



router.post('/signup', async(req, res) => {
    console.log(res);

    var query = "INSERT INTO signup  set ? ";
let pass;
    var id = req.params.id;
    var password=req.body.Password;
    let passwordKey = '08t16e502526fesanfjh8nasd2';
    let passwordDncyt = CryptoJS.AES.decrypt(password, passwordKey).toString(CryptoJS.enc.Utf8);
   
    console.log("decrpted passwod -> : ",passwordDncyt);

    async function run() {
        const salt = await bcrypt.genSalt(10);
    
        console.log(salt);
       const  hashed = await bcrypt.hash(`${passwordDncyt}`, salt);
         pass=hashed;
       // req.body.Password = hashed
       return pass;
    }
     const pass2= await run();
     req.body.Password = pass2;

    var values = req.body;
    console.log(values);
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




// Generate and send OTP via email

// Generate and send OTP via email

const otpStorage = {};
router.post('/generate-otp', (req, res) => {
  const { email } = req.body;
 
  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStorage[email] = otp;
  console.log(otpStorage[email]);
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
      user: process.env.Email,
      pass: process.env.Pass

     
    }
  });

  // Define email options
  const mailOptions = {
    from: process.env.Email,
    to: email,
    subject: 'OTP for Login',
    text: `Your verification OTP for Placement Cell is: ${otp}`
  };

  // Send the email with OTP
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send OTP:', error);
      res.status(500).json({status:400, message: 'Failed to send OTP' });
    } else {
      console.log('OTP sent successfully');
      res.status(200).json({status:200, message: otp});
      // res.status(200).json({ message: 'OTP sent successfully '${otp} });
    }
  });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Here, you should have the logic to validate the OTP
  // against the OTP associated with the given email address.
  // You can use a database to store the OTPs and their associations.

  // For this example, we assume that the OTP is correct
  const storedOTP = otpStorage[email];
  console.log(storedOTP);
  // console.log(otp);
  if (otp == storedOTP) {
    console.log('OTP verification successful');
    res.status(200).json({ status:200, message: 'OTP verification successful' });
  } else {
    console.log('Invalid OTP');
    res.status(401).json({ status:400,message: 'Invalid OTP' });
  }
});

//send email to booked property

// router.post('/userbookedproperty', (req, res) => {
//   const { email } = req.body;
//   const { ApplicantName } = req.body;
//   const { ApplicantPhone_number } = req.body;
//   const {project}=req.body
//   const {property}=req.body
//   const {Quarter}=req.body
//   const {Quarter_Price}=req.body
 
//   // Generate a random OTP
//   // const otp = Math.floor(100000 + Math.random() * 900000);
//   // otpStorage[email] = otp;
//   // console.log(otpStorage[email]);
//   // Create a Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail', // e.g., 'Gmail'
//     auth: {
//       user: process.env.Email,
//       pass: process.env.Pass
//     }
//   });

//   // Define email options
//   const mailOptions = {
//     from: process.env.Email,
//     to: email,
//     subject: 'CGHB Booked Property Details',
//     text: `Booked Property Details...
//           Applicant Name        : ${ApplicantName}
//           Applicant Phone Number: ${ApplicantPhone_number}
//           project               : ${project}
//           property              : ${property}
//           Quarter               : ${Quarter}
//           Quarter_Price         : ${Quarter_Price}
//           `
//   };

//   // Send the email with OTP
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Failed to send Booked Property Details:', error);
//       res.status(500).json({status:400, message: 'Failed to send Booked Property Details' });
//     } else {
//       console.log('Booked Property Details Send Successfully..');
//       res.status(200).json({status:200, message: otp});
//       // res.status(200).json({ message: 'OTP sent successfully '${otp} });
//     }
//   });
// });



// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Here, you should have the logic to validate the OTP
  // against the OTP associated with the given email address.
  // You can use a database to store the OTPs and their associations.

  // For this example, we assume that the OTP is correct
  const storedOTP = otpStorage[email];
  console.log(storedOTP);
  // console.log(otp);
  if (otp == storedOTP) {
    console.log('OTP verification successful');
    res.status(200).json({ status:200, message: 'OTP verification successful' });
  } else {
    console.log('Invalid OTP');
    res.status(401).json({ status:400,message: 'Invalid OTP' });
  }
});



module.exports = router;