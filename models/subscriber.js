const mongoose = require('mongoose'),
subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
});

//make a model and tie it to the schema above
module.exports = mongoose.model("Subscriber", subscriberSchema);
