require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require('cors')
const routeBlog  = require('./routes/blog.route')
const routeUser = require('./routes/user.route')
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//mongoose
// mongoose.connect('mongodb://localhost/bepmina')
mongoose.connect(process.env.MONGODB_URL)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/api/blog',routeBlog)
app.use('/api/user',routeUser)
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
