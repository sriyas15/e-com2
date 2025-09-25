import { connectDB } from "./config/dbConnect.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";

connectDB();

const importData = async()=>{

    try{
        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("Products Imported");
        process.exit();
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }

}

const destroyData = async()=>{
    try {
        await Product.deleteMany();

        console.log("Data Destroyed");

        process.exit();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

if(process.argv[2] === "-d"){
    destroyData();
}else{
    importData();
}