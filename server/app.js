const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
var config = require('config');
var morgan = require('morgan');
var svgCaptcha = require('svg-captcha');
const mysql=require('mysql');
const mariadb=require('mariadb');
var cors = require('cors');
const register = require('./routes/register');
const user = require('./routes/user');
const company = require('./routes/company');
const userlogin = require('./userlogin');
const admin = require('./routes/admin');

const structure = require('./routes/structure');
const tushil = require('./routes/tushil');
const placement_schedule = require('./routes/placement_schedule');
const placement_joining_detail = require('./routes/placement_joining_detail')

const express = require('express'); //Load express moudule which returns a function express
const app = express(); //express fucntion retuns object of type express,by convention we call the object as app.app object support varios method get,post,put
const mysql2=require('./mysql2');
app.use(cors());


// const studentdetails = require('./routes/studentdetails');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV: ${process.env.DEBUG}`);
//In production we set NODE_ENV=production
console.log(`app: ${app.get('env')}`);

const logger = require('./middleware/logger');
//To enable parsing of JSON object in the body of request

//http://expressjs.com/en/api.html#express.json
app.use(express.json());
//http://expressjs.com/en/api.html#express.urlencoded
//app.use(express.urlencoded({ extended: true }));


if (app.get('env') === 'development') {

    app.use(morgan('dev'));//Not use in production
   // console.log('Morgan Enabled');
    startupDebugger('Morgan Enabled');
    //We can set debug from environment varible
    //Set Single Debug: DEBUG=app:satartup DEBUG=
    //Set Multiple : DEBUG=app:startup,app:db
    //Set Multiple : DEBUG=app:*
    //Disable : DEBUG=
    //command to run : DEBUG=app:db nodemon app.js

}
//Db logic
// DataBase Connection.....
const db = mysql.createConnection({
  host: config.get('db.host'),
  user: config.get('db.user'),
  password:config.get('db.password'),
  database: config.get('db.database'),
  port: 3306,
  });

  // check database connection
db.connect((err) => {
    if (err) {
      console.log(err, "dberr");
    }
    console.log("database connected...");
  });
  
dbDebugger('Connected to database');
console.log('Connected to database');


/*A middleware function is basically a function that takes a request object and return the response to client or either terminates the request/response cycle or passes control to another middleware function.Ex. Route Handler Function beacuse it take req as object and return the response to client.So it terminate the request response cycle.*/
//Another ex: express.json() when we call express.json() method this method return a middleware function the job of this middleware function is to read the request and if there is json object in the body of request it will parse the body of request into a json object then it will set it req.body property.
//express.json passes the json object to route handler function.It is builtin middleware function.
//Express application is a bunch of middleware function.
//A midleware function called in sequence

//Sattic is used to serve static data. To acess locahost:5000/readme.txt
app.use(express.static('public'));  //public is name of folder
//Coustom Middlware

app.use('/register',register);
app.use('/user',user);
app.use('/company',company);
app.use('/admin',admin);

app.use('/login',userlogin);
app.use('/tushil',tushil);
app.use('/signup',structure);

app.use('/placement_schedule',placement_schedule);
app.use('/placement_joining_detail',placement_joining_detail);


//file paths for accessing outside of brouser
app.use('/photo/images', express.static('uploads'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path
app.use('/logo/images', express.static('uploads'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path

app.use('/resume/Documents', express.static('Documents'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path
app.use('/signature/uploads', express.static('uploads'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path
app.use('/marksheets/Marksheets', express.static('Marksheets'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path

app.use('/documents', express.static('Documents'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path
app.use('/marksheets', express.static('Marksheets'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path


app.use('/broucher/images', express.static('uploads'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path
app.use('/other/images', express.static('uploads'));//by using this we can access the node file outside the application  // here we have to pass two parameter first is reference of image path and second is actual image path




// app.use(function (req, res, next) {
//     console.log("Authenticating");
//     next();
// });
//get captcha api 
app.get('/captcha', async (req, res)=> {
    var captcha =  await svgCaptcha.create({ ignoreChars: 'lI0Oo' });
    // req.session.captcha = captcha.text;
    res.json(captcha);
    // var captcha = svgCaptcha.create({ ignoreChars: 'lI' });
    // captcha.text = CryptoJS.AES.encrypt(JSON.stringify(captcha.text), 'svgcaptcha_key').toString();
    //  res.json(captcha);
});



// app.get('/:id',(req,res)=>{
//   //res.send("hello world");
//   var query = "SELECT * FROM tnp_student_master WHERE UE_ID = ?";
//   //var query = "";
//   var id = req.params.id;

//   mysql2.exec(query, [id], function (err, result) {
//       if (err) return res.status(404).json(err);
//       if (result.length == 0) {
//           return res.status(404).send("Student Not Found");
//       }
//       return res.json(result);
//   });

// })


const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`listening on port ${port}`);

});
