const mongoose = require("mongoose");
const express = require('express');
const app = express();

mongoose.connect(`mongodb+srv://azra_elturco:1996417B@cluster417-vl3kd.mongodb.net/test?authSource=admin&replicaSet=Cluster417-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
`, { useNewUrlParser: true });

const Schema = mongoose.Schema;

const metalSchema = new Schema({
    name:String,
    category:String,
    country:String,
    favoritesong:String,
    songs:[],
    adddate:{type:Date,default:Date.now}
});
const writerSchema = new Schema({
    name:String,
    surname:String,
    city:String,
    favoritebook:String
});

const writer = mongoose.model("Writer",writerSchema);
const metal = mongoose.model("Metal",metalSchema);


app.get("/api/writer",(req,res)=>{
    writer.find((err,doc)=>{
            res.json(doc);
    })
})

app.get("/api/writer/:id",(req,res)=>{
    var id = req.params.id;
    writer.findById(id,(err,doc)=>{
        res.json(doc);
    })
});


app.listen(3001)


writer.find((err,doc)=>{
    //console.log(err);
});

writer.find({"city":"Adana"},(err,doc)=>{
   // console.log(doc);
})



// 2 adet yeni schema olustur.
//1 - product (name, unitprice(number olacak), description)
//2 - employee (name, surname, birthdate)

//bu şemalara test verileri gir

//2 adet express uç oluştur. "/api/product" ve "/api/employee" şeklinde. Bu url ler tetiklendiğinde datalar gelsin






// var wr = new writer({
//     name:"H",
//     surname:"Welss",
//     city:"USA",
//     favoritebook:"Zaman Makinesi"
// });

// var mt = new metal({
//     name:"Rammstein",
//     category:"Endustriyel Metal",
//     country:"Deutchland",
//     songs:['Deutchland','Radio','America']
// });


//mt.save();
//wr.save();



