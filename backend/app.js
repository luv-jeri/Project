const cookieParser = require("cookie-parser");
const express = require("express")
const app = express();
const errorMiddleware = require ('./middleware/error');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload")
const path = require("path");
const dotenv =require ('dotenv');




// using config for environment variable 
dotenv.config({path:'backend/config/.env'});


//route imports 
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({useTempFiles: true}));


const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const cart = require("./routes/WishListRoute");
const payment =require('./routes/paymentRoute')


app.use("/api/v2", order);
app.use("/api/v2", user);
app.use("/api/v2", product)
app.use("/api/v2",cart);
app.use("/api/v2", payment)




app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})

//middleware for error
app.use(errorMiddleware);



module.exports = app;