const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("YOUR_MONGO_URL", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(console.log('connected to mongoose'))
//signup schema
const signSchema = {
    Name: String,
    Email: String, 
    Password: String
}
const static_path = path.join(__dirname, "/public");
app.use(express.static(static_path));
const data = mongoose.model("data", signSchema);
app.get("/", function(req, res) {
    res.send("hello") 
 })
 app.post("/", function(req, res){
    let newData = new data({
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password
    })
    newData.save();
    res.sendFile(__dirname + "/public/done.html")
 })
app.listen(3000, function() {
    console.log("Server is running on 3000")
})