const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
let reviews

const ReviewDB =  {
 async injectDB(conn){
     if(reviews) return
     try{
        reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
     } catch(err){
         console.error(`Unable to establish a collection handle in userDB: ${err}`)

     }
 }
}



module.exports = ReviewDB