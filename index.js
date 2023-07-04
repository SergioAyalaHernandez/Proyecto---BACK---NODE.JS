const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const user_routes = require("./routes/usuario");
const gama_routes = require("./routes/Gama");
const reservation_routes = require("./routes/Reservation");
const message_routes = require("./routes/Message");
const car_routes = require("./routes/Car");
const port = process.env.PORT ||80;
//const port = process.env.PORT ||443;
const bodyParser = require("body-parser");
require('text-encoding').TextEncoder;

mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


const mongoURL = 'mongodb://mongo:27017/mydatabase';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error))
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





