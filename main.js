const express = require("express"),
app = express(),
router = express.Router(),
homeController = require("./controllers/homeControllers"),
errorController = require("./controllers/errorController"),
subscribersContoller = require("./controllers/subscribersController"),
coursesController = require("./controllers/coursesController"),
usersController = require("./controllers/usersController");
layouts = require("express-ejs-layouts"),
methodOverride = require("method-override"),
 mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {useNewUrlParser: true});
//creates this if not already created before

//SETS
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
router.use(
    express.urlencoded({ 
        extended: false,
    })
);

router.use(express.json());
//default loader (made change to home not default or clicking the header button would not bring to home)
//app.get("/", homeController.showHome);
 
//pre processing requests USES
router.use(express.static("public"));  //can serve static content to users
router.use(layouts);
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));
app.use("/", router);


router.get("/", homeController.index);
router.get("/contact", homeController.contact);
//something is wrong with the calls THAT HAVE TWO INPUTS

//routes for actions
router.get("/subscribers", subscribersContoller.index, subscribersContoller.indexView);
router.get("/subscribers/new", subscribersContoller.new);
router.post("/subscribers/create", subscribersContoller.create, subscribersContoller.redirectView)
router.get("/subscribers/:id", subscribersContoller.show, subscribersContoller.showView);
router.get("/subscribers/:id/edit", subscribersContoller.edit);
router.put("/subscribers/:id/update", subscribersContoller.update, subscribersContoller.redirectView);
router.delete("/subscribers/:id/delete", subscribersContoller.delete, subscribersContoller.redirectView);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView)
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView)
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServererror);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});