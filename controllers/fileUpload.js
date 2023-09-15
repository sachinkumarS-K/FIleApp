const cloudinary = require("cloudinary").v2 ;

const fileModel = require("../models/File")

const isFileSupported = (type , supportTypes) => {
    return supportTypes.includes(type) ;
}

async function uploadToCloudinary(file , folder , quality) {
    const options = {
        folder ,
        resource_type : "auto" 
    } ;
    if(quality) {
        options.quality = quality
    }
   return await cloudinary.uploader.upload(file.tempFilePath , options) ;
}
exports.imageUpload = async(req , res) =>{
    try {
        const {name , tags , email} = req.body ;
        console.log(name , tags , email);
        const file = req.files.imageFile ;
        if(!file){
            return res.status(400).json({
                success : false ,
                message : "File not recieved"
            });
        }
        const supportedTypes = ["jpg" , "jpeg" , "png"] ;
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log(`file type : ${fileType}`) ;
        
        if(!isFileSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success : false ,
                message : "File format not supported"
            });           
        }
        const response = await uploadToCloudinary(file , "sachin") ;
        console.log(response);

        const fileData = await fileModel.create({
            name  ,
            imgUrl : response.secure_url,
            tags ,
            email 
        });
       console.log(response.secure_url)
        res.json({
            success : true ,
            imgUrl : fileData.imgUrl ,
            data : fileData ,
            message : "Image uploaded Successfully"
        })

    } catch (error) {
          return res.status(400).json({
                success : false ,
                message : error.message 
            });
    }

}

exports.videoUpload = async(req , res) =>{
   try {
    const {name , tags , email} = req.body ;
    console.log(name , tags, email) ;

    const file = req.files.videoFile ;
    if(!file){
        return res.status(400).json({
            message : "File not recieved"
        })
    }

    const supportedTypes = ['mp4' , "mov" , "mkv"] ;
    const fileType = file.name.split('.')[1].toLowerCase() ;

    if(!isFileSupported(fileType , supportedTypes)){
        return res.status(400).json({
            success : false ,
            message : "File format not supported"
        }); 
    }

    const response = await uploadToCloudinary(file , "sachin") ;
        console.log(response);

        const fileData = await fileModel.create({
            name  ,
            imgUrl : response.secure_url,
            tags ,
            email 
        });

        res.status(200).json({
            success : true ,
            message : "uploaded successfully" ,
            data : fileData 
           
        })
      

   } catch (error) {
    console.log(error)
    return res.status(400).json({
        success : false ,
        message : "File not uploaded" ,
        err : error
    }); 
   }
}

exports.imageReducerUpload = async(req , res) =>{
    try {
        const {name , tags , email } = req.body ;
        const file = req.files.file ;
        if(!file) {
            res.status(400).json({
                success : false ,
                message : "File not recieved"
            });
        }

        const supportedTypes = ["mp4" , "mkv" , "jpg" , "jpeg" , "png"] ;
         const fileType = file.name.split(".")[1].toLowerCase() ;
         console.log("fileType : " ,fileType);

         if(!isFileSupported(fileType , supportedTypes)){
            res.status(400).json({
                success : false ,
                message : "File not supported"
            });
         }

         const response = await uploadToCloudinary(file , "sachin" , 90) ;

         console.log(response);

         const fileData = await fileModel.create({
            name  ,
            imgUrl : response.secure_url,
            tags ,
            email 
        });

        res.status(200).json({
            success : true ,
            message : "uploaded successfully" ,
            data : fileData           
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false ,
            err : error.message ,
            message : "File not uploaded"
        });
    }
}
exports.localFileUpload = async (req , res) => {
    try {
        console.log(`${__dirname}`);
        if(!req.files)
    {
        res.send("File was not found");
        return;
    }
        const file = req.files.file ; 
       
        console.log(file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        console.log(`path : ${path}`);

        file.mv(path , (err) => {
            console.error(err);
        });
        res.status(200).json({
            success : true ,
            message : "Local file uploaded successfully"
        });
    

    } catch (error) {
        res.status(500).json({
            success : false ,
            err : error.message ,
            message : "Local file uploaded failed"
        });
    }
}