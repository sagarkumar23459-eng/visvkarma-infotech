const Product = require("../models/Product");

// =============================
// GET ALL PRODUCTS
// =============================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// GET SINGLE PRODUCT
// =============================
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// CREATE PRODUCT
// =============================
const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      stock,
    } = req.body;

    const image = req.file
      ? `/uploads/products/${req.file.filename}`
      : "";

    const product = await Product.create({
      name,
      category,
      description,
      price,
      stock,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// UPDATE PRODUCT
// =============================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.description =
      req.body.description || product.description;
    product.price =
      req.body.price !== undefined
        ? req.body.price
        : product.price;
    product.stock =
      req.body.stock !== undefined
        ? req.body.stock
        : product.stock;

    // Update image only if new image uploaded
    if (req.file) {
      product.image = `/uploads/products/${req.file.filename}`;
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// DELETE PRODUCT
// =============================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};