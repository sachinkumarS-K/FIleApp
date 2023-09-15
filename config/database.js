const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async()=> {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser : true ,
            useUnifiedTopology : true
        });

        console.log(`connect to database  ${connection.name}`);
    } catch (error) {
        console.log("Isuue in db connection");
        console.error(error);
        process.exit(1);
    }
}