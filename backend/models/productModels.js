const mongoose=require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true,
        maxLength:[100,"product name cannot exceed 100 characters"],
    },
    price:{
        type:Number,
        
        default:0.0
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    ratings:{
        type:String,
        default:0
    },
    offer:{
        type:String
    },
    latest:{
        type:String
    },
    special:{
        type:String
    },
    images:[
        {
            image:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    category:{
        type:String,
        required:[true,"pls enter product category"],
        enum:{
            values:[
                'Electronics',
                'Headphones',
                'Food',
                'Laptops',
                'Sports',
                'Books',
                'Mobile Phones',
                'Outdoor',
                'Accessories',
                'Outdoor'

            ],
            message:"please select correct catogory"
        } 
    },
    seller:{
        type:String,
        required:[true,"pls enter product seller"]
    },
    stock:{
        type:Number,
        required:[true,"pls enter product stock"],
        maxLength:[20,"stock cannot exceed 20"]

    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

let schema = mongoose.model('product',productSchema)
module.exports=schema