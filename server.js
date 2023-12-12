const express = require('express');
const dbConnect = require('./config/dbConnect')
const app = express();
const error = require('./middlewares/errorMiddlewareHandler')
const dotenv = require('dotenv');
const usersRoute = require('./routes/usersRoute');
const booksRoute = require('./routes/booksRoute');

//dbConnect
dotenv.config();
dbConnect();
//Routers
app.use(express.json());
//Users
app.use('/api/users', usersRoute);
//Routers
app.use('/api/books', booksRoute);
//Error Middleware
app.use(error.errorMiddlewareHandler);

//routes
 //users routes


//server
PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
})