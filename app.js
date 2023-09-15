const express = require("express");
const route = require("./routes/FileUpload.js");
const { dbConnect } = require("./config/database.js");
const { cloudinaryConnect } = require("./config/cloudinary.js");

const fileUpload = require('express-fileupload');

const app = express() ;
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.json());
app.use("/api/v1/upload",route);


dbConnect();
cloudinaryConnect();


app.get("/" , (req , res)=> {
    res.send("DEFAULT ROUTE");
})

module.exports = app ;