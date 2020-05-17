const express = require('express');
const app = express();

app.get("/", function (req, res) {
    res.send("Hello Express!!");
});

app.get("/contact", function (req, res) {
    res.send("Contact Page");
});

app.get("/notfound", function (req, res) {
    res.status(404).send("Page not found!!");
})

var kisi = {
    "ad": "Çağatay",
    "soyad": "Yıldız",
    "sehir": "İzmir"
};

app.get("/user", function (req, res) {
    res.json(kisi);
});


app.get("/products/:id", function (req, res) {
    var id = req.params.id;
    res.send("Product detail page. ID " + id);
});

var metalgroups = [
    { "id": 1, "name": "Slipnot" },
    { "id": 2, "name": "Pentagram" },
    { "id": 3, "name": "Iron Maiden" },
    { "id": 4, "name": "In Flames" },
];
//yukarıdaki gibi bir json obje tanımla. sonra bu objeyi paslayacak bir api oluştur. (aşağıdaki gibi. daha sonra id ye göre elemanı döndürecek apiyi yaz
app.get("/groups", function (req, res) {
    res.json(metalgroups);
});
app.get("/groups/:id", function (req, res) {
    var groupid = req.params.id;
    var data = metalgroups.find(q => q.id == groupid);
    if (data == undefined) {
        res.status(404).send("Sayfa bulunamadı!");
    }
    else {
        res.json(data);
    }
});


var ressamlar = [
        {"id":1,"name":"Picasso"},
        {"id":2,"name":"Van Gogh"},
        {"id":3,"name":"Gaugin"},
        {"id":4,"name":"Osman Hamdi Bey"},
];

app.get("/painters",function(req,res){
    res.json(ressamlar);
})

app.get("/painters/:id",function(req,res){
    var id = req.params.id;

    var ressam = ressamlar.find(q => q.id == id);
    res.json(ressam);
})







app.listen(3000);