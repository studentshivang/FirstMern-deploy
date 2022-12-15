const mongoose = require('mongoose');

const DB = process.env.DATABASE; // process.env can be used because of dotenv.config(); on app.js 

mongoose.connect(DB).then(()=> {
    console.log('Connection successful'); 
}).catch((err)=> console.log('no connection'));
