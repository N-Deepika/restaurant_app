const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
let reviews

class ReviewDB  {
 static async injectDB(conn){
     if(reviews) return
     try{
        reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
     } catch(err){
         console.error(`Unable to establish a collection handle in userDB: ${err}`)

     }
 }

 static async addReview( restaurantID , name , user_id, review , date ){
     try {
         const reviewDoc = {
             name: name,
             user_id : user_id,
             date : date,
             text: review,
             restaurant_id: ObjectId(restaurantID)
         }
         
         return await reviews.insertOne(reviewDoc)

     } catch(err){
         console.error(`Unable to add review, ${err}`)
          return { error: err.message }
     }
 }

 static async updateReview(reviewId , userId , text , date){
     try{
       const updateResponse = await reviews.updateOne(
           
        { user_id : userId,
            _id: ObjectId(reviewId)},
          {$set: {text:text, date:date}}
      
  )
}catch(e){
  console.error(`Unable to update review, ${e}`)
    return { error: e.message }
}
 }
 static async deleteReview(reviewId , userId){
    try{
        const deleteResponse = await reviews.deleteOne(
            
         { user_id : userId,
             _id: ObjectId(reviewId)},
           
       
   )
   return deleteResponse
 }catch(e){
   console.error(`Unable to delete review, ${e}`)
     return { error: e.message }
 }
}

}

module.exports = ReviewDB
