const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const validateProduct = require("../middleware/validateProduct");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Protected Routes
router.post(
  "/",
  protect,
  upload.single("image"),
  validateProduct,
  createProduct
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  validateProduct,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  deleteProduct
);

module.exports = router;