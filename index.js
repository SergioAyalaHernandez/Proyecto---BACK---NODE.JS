const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const user_routes = require("./routes/usuario");
const gama_routes = require("./routes/Gama");
const reservation_routes = require("./routes/Reservation");
const message_routes = require("./routes/Message");
const car_routes = require("./routes/Car");
//const port = process.env.PORT ||443;
const port = 443;-
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


//mongoose.connect("mongodb://mongo:Niv0xPCKhinvXoL9t95O@containers-us-west-118.railway.app:6167",{//conexión de mongo desplegada
    mongoose.connect("mongodb://localhost:27017/grupo12",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})
.then(() => {
    app.use(express.json())
    app.use("/api/usuario",user_routes);
    app.use("/api/car",car_routes);
    app.use("/api/reservation",reservation_routes);
    app.listen(port, () =>{
        console.log("Init in the ", port);
    });
})
.catch(err => console.log(err));





