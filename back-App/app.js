const express = require('express');
const path = require('path');
// const fs = require('fs')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

var indexRouter = require('./routes/index');


const app = express();
app.use(cors())
const PORT = 3000;


// connection database


const url = 'mongodb+srv://devH:devh2020@newcluster.bdh3e.mongodb.net/fastfood?retryWrites=true&w=majority';

    mongoose.connect(url,{ useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false, 
         useCreateIndex: true})
         .then(console.log('database connected!'))
         .catch(err=>{
          console.log(err);
        })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false })); 
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
// app.use(require('./routes/reservation'));
// app.use(require('./routes/sendMail'));
// app.use(require('./routes/succeeded'));

// 0khMIWGeQffA4pFt
// devh2020

    

// -------AFFICHE USER-----------// 


app.listen(PORT, () =>{
    console.log('sever Connected !');
})


