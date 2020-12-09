const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");

dotenv.config();

//connect to database
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
() => {console.log('database connected')}
);

//middleware
app.use(express.json())

app.use('/user', authRoute);



app.listen(8090, ()=>{console.log("server is running")})

