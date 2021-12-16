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
function add(name,order, callback){
    const newTopping = new toppingModel({
        name,
        order
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
function find(order, callback){
    toppingModel.findOne({order:order}, (error, result)=>{
        if(error){
            console.log('find error');
            callback([]);
        }else{
            callback(result);
            
        }
    });
}

function update(order, amount, callback){
    toppingModel.updateOne({order:order}, {amount : amount}, (error)=>{
        if(error){
            console.log('update error');
        }else{
            callback();
        }
    });
}


module.exports = {
    getAll,
    add,
    remove,
    check,
    find,
    update
};