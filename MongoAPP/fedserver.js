const express = require('express');
const app = express();

var bodyParser = require("body-parser");
var mongo = require('./mongoschema');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bilgebatman19@gmail.com',
      pass: 'Superman!35'
    }
  });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.post("/api/film", (req, res) => {
    var f = new mongo.film({
        name: req.body.name,
        director: req.body.director,
        year: req.body.year
    });

    f.save((err, doc) => {
        if (!err) {
            res.send("OK!")
        }
        else {
            res.status(500).send("Error!");
        }
    });


});

app.get("/api/film", (req, res) => {

    mongo.film.find({ isdeleted: false }).exec((err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else {
            res.status(500).send("Error!")
        }
    })
});

app.post("/api/film/delete", (req, res) => {

    var id = req.body.id;

    mongo.film.findById(id, (err, doc) => {
        if (!err) {
            doc.isdeleted = true;
            doc.deleteddate = Date.now();
            doc.save();
            res.send("OK!")
        }
        else {
            res.status(500).send("Error!");
        }
    })
    // mongo.film.findByIdAndDelete(id,(err,doc)=>{
    //     if(!err){
    //         res.send("OK!")
    //     }
    //     else{
    //         res.status(500).send("Error!");
    //     }
    // })
});

app.get("/api/film/:id", (req, res) => {
    var id = req.params.id;

    mongo.film.findById(id, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else {
            res.status(500).send("Error!");
        }
    })
});

app.post("/api/film/update", (req, res) => {
    var id = req.body.id;

    mongo.film.findById(id, (err, doc) => {
        doc.name = req.body.name;
        doc.director = req.body.director;
        doc.year = req.body.year;

        doc.save();
        res.send("OK");
    })
});

app.post("/api/email",(req,res)=>{

    var mailOptions = {
        from: 'bilgebatman19@gmail.com',
        to: 'cagatayyildiz87@gmail.com',
        subject: 'Contact',
        text: req.body.name + " " + req.body.surname + " den gelen iletişim mesajı : " + req.body.message
      };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send("Email gönderildi!")
        }
      });


})



app.listen(3001);



// post servislerinde kesinlikle bir validation olması gerekli!
//db save işlemi var ise db den kaynaklanan hatalardan dolayı kullanıcıya bilgi verilmeli.
// herhangi bir durumda hata olduysa bu hatadan haberimiz olması gerek
// doğru http kodları gitmeli
