const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Dishes = require('./models/dishes');

// const favDishSchema = new Schema({
//     dishes: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Dishes',
//         required: true
//     }
// }, {
//     usePushEach: true,
//     timestamps: true
// })

// const favoriteSchema = new Schema({
//     author: {
//         //type: String,
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     dishes: [favDishSchema]
// }, {
//     usePushEach: true,
//     timestamps: true
// })

//OR...

const favoriteSchema = new Schema({
    user: {
        //type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    }]
})



var Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;