const express = require("express"); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require("joi"); //joi module return a Class and By covention class name start with capital letter
var mysql2 = require("./mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

var config = require("config");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  var username = req.body.username;
  var password = req.body.password;

  var query = "SELECT * FROM signup WHERE User_Name = ? ";

  try {
    mysql2.exec(query, [username], async function (err, result) {
      if (err) {
        return res.json({
          success: 0,
          message: "User Not found",
        });
      }
      if (result.length == 0) {
        // return res.status(404).send("user Not Found");
        return res.json({
            success: 0,
            message: "User Not found",
          });
      }

      let data = result;
      console.log(data);
      console.log(result[0].Password);
      console.log("username ", result[0].User_Name);
      var role = result[0].Role;
      var reg_no = result[0].Registration_No;
      var user_name = result[0].User_Name;
      var email = result[0].Email;

      let passwordKey = "08t16e502526fesanfjh8nasd2";
      let passwordDncyt = CryptoJS.AES.decrypt(password, passwordKey).toString(
        CryptoJS.enc.Utf8
      );
      console.log("Decrpyt Pwd", passwordDncyt);

      const validPassword = await bcrypt.compare(
        passwordDncyt,
        result[0].Password
      );

console.log('Password Validity : ----' ,validPassword);

      if (!validPassword) {
        
        return res.json({
          success: 0,
          message: `Invalid User Name or Password`,
        });


      } else if (validPassword) {
        let response = {
          // username: username,
          id: reg_no,
          username: user_name,
          email: email,
          role: role,
        };
        const token = jwt.sign(response, config.get("jwtPrivateKey"), {
          expiresIn: "500000s",
          // expires in 24 hours; expiresIn: '60s' expires in 24 hours
        });
        return res.json({
          token: token,
          success: 1,
          username: username,
          role: role,
          message: "login Success",
        });

      } 
      else{
        return res.json
        ({
            success: 0,
            message: `Wrong credential.`
        });
      }


    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: 0,
      message: "Something Went Wrong",
    });
  }
});

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).unknown(true);
  return schema.validate(user);
}

module.exports = router;
