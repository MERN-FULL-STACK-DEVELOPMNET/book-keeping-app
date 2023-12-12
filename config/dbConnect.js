const mongoose = require('mongoose');
const dbConnect = () => {
    //connect DB 
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('DB Connected')
    })
    .catch((error) => {
        console.log('error')
    })
};
module.exports = dbConnect;