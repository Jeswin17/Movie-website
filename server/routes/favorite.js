const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================



router.post("/favoriteNumber", (req, res) => {

    // find favorite information
    Favorite.find({"movieId":  req.body.movieId})
        .exec((err, favorite) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, favoriteNumber: favorite.length})
        })
});

router.post("/favorited", (req, res) => {
// find fav info inside favorite collection by movieId, userFrom
    Favorite.find({"movieId":  req.body.movieId, "userFrom": req.body.userFrom})
        .exec(( err , favorite ) => {
            if(err) return res.status(400).send(err)

            // how can we know if user already favorited a movie or not

            let result = false;
            if(favorite.length !== 0){
                result = true
            }

            res.status(200).json({ success: true , favorited: result});

        })
  
});

router.post("/addToFavorite", (req, res) => {
    // save the information about the movie user Id 
    const favorite = new Favorite(req.body)
    favorite.save((err,doc) => {

        if(err) return res.json({success: false ,err})
        return res.status(200).json({ success: true})

    })
    
    });

    router.post("/removeFromFavorite", (req, res) => {
        // save the information about the movie user Id 
        
        Favorite.findOneAndDelete({ movieId: req.body.movieId , userFrom : req.body.userFrom})
            .exec(( err , doc ) => {
                if(err) return res.status(400).json({ success: false,err})
                    res.status(200).json({ success: true,doc})
                })
            });

module.exports = router;
