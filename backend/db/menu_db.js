const menuModel = require('../models/menu_model.js');

// get all menu items
function getAll(callback){
    menuModel.find({},(error, result)=>{
        if(error){
            console.log(error);
            callback([]);
        }else{
            callback(result);
        }
    });
}

// add new menu item
function add(name, data, callback){
    const newMenu = new menuModel({
        name,
        data
    });
    newMenu.save((error, result)=>{
        callback(result);
    });
}

// remove menu item
function remove(name, callback){
    menuModel.deleteOne({name:name},(error)=>{
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
    menuModel.findOne({name:name}, (error, result)=>{
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