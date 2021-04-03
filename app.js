const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

//Connect DataBase
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true},
    ()=> console.log('Connected...')
);


// Routes ..
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const HomeRoutes = require('./routes/home');

//Middlewares
app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/admin', adminRoute);
app.use('/', HomeRoutes);



// Server initialize
app.listen(3000, () => console.log('Server is runing on port 3000...'));
