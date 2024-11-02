const products = require("../data/products.json");
const Product = require("../models/productModels");
const dotenv = require('dotenv');
const connectDatabase= require("../config/database")



dotenv.config({path:'backend/config/config.env'});
connectDatabase();


const seedProducts=async()=>{
   try{
    await Product.deleteMany();
    console.log("product deleted");
   await Product.insertMany(products);
   console.log("all products added");
   }catch(error){
    console.log(error);
   }
   process.exit();
}

seedProducts();