const mongodb = require('mongodb')
const ReviewDB = require('./../models/reviewDB')

class ReviewController {

    static async apiPostReview(req, res, next) {
     try{
         const restaurantId = req.body.restaurant_id
         const review = req.body.text
         const name= req.body.name
         const user_id = req.body.user_id
         console.log(req.body)
         console.log(restaurantId)
         const date = new Date()
         const ReviewResponse = await ReviewDB.addReview(restaurantId,name,user_id,review,date)
         res.json({ status: "success"}) 
         next()
         
    }catch(e){
        res.status(500).json({ error: e.message })
     }
    }

    static async apiUpdateReview(req,res,next){
        try{

            const reviewId= req.body.review_id
            const text = req.body.text
            const date = new Date()
            const userId = req.body.user_id

            const reviewResponse = await ReviewDB.updateReview( reviewId,userId,text,date)

            var { error } = reviewResponse
            if(error){
                res.status(400).json({ error: error })

            }
            if(reviewResponse.modifiedCount === 0){
                throw new Error("Unable to update review - user may not be original reviewe poster")

            }
            res.json({ status: "success"})
            next()

        } catch(err){
          res.status(500).json({ error: err.message })
        }
    }

    static async apideleteReview(req,res,next){

        try{
            const userId = req.body.user_id
            const reviewId = req.query._id

            console.log(reviewId)
            const reviewResponse = await ReviewDB.deleteReview(reviewId, userId)
            res.json( { status: "success",
         message: "Review deleted"})
        next()
        } 
        catch(err){
            res.status(500).json({error: err.message })
        }
    }

}

module.exports = ReviewController