const mongoose = require('mongoose')

mongoose.Promise = global.Promise
// connects mongod so that the database will run
mongoose.connect('mongodb://localhost/quiz', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
// messages telling the user if the mongoose database is connected or not
mongoose.connection.on("open", function(err){
    if(err){
        console.log("Error:", err)
    }else{
        console.log('Mongoose Database Connected')
    }
})