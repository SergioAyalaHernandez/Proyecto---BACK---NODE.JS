const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user_routes = require("./routes/usuario");
const gama_routes = require("./routes/Gama");
const port = 3000;
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({extended:false}));


mongoose.connect("mongodb://localhost:27017/grupo11",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})
.then(() => {
    app.use("/api",user_routes);
    app.listen(port, () =>{
        console.log("Init in the ", port);
    });
})
.catch(err => console.log(err));


