const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/contex",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })  
    .then(() => console.log('DB connection successful: ', "mongodb://localhost:27017/contex"))
    .catch((err) => console.error(err));

mongoose.connection.on('connected', function () {
    console.log('Front Mongoose default connection open');
});

mongoose.connection.on('error', function (err) {
    console.log('Front Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Front Mongoose default connection disconnected');
});


