var mysql = require('mysql');//including/importing/loading
var config = require('config');

var exec = function(query, params){
  return new Promise((resolve,reject)=>{
    if (!query){
      return reject("query not found"); // if we not return this statement then further code also execute
    }
  
  var connection = mysql.createConnection({  //here stablishing/creating a connection
    host: config.get("db.host"),//here host denote host name
    user : config.get("db.user"),
    password: config.get("db.password"),
    database: config.get("db.database"),
  
    multipleStatements: true  //by making it true we can use multiple query at once through using semicolon but it increase the chance of sql injection 
    
  });
  
  connection.connect(function(err){  //connecting
    if(err){
      return reject(err); //if there is any error in connecting then it show error
    }

    var q = connection.query(query,params,function(err, results){ //executing query
        
    connection.end();   //here if we not end the connection then it still connect to our database for a limted time it may be hours or days so it is necessary to close/end the connection
      if(err) {return reject(err);}
      return resolve(results);
    })  
  })
  })

  
};
//here error is hold by reject
//and result is hold by resolve


module.exports.exec = exec; //here we exporting the function (exec)