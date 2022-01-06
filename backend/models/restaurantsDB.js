const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
let restaurants

const RestaurantsDB =  {
 async injectDB(conn){
     if(restaurants) return
     try{
         restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
     } catch(err){
         console.error(`Unable to establish a collection handle in restaurantDB: ${err}`)

     }
 }
}

 async function getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20
}={}){
let query 
if(filters){
    if("name" in filters){
        query = { $text : { $search : filters["name"] } }
    } else if("cuisine" in filters){
        query = { "cuisine" : { $eq : filters["cuisine"] } }
    }
    else if("zipcode" in filters){
        query = { "address.zipcode" : { $eq : filters["zipcode"] } }
    }
}


let queryCursor
    
    try {
      queryCursor = await restaurants
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }

    const displayCursor = queryCursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

    try {
      const restaurantsList = await displayCursor.toArray()
      const totalNumRestaurants = await restaurants.countDocuments(query)

      return { restaurantsList, totalNumRestaurants }
    } catch (e) {
      console.error(
        `Unable to convert queryCursor to array or problem counting documents, ${e}`,
      )
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }
}

module.exports = RestaurantsDB