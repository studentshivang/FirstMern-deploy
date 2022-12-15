const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

// const User = require('./model/userSchema');

dotenv.config({ path: "./config.env" }); //Write it on app.js and use process.env anywhere!

require("./db/conn"); //To establish connection of the application with atlas

const PORT = process.env.PORT || 5000;

//To convert any data received by our express app in json form ,into object so that it can be displayed
app.use(express.json()); //our application does not understand json directly , so it has to be stringified

//To link the router files to make our app.js brief
app.use(require("./router/auth")); // This middleware will not allow the request to go beyond it

// app.get('/contact',(req,res)=>{
//     res.send(`Hello world from the Contact page!`);
// });

app.get("/signin", (req, res) => {
  res.send(`Hello world from the Login page!`);
});

app.get("/signup", (req, res) => {
  res.send(`Hello world from the Registration page!`);
});

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
// }

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,'client','build','index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`The server is running at port number ${PORT}`);
});
