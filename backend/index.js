const connectTomongo = require('./db');
const express = require('express')
var cors = require('cors')
// const user = require('./models/User')

connectTomongo();

const app = express()
const port = 4000

app.use(express.json());
app.use(cors())

app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes'))

// app.post ('/user',(req,res)=>{
//   console.log(req.body)
//   user.create(req.body)
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
