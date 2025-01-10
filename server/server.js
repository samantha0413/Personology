require("./database/database")
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const PORT = 4000
const app = express()
// middleware for express and bodyparser to run
app.use(bodyParser.urlencoded({limit:"50mb",extended:true, parameterLimit:50000}))
app.use(bodyParser.json({limit:"50mb",extended:true}))
app.use(bodyParser.text({limit:"200mb"}))
app.use(cors())
app.use(bodyParser.json())
// calling all the routes to my server page
app.use("/api", routes)
// server listening on PORT 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// exporting app off this page for test suites
module.exports = app