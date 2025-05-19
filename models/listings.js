const mongoose= require("mongoose");
const { listingSchema } = require("../schema");
const Review = require("./review"); 

const Schema = mongoose.Schema;
const ListingSchema = new Schema({
    title :{
        type: String,
        required: true,
    },
    description: String,
    image:{ 
        type: String,
        default: "https://media.istockphoto.com/id/1348022335/photo/la-defense-financial-district-in-paris.jpg?s=1024x1024&w=is&k=20&c=IxCXX5iSZh3hoh-em-TtENeVQERPjQsgRUpB5h_6sOU=",
        set: (v)=>v==="" ? "https://media.istockphoto.com/id/1348022335/photo/la-defense-financial-district-in-paris.jpg?s=1024x1024&w=is&k=20&c=IxCXX5iSZh3hoh-em-TtENeVQERPjQsgRUpB5h_6sOU=" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

ListingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});

    }
})

const listing = mongoose.model("Listing", ListingSchema);
module.exports= listing;