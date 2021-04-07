"use strict";

const User = require("../models/user");

module.exports = {
    index:(req,res,next) => {
        User.find()
        .then(users => {
            res.locals.users = users;
            next()
        })
        .catch(error => {
            console.log(`Error fetching user data: ${error.message}`);
            next(error);
        })
    },
    indexView: (req, res) => {
        res.render("users/index");
    },
    new: (req, res) => {
        res.render("users/new");
    },
    create: (req, res, next) => {
        let newUser = new User({
            name:{
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        });
        User.create(newUser)
        .then( user => {
            res.locals.user = user;
            res.locals.redirect = "/users";
            next();
        })
        .catch(error => {
            console.log(`Error saving user ${error.message}`)
            next(error)
        })
    },
    redirectView: (req, res, rext) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
        })
    },
    showView: (req, res) => {
        res.render("users/show");
    },
    edit: (req, res) => {
        let userId = req.params.id;
        User.findById(userId)
        .then(user =>{
            res.render("users/edit", {user: user});
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        })
    },
    update: (req, res, next) => {
        let userId = req.params.id;

     

        var updatedUser = {};
        

        updatedUser.name = {
            first: req.body.firstName,
            last: req.body.lastName
        };

        updatedUser.password = req.body.password;
        updatedUser.email = req.body.email;
        updatedUser.zipCode = req.body.zipCode;

        /*
        let updatedUser = new User({
            name:{
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        });
        */

        User.findByIdAndUpdate(userId, updatedUser)
        .then(user =>{
            res.locals.user = user;
            res.locals.redirect = `/users/${userId}`;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
        .then(() => {
            res.locals.redirect = "/users";
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        })
    }
}