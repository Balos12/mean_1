const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://BALOS:123456ss@balos.cpoot2s.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to Database...');
    }).catch((err) => {
        console.error('Error connecting to Database: ', err.message);
    })


module.exports = { mongoose }  
