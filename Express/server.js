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

})



app.listen(3000);