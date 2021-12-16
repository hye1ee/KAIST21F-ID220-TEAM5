const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name : String,
        order : String,
        amount : { type : Number, default : 10},
    },{timestamps : true}
);

const toppingModel = mongoose.model('topping', schema);

module.exports = toppingModel;