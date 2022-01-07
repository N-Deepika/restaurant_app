const RestaurantsDB = require('./../models/restaurantsDB')

const restController = {
    async apiGetRestaurants(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage,10) : 20
        const page = req.query.page ? parseInt(req.query.page,10) : 0

        const filters = {}

        if(req.query.name){
            filters.name = req.query.name
        } else if (req.query.cuisine){
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode){
            filters.zipcode = req.query.zipcode
        }

        const { restaurantsList , totalNumRestaurants } = await RestaurantsDB.getRestaurants({
            filters,
            page,
            restaurantsPerPage
        })

        const response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entriesPerPage: restaurantsPerPage,
            totalResult: totalNumRestaurants,
        }
        res.json(response)

},

 async apiGetRestaurantsById(req, res , next ){
     try{

        const id = req.params.id || {}
        const restaurant = await RestaurantsDB.getRestaurantById(id)
        if(!restaurant){
            res.status(404).json({
                error : "Not Found"
                
            })
            return
        }
        res.json(restaurant)
        next()

     }catch(err){
         console.log(`api, ${err}`)
         res.status(500).json({ error : e})   
  }

},

async apiGetRestCuisines(req, res, next){
 try{
     const cuisine = await RestaurantsDB.getCuisines()
     res.json(cuisine)

 }catch(err){
    console.log(`api, ${err}`)
    res.status(500).json({ error : e})  


}
}
}

module.exports = restController