"use strict"

const mongoose = require('mongoose'),
passportLogicalMongoose = require("passport-local-mongoose"),

{ Schema } = require('mongoose'),
Subscriber = require("./subscriber"),
Course = require("../models/course"),
userSchema = new Schema(
    {
        name:{
            first:{
                type: String,
                required: true
            },
            last:{
                type: String,
                required: true
            }
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        zipCode:{
            type: Number,
            min: [10000, "Zip code too short"],
            max: [99999]
        },
        courses: [
            {
                type: Schema.Types.ObjectId, 
                ref: "Course"
            }
        ],
        subscribedAccount: {
            type: Schema.Types.ObjectId,
            ref: "Subscriber"
        }
    },
    {
        timestamps: true
    }
)

//hook
userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});

//if emails are same use prehooks to link useing emails
userSchema.pre("save", function (next) {
    let user = this;
    if(user.subscribedAccount === undefined) {
        Subscriber.findOne({
            email: user.email
        })
        .then(subscriber => {
            user.subscribedAccount = subscriber;
            next();
        })
        .catch(error => {
            console.log(`error in associatin subscrinber: ${error.message}`);
            next(error);
        })
    }
    else{
        next();
    }
});


//local plugin
userSchema.plugin(passportLogicalMongoose, {
    usernameField: "email"
});


module.exports = mongoose.model("User", userSchema);
                                //name , schema used