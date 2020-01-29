const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        console.log('req.user:: ' + req.user);
        Favorites.find({ "author": req.user })
            .populate('favorites.dishes')
            .then((dishes) => {
                res.statusCode = 200;
                console.log("Helloooo")
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        console.log('inside post "/"');
        console.log("req.user:: " + req.user);
        console.log("req.body" + req.body);

        Favorites.findOne({ author: req.user.id })
            .then((favorite) => {
                console.log(favorite, 'jererere')
                if (favorite) {
                    console.log("made i..." + req.body.length);
                    for (var i = 0; i < req.body.lenth; i++) {
                        if (favorite.dishes.indexOf(req.body[i]._id) === -1) {
                            console.log(favorite.dishes.indexOf(req.body[i]._id), "ararararar")
                            favorite.dishes.push(req.body[i]._id);
                        }
                    }
                    favorite.save()
                        .then((favorite) => {
                            console.log("Favorite created ", favorite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err))
                }
                else {
                    Favorites.create({ "user": req.user._id, "dishes": req.body })
                        .then((favorite) => {
                            console.log('Favorite Created ' + favorite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite)
                        }, (err) => next(err))
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })




    // req.body.author = req.user._id;
    // //{ 'author': req.user._id, 'dishes': req.body }
    // Favorites.create(req.body)
    //     .then((favorite) => {
    //         console.log('Favorite Created ', favorite);
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', 'application/json');
    //         res.json(favorite);
    //     }, (err) => next(err))
    //     .catch((err) => next(err));

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

favoriteRouter.route('/:dishId')
    .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ author: req.user.id })
            .then((favorite) => {
                console.log(favorite, 'jererere')
                if (favorite) {
                    console.log("made i..." + req.body.length);
                    for (var i = 0; i < req.body.lenth; i++) {
                        if (favorite.dishes.indexOf(req.body[i]._id) === -1) {
                            console.log(favorite.dishes.indexOf(req.body[i]._id), "ararararar")
                            favorite.dishes.push(req.body[i]._id);
                        }
                    }
                    favorite.save()
                        .then((favorite) => {
                            console.log("Favorite created ", favorite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err))
                }
                else {
                    Favorites.create({ "user": req.user._id, "dishes": req.body })
                        .then((favorite) => {
                            console.log('Favorite Created ' + favorite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite)
                        }, (err) => next(err))
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        //     Favorites.findById(req.user._id)
        //         .then((favorite) => {
        //             if (favorite.dishes.)
        //     })
        //         .then((dish) => {
        //             dish.
        //     })

        //     Favorites.findById(req.params.dishId)
        //         .then((favorite) => {
        //             if (favorite != null && dish.comments.id(req.params.commentId) != null) {
        //                 if (req.user.id.equals(dish.comments.commentId.author.id)) {
        //                     dish.comments.id(req.params.commentId).remove();
        //                     dish.save()
        //                         .then((dish) => {
        //                             res.statusCode = 200;
        //                             res.setHeader('Content-Type', 'application/json');
        //                             res.json(dish);
        //                         }, (err) => next(err));
        //                 }
        //                 else {
        //                     err = new Error("You're not authorized to delete the comment.");
        //                     err.status = 403;
        //                     return next(err);
        //                 }
        //             }
        //             else if (dish == null) {
        //                 err = new Error('Dish ' + req.params.dishId + ' not found');
        //                 err.status = 404;
        //                 return next(err);
        //             }
        //             else {
        //                 err = new Error('Comment ' + req.params.commentId + ' not found');
        //                 err.status = 404;
        //                 return next(err);
        //             }
        //         }, (err) => next(err))
        //         .catch((err) => next(err));

    })

module.exports = favoriteRouter;