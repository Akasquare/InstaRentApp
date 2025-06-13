const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");

const Review = require("../models/review.js");
const Listing= require("../models/listings.js");
const session = require("express-session");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewControllers = require("../controllers/review.js")

//review post route
router.post("/",
    isLoggedIn,
    validateReview ,
    wrapAsync(reviewControllers.createReview ));


// delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewControllers.destroyReview));

module.exports = router;