const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://azra_elturco:1996417B@cluster417-vl3kd.mongodb.net/test?authSource=admin&replicaSet=Cluster417-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
`, { useNewUrlParser: true });

const { check, validationResult } = require('express-validator');
const express = require('express');
const app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const Schema = mongoose.Schema;


const groupSchema = new Schema({
    name: String,
    description: String,
    followers: Number,
    monthlylisteners: Number,
    albums: [
        {
            name: String,
            year: Number
        }
    ],
    sociallinks: []
});

const group = mongoose.model("groups", groupSchema);


var gr = new group({
    name: "In Flames",
    description: `In Flames is a Swedish heavy metal band, which was formed by guitarist Jesper Strömblad in 1990 in Gothenburg, Sweden. At the Gates, Dark Tranquillity, Soilwork and In Flames are the only remaining bands responsible for developing the genres known as Swedish death metal and melodic death metal.

    During the band's early years, In Flames had a varying group of musicians recording with them, including many session musicians. By the release of Colony (1999) the group had established a stable lineup. Their sixth studio album Reroute to Remain (2002) showed the band moving toward a newer style of music that moved further away from melodic death metal and closer to alternative metal. This decision was criticized by fans of the group's heavier metal sound; however, it increased the band's mainstream audience and bolstered their album sales. As of 2008, In Flames had sold over 2 million records worldwide.[1].`,
    followers: 743000,
    monthlylisteners: 1419000,
    albums: [
        { name: "I, the Mask", year: 2019 },
        { name: "Battles", year: 2016 },
        { name: "Clayman", year: 2000 },

    ]
});

// gr.save((err, doc) => {
//     if (!err) {
//         console.log("Success!!");
//     }
//     else {
//         console.log(err);
//     }
// });


app.post("/api/group", [
    check("name").notEmpty(),
    check("name").isLength({ min: 3 })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var gr = new group({
        name: req.body.name,
        description: req.body.description,
        followers: req.body.followers
    });

    gr.save();

    res.send("Success!!");
});


app.get("/api/group", (req, res) => {

    //tüm grupları listeler
    // group.find((err,doc)=>{
    //     res.json(doc);
    // })

    //name tersten sırala ve 2 tanesini getir
    group.find().limit(2).sort({ 'name': -1 }).exec((err, doc) => {
        res.json(doc);
    });


});

app.post("/api/group/delete",(req,res)=>{
    var id = req.body.id;

    group.findByIdAndDelete(id,(err,doc)=>{
        if(!err){
            res.send("Deleted!");
        }
    })
});


app.post("/api/group/update",(req,res)=>{
    var id = req.body.id;

    group.findById(id,(err,doc)=>{
        if(!err){

            doc.name = req.body.name;
            doc.description = req.body.description;

            doc.save();

            res.send("Updated!");
        }
    })
})










group.find({ "albums.name": "Clayman" }, (err, doc) => {
    // console.log(doc);
})

group.find().where('followers').gt(700000).lt(800000).exec((err, doc) => {
    //console.log(doc);
})

app.listen(1925);