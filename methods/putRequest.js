const bodyParser = require("../utils/bodyParser");
const writeToFile = require("../utils/writeToFile");

module.exports = async(req,res)=>{
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    let id = req.url.split('/')[3];
    const regexV4 = new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/);
    if (!regexV4.test(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: "ID Not matching", message: "Invalid ID. ID not found" }));
    }
    else if (baseUrl === '/api/movies/' && regexV4.test(id)) {
        try {
            let body = await bodyParser(req);
            let index = req.movies.findIndex(item => item.id === id);
            if(index === -1){
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ title: "Not Found", message: "Movie not found." }));
            }else{
            req.movies[index] = {id,...body};
            writeToFile(req.movies);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(req.movies[index]));
            }

        } catch (error) {
            res.writeHead(400,{'Content-Type':'application/json'});
            res.end(JSON.stringify({title:"validation Failed",message:"Request body is not valid"}));
        }
    }
    else{
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({title:"Not Found",message:"Website Not Found"})); 
    }
};