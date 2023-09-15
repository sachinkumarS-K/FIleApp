const mongoose = require("mongoose") ;
const nodeMailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    imgUrl : {
        type : String 
    },
    tags : {
        type : String 
    },
    email : {
        type : String 
    }
});

fileSchema.post("save" , async (doc) => {
    console.log("DOC : " ,doc);

    let transporter = nodeMailer.createTransport({
        host : process.env.MAIL_HOST,
        auth: {
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASSWORD,
        }
    });
    console.log("before");
    let info = await transporter.sendMail({ 
        from : "sachingolu.123a@gmail.com",
        to : doc.email,
        subject : "New file uploaded on cloudinary",
        html: `<h2> Nameste jee </h2>
                <p> File uploaded </p>
                <p> click this <a href = "${doc.imgUrl}"> ${doc.imgUrl} </a> </p>
        `
    })
    console.log("after");
})

const File = mongoose.model("File" , fileSchema);

module.exports = File ;
