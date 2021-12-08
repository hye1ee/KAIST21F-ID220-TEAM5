const toppingModel = require('../models/topping_model.js');

// get all menu items
function getAll(callback){
    toppingModel.find({},(error, result)=>{
        if(error){
            console.log(error);
            callback([]);
        }else{
            callback(result);
        }
    });
}

// add new menu item
function add(name, callback){
    const newTopping = new toppingModel({
        name
    });
    newTopping.save((error, result)=>{
        callback(result);
    });
}

// remove menu item
function remove(name, callback){
    toppingModel.deleteOne({name:name},(error)=>{
        if(error){
            console.log('delete error');
        }else{
            callback();
        }
    });
}

// check menu name duplication
// if there is no corresponding data result will be null
function check(name, callback){
    toppingModel.findOne({name:name}, (error, result)=>{
        if(error){
            console.log('find error');
            callback([]);
        }else{
            callback(result);
        }
    });
}

module.exports = {
    getAll,
    add,
    remove,
    check
};