const http = require('http');
require("dotenv").config();
const getReq = require('./methods/getRequest');
const postReq = require('./methods/postRequest');
const putReq = require('./methods/putRequest');
const deleteReq = require('./methods/deleteRequest');
let movies = require('./data/movie.json');

const PORT = process.env.PORT || 5001;  
console.log(PORT);
const server = http.createServer((req,res)=>{
   
    req.movies = movies;
  
    switch(req.method){
        case "GET":
            getReq(req,res);
            break;
        case "POST":
            postReq(req,res);
            break;
        case "PUT":
            putReq(req,res);
            break;
        case "DELETE":
            deleteReq(req,res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type","application/json");
            res.write(JSON.stringify({title:"Not Found",message:"Website Not Found"}));
            res.end();

    }
    
    
});

server.listen(PORT,()=>{
    console.log(`Server started on port : ${PORT}`);
});
