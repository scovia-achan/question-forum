const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");

dotenv.config();
const port = 8080;
//connect to database
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
() => {console.log('database connected')}
);

//middleware
app.use(express.json())
// app.use('/', (req,res)=>{res.send('Welcome to the questions forum')})

app.use('/user', authRoute);



app.listen(port, ()=>{console.log(`server is running on http://localhost:${port}`)})

