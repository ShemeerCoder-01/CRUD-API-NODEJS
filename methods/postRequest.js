const responseBodyParser = require('../utils/bodyParser');
const write_to_file = require('../utils/writeToFile');
const crypto = require('crypto');

module.exports = async(req,res)=>{
    if(req.url === '/api/movies'){
        try {
            let body = await responseBodyParser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            write_to_file(req.movies);
            res.writeHead(201,{'Conten-Type':'application/json'});
            res.end();
        } catch (error) {
            console.log(error);
            res.writeHead(400,{'Content-Type':'application/json'});
            res.end(JSON.stringify({title:"Request Failed",message:'Request Failed.Please check the data you are trying to pass is correct.'}))

        }
    }
    else{
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({title:"Not Found",message:"Website Not Found"}));
     }
};