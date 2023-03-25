const express = require('express')
const app = express()
const userRouter = require('./api/users/router')
require('dotenv').config();


app.use(express.json())  //middleware for reading json

app.use('/api/users', userRouter);


app.listen(8080, () => {
    console.log('Server working at port 8080')
}) 