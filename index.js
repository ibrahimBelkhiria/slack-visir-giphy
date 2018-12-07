const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const gifSlackApi = require('./api/GifSlackApi');


// instantiate  express 
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing 
app.use('/api',gifSlackApi);


// listening to port 3000
app.listen(3000,()=>console.log('listening to post 3000'));