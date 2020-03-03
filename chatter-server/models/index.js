const mongoose = require('mongoose');
mongoose.set("debug",true);
mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/warbler",{
//     useMongoClient: false,
//     promiseLibrary: global.Promise  === true,
//     keepAlive: true,
//     useNewUrlParser: true

// })
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/warbler",{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.User = require("./user");
module.exports.Message = require("./message");
