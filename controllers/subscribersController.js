//first bring in sibscruiber model
const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
    .exec()
    .then(subscribers => {
        res.render("subscribers", {subscribers: subscribers})
    })
    .catch((error) => {
        console.log(error);
        return[];
    })
    .then(() => {
        console.log("promise complete");
    })
};

exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({  //using the model schema for Subscriber if not entering make sure to spell the feilds correctly.
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });
    newSubscriber.save()
    .then(() => {
        res.render("thanks")
    })
    .catch((error) => { res.send(error)});
}