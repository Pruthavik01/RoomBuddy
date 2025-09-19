const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, 
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );
    
//new rout
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListing))
.patch( isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



//indexing rout
// router.get("/" , wrapAsync (listingController.index));

//show rout
// router.get("/:id", wrapAsync(listingController.showListing));

//create rout
// router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing));


//update
// router.patch("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//delete
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;