const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://azra_elturco:1996417B@cluster417-vl3kd.mongodb.net/test?authSource=admin&replicaSet=Cluster417-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
`, { useNewUrlParser: true });

const Schema = mongoose.Schema;

const filmSchema = new Schema({
    name:String,
    director:String,
    year:String,
    deleteddate:Date,
    inserteddate:{type:Date,default:Date.now()},
    updateddate:{type:Date,default:Date.now()},
    isdeleted:{type:Boolean,default:false}
});

const film = mongoose.model("film",filmSchema);

module.exports={
    film
}

//AdminUser isimli bir schema olustur. EMail, Password, AddDate, Isdeleted (adddate ve isdeleted default değerler)

//AdminUser isimli schemanın insert postunu yaz ve postmandan test et

//AdminUser isimli schemanın listelemesini yap(isdeleted false olanlar gelecek)

