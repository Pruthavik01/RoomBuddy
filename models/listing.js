const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const DEFAULT_IMAGE = "https://imgs.search.brave.com/QrrF8yctvnxGKn5UBvuEt1XL7Pv04zXmzQ0y50RN5cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyN19jYVJQUEg5/OUQ2RDFpRm9ua0NS/bUNHemtKUGYzNlFE/dy5qcGc";
const listingSchema = new Schema({
    title: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },

    image: {
        url : String,
        filename: String,
        // type: String,
        // default: DEFAULT_IMAGE,
        // set: (v) => v === "" ? DEFAULT_IMAGE : v,
    },
    
    price: {
        type: Number,
        // required: true,
        min: 100,
    },
    location: {
        type: String,
        // required: true,
    },
    country: {
        type: String,
        // required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:  {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

})

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews} } );
    }
});

const Listning = mongoose.model("Listing", listingSchema);
module.exports = Listning;
