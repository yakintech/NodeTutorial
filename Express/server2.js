const express = require('express');
const app = express();

var groups = [
    {"id":1,"name":"Amon Amarth"},
    {"id":2,"name":"Anathema"},
    {"id":3,"name":"Slayer"},
    {"id":4,"name":"Gojira","country":"France"},
    {"id":5,"name":"Sylosis","country":"UK"}
]

app.get("/api/groups",(req,res)=>{
    res.json(groups);
});

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.get("/api/groups/:id",(req,res)=>{
    var id = req.params.id;
    var g = groups.find(q => q.id == id);
    res.send(g);
})

app.listen(3000);
