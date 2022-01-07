const express = require('express')
const mongodb = require('mongodb')
const cors  = require('cors')
const restaurants = require('./routes/restaurants')
const RestaurantsDB = require('./models/restaurantsDB')
const ReviewDB = require('./models/reviewDB')


require('dotenv').config()
const app = express()

const MongoClient = mongodb.MongoClient

app.use(cors())
app.use(express.json())


app.use("/api/v1/restaurants", restaurants)

app.use("*",(req,res)=>{
    res.status(404).json({
        message: "Not found"
    })
})

MongoClient.connect(
    process.env.DB_CONNECTION_URI,{
       maxPoolSize: 50,
       wtimeoutMS: 2500,
        useNewUrlParser: true,
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await RestaurantsDB.injectDB(client)
    await ReviewDB.injectDB(client)
    app.listen(process.env.PORT || 5000)
    
})
