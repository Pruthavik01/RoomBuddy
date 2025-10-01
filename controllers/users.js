const User = require("../models/user.js");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const session = require("express-session");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);




module.exports.userLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.userSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

// module.exports.signup = async (req, res) => {
//     try {
//         let { username, email, password } = req.body;
//         const newUser = new User({ email, username });
//         const registerUser = await User.register(newUser, password);
//         req.login(registerUser,(err)=>{
//             if(err){
//                 return next(err);
//             }
//             req.flash("success", `WellCome ${username} to Airbnb`);
//             res.redirect("/listings");
//         })
//     } catch (e) {
//         req.flash("error", e.message);
//         res.redirect("/signup");
//     }
// }

// Step 1: signup (send OTP)
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash("error", "Email already registered");
            return res.redirect("/signup");
        }

        // Generate OTP (6 digits)
        const otp = otpGenerator.generate(8, { digits: true, upperCase: true, specialChars: true });

        // Store in session
        req.session.otp = otp;
        req.session.username = username;
        req.session.email = email;
        req.session.password = password; // TODO: hash before creating user
        req.session.otpExpires = Date.now() + 2 * 60 * 1000; // 2 minutes

        // Send OTP via email
        await sgMail.send({
            from: "ramr33770@gmail.com", // must be verified in SendGrid
            to: email,
            subject: "Your Roombuddy OTP Code",
            text: `Your OTP is: ${otp}. It will expire in 2 minutes.`,
            html: `<h1>Your OTP is: <b>${otp}</b>. It will expire in 2 minutes.</h1>`
        });


        res.render("users/verify-otp", { email });

    } catch (e) {
        next(e);
    }
};

// Step 2: verify OTP
module.exports.verifyOTP = async (req, res, next) => {
    try {
        const { otp } = req.body;

        if (!req.session.otp || !req.session.email) {
            req.flash("error", "OTP not found. Please signup again.");
            return res.redirect("/signup");
        }

        if (Date.now() > req.session.otpExpires) {
            req.session.destroy();
            req.flash("error", "OTP expired. Please signup again.");
            return res.redirect("/signup");
        }

        if (req.session.otp === otp) {
            // OTP correct → create user
            const { username, email, password } = req.session;
            const user = new User({ username, email });
            await User.register(user, password); // passport-local-mongoose handles hashing

            // Clear OTP-related session data
            delete req.session.otp;
            delete req.session.otpExpires;
            delete req.session.password;
            delete req.session.email;
            delete req.session.username;


            req.flash("success", "Signup successful! You can login now.");
            res.redirect("/login");

        } else {
            req.flash("error", "Invalid OTP. Try again.");
            res.render("users/verify-otp", { email: req.session.email });
        }

    } catch (e) {
        next(e);
    }
};

module.exports.login = async (req, res) => {
    req.flash("success", "Wellcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You are Logged out");
        res.redirect("/listings");
    })
}