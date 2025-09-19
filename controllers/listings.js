const Listing = require("../models/listing.js");

module.exports.index= async(req,res)=>{
    let allListing = await Listing.find({});
    res.render("listings/index.ejs", {allListing});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");   
}

module.exports.showListing = async (req, res)=>{
    let {id} = req.params;
    const data = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!data){
        req.flash("error", "Listing You Requested Does't Exits Anymore..")
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {data})
}

module.exports.createListing =  async(req,res,next)=>{
   
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
   
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        // user uploaded a file
        newlisting.image = { 
            url: req.file.path, 
            filename: req.file.filename 
        };
    } else {
        // fallback: default image from cloudinary
        newlisting.image = { 
            url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            filename: "default_image" 
        };
    }
    await newlisting.save();
    req.flash("success", "new Listing Created!")
    res.redirect("/listings");
    // console.log(listing);
}

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const editlist = await Listing.findById(id);
    if(!editlist){
        req.flash("error", "Listing You Requested Does't Exits Anymore..")
        return res.redirect("/listings");
    }
    res.render( "listings/edit.ejs", {editlist});
}

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params; 
    // let listing = await Listing.findById(id);
    let listing  = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename}
        await listing.save();
    }

    req.flash("success", `Edited listing ${listing.title} !`)
    // res.redirect(`/listings/${id}`);
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findByIdAndDelete(id);
    req.flash("success", `deleted listing ${list.title}!`)
    res.redirect("/listings");
}