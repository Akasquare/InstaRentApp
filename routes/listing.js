const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema }= require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing= require("../models/listings.js");


const validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
        
    if( error){
        let errMsg = error.details.map((el)=>el.message).join(",");

        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}
//index route
router.get("/",wrapAsync(async (req, res)=>{
    const AllListing = await Listing.find({});
    res.render("listings/index.ejs",{AllListing});
    
}))
// New Route
router.get("/new", (req, res)=>{
    res.render("listings/new.ejs");
})
//show route
router.get("/:id", wrapAsync(async (req, res)=>{
    let {id}= req.params;
   const listing= await Listing.findById(id).populate("reviews");
   if(!listing){
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings")
   }
   res.render("listings/show.ejs", {listing})
}))


//create route
router.post("/", validateListing ,
     wrapAsync( async (req, res, next)=>{ 
     // let {title, description , image, price ,country, location}= req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    // console.log(req.body.listing)
    req.flash("success", "New Listing Created")
    res.redirect("/listings");

}))
//Edit route
router.get("/:id/edit",wrapAsync( async (req, res)=>{
    let {id}= req.params;
    const listing= await Listing.findById(id);
    if(!listing){
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings")
   }
    res.render("listings/edit.ejs", {listing});
}))
//update route
router.put("/:id", validateListing, wrapAsync(async (req, res)=>{
     let {id}= req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated")

    res.redirect(`/listings/${id}`)
}))
//DELETE route
router.delete("/:id", wrapAsync(async (req, res)=>{
    let {id}= req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    req.flash("success", "Listing deleted")
    res.redirect("/listings");
}))

module.exports = router;