var express = require('express');
var router = express.Router();
// const conn = require('../db/conn.js');
const Category = require('../models/category');
const SCategory = require('../models/sousCategory')
const Food = require('../models/food')
const Table = require('../models/tables')
const Order = require('../models/order')
const winston = require('winston')
const mongoose = require('mongoose');
const PDFDocument = require("pdfkit");
const fs = require("fs");
const Client = require('../models/client')
require('winston-mongodb')




/* GET home page. */
router.get('/', function(req, res, next) {

  res.status(200).json({
    message : 'ok'
  })
  
});

// add category 
router.post('/addcategory',(req,res)=>{

  const category = new Category({
    catName : req.body.catName
  })
  category.save()
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err);
  })

})

// Show Category
router.get('/category',(req,res)=>{
  Category.find()
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err);
  })
})

router.get('/choix',(req,res)=>{
  SCategory.find({catpName: "category3"})
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err);
  })
})

// add sousCategory
   router.post('/AddSubCategory', (req,res)=>{
     const scategory = new SCategory({
       sousCatName : req.body.name,
       categoryParent : req.body.categoryParent
     })
     scategory.save()
     .then(doc=>{
       res.send(doc)
     })
     .catch(err=>{
       console.log(err);
     })
   })

  // get all sous category linked with category 
    router.get('/:categoryParent',(req,res)=>{
    SCategory.find({categoryParent:req.params.categoryParent})
    .then(doc=>{
      res.send(doc)
    })
    .catch(err=>{
      console.log(err)
    })
  })

// add food
router.post('/addfood', (req,res)=>{
  const addfood = new Food({
    foodName : req.body.name,
    Price : req.body.price,
    subCat : req.body.subCat
  })

  addfood.save()
  .then(doc=>{
    res.send(doc)
  }).catch(err=>{
    console.log(err)
  })
})
// get foods
router.get('/get/foods',(req,res)=>{
  Food.find()
  .then(doc=>{
    res.status(200).send(doc)
  })
  .catch(err=>{
    console.log(err)
  })
})

// get food by ID
router.get('/foods/:id',(req,res)=>{
  Food.find({subCat:req.params.id})
  .then(doc=>{
    res.status(200).send(doc)
  })
  .catch(err=>{
    console.log(err)
  })
})

// show all food at section

router.get('/showfood/:id',(req,res)=>{
  Food.find({_id: req.params.id})
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err);
  })
})




router.post('/addtable', (req,res)=>{
  const addtable = new Table({
    tableNumber : req.body.number,
    available : req.body.available
  })

  addtable.save()
  .then(doc=>{
    res.send(doc)
  }).catch(err=>{
    console.log(err)
  })
})

router.get('/get/table',(req,res)=>{
    Table.find()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.log(err)
    })
  })




// import {hello} from '../model/Method.js';
const { getTime, exportPdf, randomCode, getPoints, tableReserved } = require('../models/Method')

router.post('/addClient', (req, res) => {
    const client = new Client({
        code: req.body.code,
        points: req.body.points
    })
    client.save()
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            console.log(err)
        })
})

// get points by client
router.get('/getPoints/:code', (req, res) => {
    Client.findOne({ code: req.params.code })
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            console.log(err)
        })
})

// add order 
router.get('/getPrice/:id', (req, res) => {
    Food.findById({ _id: req.params.id })
        .select('productPrice')
        .then(doc => {
            var price = doc.productPrice
            // var total = price *req.body.
            res.status(200).json({ price: price })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/setOrder', (req, res) => {
    console.log(req.body);
    // return
    Food.findById({ _id: req.body.id })
        // .select('productPrice')
        .then(async doc => {

            var price = doc.Price;
            var usePoints = req.body.usePoints;
            let qte = req.body.qte
            var total = (price * qte);
            var lastPrice = total - usePoints
            console.log(total);
            var pts = getPoints(total) - usePoints
            // var restPoints = pts-usePoints
            console.log(pts);
            // console.log(restPoints);
            const order = new Order({
                productName : doc.foodName,
                productPrice : doc.Price,
                productQte : qte,
                tableNumber : req.body.tableSelect,

            })
            await order.save()
            Client.findOneAndUpdate({ code: req.body.code }, { $inc: { points: pts } }, { new: true })
                .then(client => {
                    if (client) {
                        exportPdf(doc.foodName, req.body.tableSelect, client.code, client.points, lastPrice)
                        tableReserved(req.body.tableSelect)
                        res.status(200).json({ client: client })
                    } else {
                        const cli = new Client({
                            code: randomCode(1, 9999),
                            points: getPoints(total)
                        })
                        cli.save()
                            .then(MyNewClient => {
                                tableReserved(req.body.tableSelect)
                                exportPdf(doc.foodName, req.body.tableSelect, MyNewClient.code, MyNewClient.points, lastPrice)
                                res.status(200).json({
                                    message: "file exported",
                                });
                                // res.status(200).json({MyNewClient:MyNewClient})
                            }).catch(err => {
                                console.log(err)
                            })
                    }
                })
            // res.status(200).json({total:total})
            // res.send(total)
        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router;