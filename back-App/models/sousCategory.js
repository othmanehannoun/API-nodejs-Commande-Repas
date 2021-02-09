const mongoose = require('mongoose');

const sousCategorySchema = new mongoose.Schema({
    sousCatName :{
        type : String,
        required : true
    },
    categoryParent:{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'category'
    }
})

const SCategory = mongoose.model('SCategory',sousCategorySchema);

module.exports = SCategory