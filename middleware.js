const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js"); 
const { reviewSchema } = require("./schema.js"); 

module.exports.validateListing = (req,res,next)=>{
    let result = listingSchema.validate(req.body);
    // console.log(result);
    if(result.error){
        let errMsg = result.error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next)=>{
    let result = reviewSchema.validate(req.body);
    // console.log(result);
    if(result.error){
        let errMsg = result.error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must login to add new listings");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params; 
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You dont have permissions");    
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewAutor = async (req,res,next)=>{
    let {id, review_id} = req.params; 
    let review = await Review.findById(review_id);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You did't created this review");    
        return res.redirect(`/listings/${id}`);
    }
    next();
}