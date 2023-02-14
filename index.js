var express = require('express')
var multer  = require('multer')
const Product = require('./models/model')
const path = require('path')

var app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

// multer storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


// controllers

app.get('/',(req,res,next)=>{
    res.render('CreateProduct')
    next()
})

app.get('/overview',async(req,res,next)=>{
    const getAllProd = await Product.find();
    res.render('overview',{
        alldata:getAllProd
    })
    next()
})

app.post('/create-product', upload.array('images', 4),async(req, res, next)=>{
 
    const prodImages = []
    for(var i=0;i<req.files.length;i++){
        prodImages.push(req.files[i].path)
    }
    const crtProd = await Product.create({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        ImageCover:prodImages
    })
    res.redirect('/overview');
    next()
})

module.exports=app;