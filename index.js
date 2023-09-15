const app = require("./app");
require("dotenv").config();

const Port = process.env.PORT ;


app.listen(Port , ()=> {
    console.log(`SERVER IS RUNNING ON PORT ${Port}`)
})
