const express = require('express');
const axios = require('axios');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
// instantiate  express 
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST Route to respond to slack request and  get a gif from giphy API 
// @body is available at the req object 
app.post('/api',(req,res)=>{

    // This variable will contain the url of the gif
    let requestedGifUrl='';

    //  log to the console for debuging 
    //  check : https://api.slack.com/slash-commands#app_command_handling for the payload docs
    console.log(req.body.text);

    // make a get request to the giphy api  using axios 
    axios.get(`http://api.giphy.com/v1/gifs/random?tag=${req.body.text}&api_key=${keys.giphyApiKey}`)
    .then(result=>{
        // log the result to the console for debuging purposes 
        console.log(result.data.data.image_url);
        // storing the url 
        requestedGifUrl =result.data.data.image_url;
        // check if there is a result 
        if(requestedGifUrl){
            // return the result in the response object
            res.send(requestedGifUrl);
        }else{
            res.send("Choisir un nom de sujet un peu plus significative s'il vous plait");
        }

       
    })
    .catch(err=>{
        // handling errors 
        res.status(400).json({error : err});

    });

})


// listening to port 3000
app.listen(3000);