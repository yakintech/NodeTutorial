const express = require('express');
const app = express();

app.get("/",function(req,res){
    res.send("Hello Express!!");
});

app.get("/contact",function(req,res){
    res.send("Contact Page");
})

var kisi = {
    "ad":"Çağatay",
    "soyad":"Yıldız",
    "sehir":"İzmir"
};

app.get("/user",function(req,res){
    res.json(kisi);
})

app.listen(3000);