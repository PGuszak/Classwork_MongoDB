const express = require("express"), app = express(),
homeController = require("./controllers/homeControllers"),
errorController = require("./controllers/errorController"),
layouts = require("express-ejs-layouts");



app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);


//default loader
app.get("/", homeController.showIndex);

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
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);  //for the same routes can be handled with different call back function
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServererror);




app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});