const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
    .get(userController.userSignupForm)
    .post(wrapAsync(userController.signup));



router.route("/login")
    .get(userController.userLoginForm)
    .post(
        savedRedirectUrl,
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
        wrapAsync(userController.login)
    );


router.get("/logout", userController.logout);

router.route("/verify-otp")
    .get((req,res)=> res.render("users/verify-otp", { email: req.session.email }))
    .post(wrapAsync(userController.verifyOTP));


module.exports = router;

// router.get("/signup", userController.userSignupForm);

// router.post("/signup", wrapAsync(userController.signup));

// router.get("/login", userController.userLoginForm);


// router.post(
//     "/login", savedRedirectUrl,
//     passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
//     wrapAsync(userController.login)
// );