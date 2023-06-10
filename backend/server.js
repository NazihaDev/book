const express = require('express');
const cors = require ("cors");
const dotenv = require('dotenv');
//const error = require('../middlewares/errorMiddlewareHandler');
const mongoose = require('mongoose');
const usersRoute = require('./routes/usersRoute');
const bookRouter = require('./routes/bookRoutes');
const User = require('./models/User');
const book = require ('./models/Book');
dotenv.config();
//dotenv.config({path:"./config.env"});
//require('dotenv').config();
const dbConnect = require('./config/dbConnect');

const app = express();

// connect DB
dbConnect();


/*const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:5000']
}*/







//Passing body data
app.use(express.json());
app.use(cors());

//naziha
//app.use(bodyParser.json());
//app.use(expressValidator());

//Routes
//Users
app.use("/api/users", usersRoute);
//Book
app.use("/api/books", bookRouter);

//console.log(process.env.MY_NAME);
//Error middleware
//app.use(error.errorMiddlewareHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is up and runing ${PORT}`);
});

//user:naziha1aloui
//  pass:Mv37HO7qS4qRyGep
//mongodb+srv://naziha1aloui:ihu1h7kfAATyhh6N@cluster0.fbc61en.mongodb.net/mern-book
//Partie dotenv
////JWT_SECRET_KEY ="nodejs"
////MONGODB_URL =mongodb+srv://naziha1aloui:ihu1h7kfAATyhh6N@cluster0.fbc61en.mongodb.net/mern-book
