const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://azra_elturco:1996417B@cluster417-vl3kd.mongodb.net/test?authSource=admin&replicaSet=Cluster417-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
`, { useNewUrlParser: true });

const Schema = mongoose.Schema;

const filmSchema = new Schema({
    name:String,
    director:String,
    year:String
});

const film = mongoose.model("film",filmSchema);

module.exports={
    film
}

