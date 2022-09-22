const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please Enter Product Name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true, "Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true, "Please Enter Product Price"],
        maxLength:[8,  "Price  cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0

    },
    images:[{
        public_id:{
            type:String,
            required:true,
            
        },
         url:{
            type:String,
            required:true,
            
        }
    }],
    category:{
        type:String,
        required:[true, "Please Enter Product Category"],
    },
    stock:{
        type:Number,
        required:[true, "Please Enter Product stock"],
        maxLength:[4,"Stock cannot exceed 4 Character"],
        default:1,
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required: true,
            },
            rating:{
                type:Number,
                required:true,
                // enum:[1,2,3,4,5]
            },
            comment:{
                type:String,
                required:true,
            },
            time:{
                type: Date,
                default: Date.now()
            },

        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})
module.exports = mongoose.model("Product", productSchema);