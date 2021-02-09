const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName :{
        type : String,
        required : true
    },
    Price :{
        type : Number,
        required : true
    },
    subCat:{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'sousCategory'
    }
})

const Food = mongoose.model('Food',foodSchema);

module.exports = Food
