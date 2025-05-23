const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override")
const ExpressError = require("./utils/ExpressError.js");
const reviews = require("./routes/review.js");
const listings = require("./routes/listing.js");
const session = require("express-session");
const flash = require("connect-flash");


const MONGO_URL = "mongodb://127.0.0.1:27017/wandurlust";

main()
    .then(()=>{
    console.log("connected to DB")
}).catch(err=>console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL) ;
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret : "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7* 24 * 60 *60 * 1000,
        maxAge :  7* 24 * 60 *60 * 1000,
        httpOnly: true,
    }
}
app.get("/", (req, res)=>{
    res.send("HI, i am root");
})

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res ,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    // console.log(res.locals.success)
    next();
})

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews)


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