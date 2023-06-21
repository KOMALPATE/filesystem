const http=require('http');
 const express=require('express')
//const hostname='127.0.0.1';
const port=3000;
const app=express();
const fs=require('fs');
const path=require('path')
const dirpath=path.join(__dirname,"");

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.post("/user",function(req,res){
    params=req.body;
    const filename=params.name;
    const filepath=`${dirpath}/${filename}.txt`;
    content="new  file";
    fs.writeFileSync(filepath,content,(err)=>{
        if(err){
            console.log(err);
        }
    });
    res.send(params);
});
app.delete("/user",function(req,res){
    params=req.body;
    const filename=params.name;
    const filepath=`${dirpath}/${filename}.txt`;
    fs.unlink(filepath, (err) => {
        try{
            if (fs.existsSync(filepath)) //handle your error the way you want to;
            console.log('file.txt was deleted');//or else the file will be deleted
            
              res.send(params)
        }catch(err){
            console.log(err);
        }
    }) 
});


// app.listen(3000)

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`server is listening on PORT : //http://localhost:${port}`)
  });
  
  