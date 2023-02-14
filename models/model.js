const mongoose = require('mongoose');
const slugify= require('slugify')
const uuid = require('uuid');
const productSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true,"Product must have a Title"]  
    },
     price: {
        type:String,
        required:[true,"Product must have a price"],
    },
    description: {
        type:String,
        required:[true,"Product must have a short info"],
        maxLength:[200,"A product description must be less than 200 characters."]
    },
    ImageCover:{
        type:[String],
    },
    sku:String,
    slug:String,

})

productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true});
  next();
});

productSchema.pre('save', function(next) {
  this.sku = uuid.v4().substring(0,8);
  next();
});

const Product = mongoose.model('Product',productSchema);
module.exports= Product;
