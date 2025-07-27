const mongoose= require("mongoose");
const { listingSchema } = require("../schema");
const Review = require("./review"); 
const User = require("./user"); 

const Schema = mongoose.Schema;
const ListingSchema = new Schema({
    title :{
        type: String,
        required: true,
    },
    description: String,
    image:{ 
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    // contact:{
    //     type: String,
    //     required: true,
    // },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        enum: ['Trending', 'Rooms', 'Iconic cities', 'Mountain', 'Castles', 'Amazing Pools', 'Camping', 'Farms', 'Arctic', 'Domes'],
        required: true
    },

})

ListingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});

    }
})

const listing = mongoose.model("Listing", ListingSchema);
module.exports= listing;