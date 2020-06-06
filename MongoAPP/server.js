const express = require('express');
const app = express();

var bodyParser = require("body-parser");
var mongo = require('./mongoschema');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.post("/api/film",(req,res)=>{
    var f = new mongo.film({
        name:req.body.name,
        director:req.body.director,
        year:req.body.year
    });

    f.save((err,doc)=>{
        if(!err){
            res.send("OK!")
        }
        else{
            res.status(500).send("Error!");
        }
    });

 
});

app.get("/api/film",(req,res)=>{

    mongo.film.find((err,doc)=>{
        if(!err){
            res.json(doc);
        }
        else{
            res.status(500).send("Error!")
        }
      
    })
});

app.post("/api/film/delete",(req,res)=>{
    
    var id = req.body.id;

    mongo.film.findByIdAndDelete(id,(err,doc)=>{
        if(!err){
            res.send("OK!")
        }
        else{
            res.status(500).send("Error!");
        }
    })
})

app.listen(3001);



// post servislerinde kesinlikle bir validation olması gerekli!
//db save işlemi var ise db den kaynaklanan hatalardan dolayı kullanıcıya bilgi verilmeli.
// herhangi bir durumda hata olduysa bu hatadan haberimiz olması gerek
// doğru http kodları gitmeli
