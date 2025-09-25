import Product from "../models/productModel.js";
import ApiFilters from "../utils/apiFilters.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getProducts = asyncHandler(async(req,res)=>{

    const apiFilters = new ApiFilters(Product,req.query).search().filter();
    const getProducts = await Product.find({});

    const products = await apiFilters.query;

    res.status(200).json({products,getProducts});

})

export const newProduct = asyncHandler(async(req,res)=>{

    const createProduct = await Product.create(req.body);

    res.status(201).json(createProduct);

})

export const getProductDetails = asyncHandler(async(req,res)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({
            error:"Product not found"
        })
    }

    res.status(200).json({product});

}) 

export const updateProduct = asyncHandler(async(req,res)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({
            error:"Product not found"
        })
    }

     product = await Product.findByIdAndUpdate(req.params.id,req.body,{ new:true });

    res.status(200).json({product});

}) 

export const deleteProduct = asyncHandler(async(req, res) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({
            error:"Product not found"
        })
    }

    product = await Product.deleteOne();

    res.status(200).json({
        message:"Product Deleted"
    });

})

