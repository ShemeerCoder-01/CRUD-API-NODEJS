module.exports = (req,res)=>{
    let baseUrl = req.url.substring(0,req.url.lastIndexOf('/')+1);
    let id = req.url.split('/')[3];
    const regexV4 = new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/);
    console.log(regexV4.test('7f16a8f6-3d47-4f3b-9e3d-8b2c5e1f9a25'));
    if(req.url === '/api/movies'){
        res.statusCode = 200;
        res.setHeader('Content-Type','aplication/json');
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    else if(id){
        if(!regexV4.test(id)){
            res.writeHead(400,{'Content-Type':'application/json'});
            res.end(JSON.stringify({title:"Validation Failed",message:"Invalid ID. ID not found"}));
        }else if(baseUrl === '/api/movies/' && regexV4.test(id)){
            
            res.setHeader('Content-Type','aplication/json');
            let filteredMovie = req.movies.filter((movie)=>{
                return movie.id === id;
            });
            if(filteredMovie.length > 0){
                res.statusCode = 200;
                res.write(JSON.stringify(filteredMovie));
                
            }else{
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({title:"Not Found",message:"Search data not found in the database"}));
            }
            
            res.end();
        }else{
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({title:"Invalid Url",message:"Resource Not Found"}));
        }
    }
    else{
       res.writeHead(404,{'Content-Type':'application/json'});
       res.end(JSON.stringify({title:"Not Found",message:"Website Not Found"}));
    }
};