const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing= require("../models/listings.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer({storage})

router
    .route("/")
//index route
    .get(wrapAsync(listingController.index))
//create route
    .post(isLoggedIn ,upload.single("listing[image]"), validateListing ,wrapAsync(listingController.createListing )) 

// New Route
router.get("/new",isLoggedIn , listingController.renderNewForm)


//Edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing))
//update route
router
    .route("/:id")
    .put(
    isLoggedIn ,
    isOwner,
    upload.single("listing[image]"),
    validateListing, wrapAsync(listingController.updateListing))
    //DELETE route
    .delete(  
    isLoggedIn ,
    isOwner,
    wrapAsync(listingController.deleteListing))
    //show route
    .get( wrapAsync(listingController.showListing))

 

module.exports = router;