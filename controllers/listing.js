const Listing= require("../models/listings.js");

const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const API_TOKEN =  process.env.MAP_TOKEN;
 

module.exports.index = async (req, res)=>{
    const AllListing = await Listing.find({});
    res.render("listings/index.ejs",{AllListing});
    
}

module.exports.renderNewForm = (req, res)=>{
   
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res)=>{
    let {id}= req.params;
   const listing= await Listing.findById(id).populate({path: "reviews", populate:{path: "author"}}).populate("owner");
   if(!listing){
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings")
   }
   res.render("listings/show.ejs", {listing})
}


 

module.exports.createListing =  async (req, res, next)=>{ 
     
     
//   const { location } = req.body;
  
//   try {
//     const response = await client.geocode({
//       params: {
//         address: location,
//         key: API_TOKEN
//       }
//     });

//     if (!response.data.results.length) {
//       console.log(" No results found for location:", location);
//       return res.send("Invalid location");
//     }

//     const coordinates = response.data.results[0].geometry.location;
//     console.log(" Coordinates for", location, "=>", coordinates);

//     return res.send("Coordinates logged in console");

//   } catch (err) {
//     console.error(" Geocoding failed:", err.message);
//     return res.status(500).send("Error geocoding location");
//   }



    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    // console.log(req.body.listing)
    req.flash("success", "New Listing Created")
    res.redirect("/listings");

}

 

 

module.exports.editListing =  async (req, res)=>{
    let {id}= req.params;
    const listing= await Listing.findById(id);
    if(!listing){
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings")
   }
   let originalImageUrl = listing.image.url;
   originalImageUrl =originalImageUrl.replace("/upload", "/upload/h_250,w_300")
    res.render("listings/edit.ejs", {listing, originalImageUrl});
}
module.exports.updateListing = async (req, res)=>{
     let {id}= req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    req.flash("success", "Listing Updated")

    res.redirect(`/listings/${id}`)
}
module.exports.deleteListing = async (req, res)=>{
    let {id}= req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing)
    req.flash("success", "Listing deleted")
    res.redirect("/listings");
}
 