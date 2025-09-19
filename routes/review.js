const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedIn, isReviewAutor,validateReview } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js")

//Reviews
//Post reviews route
router.post("/", isLoggedIn ,validateReview, wrapAsync(reviewController.createReview));

//review delete
router.delete("/:review_id",isLoggedIn, isReviewAutor, wrapAsync(reviewController.destroyReview));

module.exports = router;