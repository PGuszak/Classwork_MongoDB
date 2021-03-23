const express = require("express"), app = express(),
homeController = require("./controllers/homeControllers"),
errorController = require("./controllers/errorController"),
subscribersContoller = require("./controllers/subscribersController"),
layouts = require("express-ejs-layouts"),
 mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {useNewUrlParser: true});
//creates this if not already created before

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);


//default loader (made change to home not default or clicking the header button would not bring to home)
app.get("/", homeController.showHome);
 
//pre processing requests
app.use(express.static("public"));  //can serve static content to users
app.use(
    express.urlencoded({ 
        extended: false,
    })
);




//routes
app.use(express.json());

app.get("/courses", homeController.showCourses);
app.get("/subscribers", subscribersContoller.getAllSubscribers);
app.get("/contact", subscribersContoller.getSubscriptionPage);
app.post("/subscribers", subscribersContoller.saveSubscriber);


//app.get("/contact", homeController.showSignUp);
//app.post("/contact", homeController.postedSignUpForm);  //for the same routes can be handled with different call back function


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServererror);




app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});