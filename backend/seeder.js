import { connectDB } from "./config/dbConnect.js";
import products from "./data/products.js";
import users from "./data/users.js";
import cart from "./data/cart.js";
import Product from "./models/productModel.js";
import Cart from "./models/cartModel.js";
import User from "./models/userModel.js";

connectDB();

const importData = async()=>{

    try{
        await Product.deleteMany();

        await Product.insertMany(products);
        await User.insertMany(users);
        await Cart.insertMany(cart);

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
        await User.deleteMany();
        await Cart.deleteMany();

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