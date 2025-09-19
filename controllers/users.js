const User = require("../models/user.js");

module.exports.userLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.userSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", `WellCome ${username} to Airbnb`);
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.login = async (req, res) => {
        req.flash("success", "Wellcome back!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);

}

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "You are Logged out");
        res.redirect("/listings");
    })
}