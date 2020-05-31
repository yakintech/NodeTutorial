const request = require('request');
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://azra_elturco:1996417B@cluster417-vl3kd.mongodb.net/test?authSource=admin&replicaSet=Cluster417-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
`, { useNewUrlParser: true });

const Schema = mongoose.Schema;

const productSchema = new Schema({
    p: Object
});

const product = mongoose.model("product", productSchema);


request.get("https://northwind.now.sh/api/products", (err, res, body) => {

    var data = JSON.parse(body);

    
    for (i = 0; i < data.length; i++) {

        var pr = new product({
            p:data[i]
        });

        pr.save((err,doc)=>{
            console.log(err);
        });

    }

})