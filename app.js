const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing= require("./models/listings.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override")
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema }= require("./schema.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));


app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/wandurlust";
main()
    .then(()=>{
    console.log("connected to DB")
}).catch(err=>console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL) ;
}

app.get("/", (req, res)=>{
    res.send("HI, i am root");
})

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
app.get("/listings",wrapAsync(async (req, res)=>{
    const AllListing = await Listing.find({});
    res.render("listings/index.ejs",{AllListing});
    
}))
// New Route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
})
//show route
app.get("/listings/:id", wrapAsync(async (req, res)=>{
    let {id}= req.params;
   const listing= await Listing.findById(id);
   res.render("listings/show.ejs", {listing})
}))

//create route
app.post("/listings", validateListing ,
     wrapAsync( async (req, res, next)=>{
        

    // let {title, description , image, price ,country, location}= req.body;
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

}))
//Edit route
app.get("/listings/:id/edit",wrapAsync( async (req, res)=>{
    let {id}= req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}))
//update route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res)=>{
     let {id}= req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`)
}))
//DELETE route
app.delete("/listings/:id", wrapAsync(async (req, res)=>{
    let {id}= req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    res.redirect("/listings");
}))

// app.get("/testListing", async (req, res)=>{
//     let samplelisting = new Listing({
//         title: "My new villa",
//         description: " by the beach",
//         price: 1200,
//         location: "calanute, goa",
//         country: "India",

//     });
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// })

app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page Not Found"))

})

app.use((err, req, res, next )=>{
    let {statusCode=500 , message = "Something went wrong"}= err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("Error.ejs", {err});
})

app.listen(8080, ()=>{
    console.log("server is listening to ports 8080");
});