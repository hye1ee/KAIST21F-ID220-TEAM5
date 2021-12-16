const express = require('express');
const menu = require('./db/menu_db.js');
const topping = require('./db/topping_db.js');
const yogurtRouter = express.Router();


// get all items
yogurtRouter.get('/menu', (req,res)=>{
    console.log('succes get all menu');
    menu.getAll((items)=>{
        res.json(items);
    });
});
yogurtRouter.get('/topping', (req,res)=>{
    console.log('succes get all toppings');
    topping.getAll((items)=>{
        res.json(items);
    });
});

// add new item
yogurtRouter.post('/menu', (req,res)=>{
    console.log('success post menu');
    const {name, data} = req.body;
    menu.add(name, data, (newitem)=>{
        res.json(newitem);
    });
});
yogurtRouter.post('/topping', (req,res)=>{
    console.log('success post topping');
    const {name, order} = req.body;
    topping.add(name, order, (newitem)=>{
        res.json(newitem);
    });
});

// delete a item
yogurtRouter.delete('/menu', (req,res)=>{
    console.log('success delete menu');
    menu.remove(req.body.name, ()=>{
        res.status(200).send();
    });
});
yogurtRouter.delete('/topping', (req,res)=>{
    console.log('success delete topping');
    topping.remove(req.body.name, ()=>{
        res.status(200).send();
    });
});

// check item name duplication
yogurtRouter.get('/menu/:name',(req,res)=>{
    console.log('success check menu');
    menu.check(req.params.name, (result)=>{
        if(result===null){
            res.status(200).send(false);
        }else{ // there is already same name
            res.json(result);
        }
    });
})
yogurtRouter.get('/topping/:order',(req,res)=>{
    console.log('success check topping');
    topping.find(req.params.order, (result)=>{
        res.json(result);
    });
})
yogurtRouter.get('/topping/update/:order/:amount',(req,res)=>{
    console.log('success update topping');
    topping.update(req.params.order,req.params.amount, ()=>{
        res.status(200).send();
    });
})

module.exports = yogurtRouter;