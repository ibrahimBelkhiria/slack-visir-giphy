const express = require('express');
const axios = require('axios');
const router = express.Router();
const keys = require('../config/keys');


// POST Request handle the /ibrahim_belkhiria command 
// the payload is passed as a body to our request  : req.body = command's payload
router.post('/',(req,res)=>{

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
            
             res.send(requestedGifUrl);
        }else{
            res.send("Choisir un nom de sujet un peu plus significative s'il vous plait");
        }

       
    })
    .catch(err=>{
        // handling errors 
        res.status(400).json({error : err});

    });

});

module.exports = router;
