const express = require("express");
const ExpressError = require("../expressError");
const Item = require('../item');

const router = new express.Router();

router.get('/', function(req, res, next) {
    try {
        // Get the shopping list of items
        let result = Item.findAll();
        return res.send(result);
    } catch(err) {
        return next(err);
    }
});

router.post('/', function(req, res, next) {
    try {
        if (!req.body.name || !req.body.price) {
            throw new ExpressError("Name and price not entered", 400);
        }
        let newItem = new Item(req.body.name, req.body.price);
        let result = { "added" : newItem }
        return res.status(201).send(result);
    } catch(err) {
        return next(err);
    }
})

router.get('/:name', function(req, res, next) {
    try {
        let item = Item.find(req.params.name);
        return res.send(item);
    } catch(err) {
        return next(err);
    }
})

router.patch('/:name', function(req, res, next) {
    try {
        let item = Item.update(req.params.name, req.body);
        let result = { "updated" : item };
        return res.send(result);
    } catch(err) {
        return next(err);
    }
})

router.delete('/:name', function(req, res, next) {
    try {
        Item.remove(req.params.name);
        let result = { "message" : "Deleted" }
        return res.send(result);
    } catch(err) {
        return next(err);
    }
})

module.exports = router;