const mongoose = require("mongoose");
const express = require('express');
const app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


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

const comicbookSchema = new Schema({
    name:String,
    country:String
})

const writer = mongoose.model("Writer",writerSchema);
const metal = mongoose.model("Metal",metalSchema);
const comicbook = mongoose.model("Comicbook",comicbookSchema);


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

app.post("/api/writer",(req,res)=>{

    var wr = new writer({
        name: req.body.name,
        surname:req.body.surname,
        city:req.body.city,
        favoritebook:req.body.fbook
    });
    wr.save();

    res.send("Success!!");
})



app.get("/api/comicbook",(req,res)=>{
    comicbook.find((err,doc)=>{
        res.json(doc);
    })
})

app.post("/api/comicbook",(req,res)=>{
    var cb = new comicbook({
        name:req.body.name,
        country:req.body.country
    });

    cb.save();

    res.send("Success!!")
})

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

var cb = new comicbook({
    name:"Watchmen",
    country:"USA"
});

//cb.save();


//mt.save();
//wr.save();



