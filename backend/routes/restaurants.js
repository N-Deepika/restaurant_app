const express = require('express')
const restController = require('./../controllers/restController')
const reviewController = require('./../controllers/reviewController')

const router = express.Router()

router.route("/").get(restController.apiGetRestaurants)
router.route("/id/:id").get(restController.apiGetRestaurantsById)
router.route("/cuisines").get(restController.apiGetRestCuisines)

router.route("/review")
.post(reviewController.apiPostReview)
.put(reviewController.apiUpdateReview)
.delete(reviewController.apideleteReview)

module.exports = router