const   Pool = require("pg").Pool ; 

const pool = new Pool ({
    type: "postgres", 
    port:  5432,
    host: "localhost",
    database:"graphqlcrudtest" ,  
    user:"postgres", 
    password:"bd"
    // type: "postgres",
    // host: "192.168.100.241",
    // database: "bd_p04_dev",
    // user: "sa_p04", 
    // password: "9pL7K3vLd", 

}); 

 module.exports = pool ;   
