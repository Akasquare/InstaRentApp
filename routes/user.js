const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Listing = require('../models/listings.js');
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js")

//signup
router
    .route("/signup")
    .get( userController.renderSignupForm )
    .post( wrapAsync( userController.signup));

//login
router
    .route("/login")
    .get( userController.renderLoginForm)
    .post(  saveRedirectUrl,
    passport.authenticate("local", {failureRedirect:"/login", failureFlash:true,
    }),  userController.login,)
//user logout

router.get("/logout",userController.logout)

router.get('/dashboard', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const userListings = await Listing.find({ owner: req.user._id });

  res.render('users/dashboard', {
    user: req.user,
    listings: userListings
  });
});

router.post('/dashboard/contact', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const { contact } = req.body;

  try {
    await User.findByIdAndUpdate(req.user._id, { contact });
    req.flash("success", "Contact updated successfully!");
    res.redirect('/dashboard');
  } catch (e) {
    console.log(e);
    res.send("Error updating contact");
  }
});
module.exports = router;