const express = require("express");
const { imageUpload, videoUpload, localFileUpload, imageReducerUpload } = require("../controllers/fileUpload");
const router = express.Router() ;


router.get("/demo" , (req , res)=>{
    res.send(`dummy route`) ;
})

 router.post("/imageUpload" , imageUpload);
 router.post("/videoUpload" , videoUpload);
router.post("/localFileUpload" , localFileUpload);
router.post("/imageReducerUpload", imageReducerUpload);

module.exports = router ;