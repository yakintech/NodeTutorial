const express = require('express');
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//http://localhost:1925
app.get("/",(req,res)=>{
    res.send("Anasayfaya hoşgeldin!!")
})

//http://localhost:1925/contact
app.get("/contact",(req,res)=>{
    res.send("İletişim sayfasına hoşgeldin");
});

app.post("/adduser",(req,res)=>{
    console.log(req.body);
    res.send("OK!");
})




app.listen(1925);
