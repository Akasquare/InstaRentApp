const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing= require("./models/listings.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));
app.use(express.urlencoded({extended:true}))

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


//index route
app.get("/listings",async (req, res)=>{
    const AllListing = await Listing.find({});
    res.render("listings/index.ejs",{AllListing});
    
})
// New Route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
})
//show route
app.get("/listings/:id", async (req, res)=>{
    let {id}= req.params;
   const listing= await Listing.findById(id);
   res.render("listings/show.ejs", {listing})
})

app.post("/listings", async (req, res)=>{
    // let {title, description , image, price ,country, location}= req.body;
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})
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

app.listen(8080, ()=>{
    console.log("server is listening to ports 8080");
});