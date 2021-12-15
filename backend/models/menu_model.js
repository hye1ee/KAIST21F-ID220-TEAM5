const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name : String,
        data : { type : Array, default : [1,1,1,1,1,1,8]},
        order : { type : Number, default : 0 }
    },{timestamps : true}
);

const menuModel = mongoose.model('menu', schema);

module.exports = menuModel;