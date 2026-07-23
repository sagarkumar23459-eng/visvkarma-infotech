const validateProduct = (req, res, next) => {
  const {
    name,
    category,
    description,
    price,
    stock,
    image,
  } = req.body;

  if (!name || !category || !description) {
    return res.status(400).json({
      success: false,
      message:
        "Name, Category and Description are required.",
    });
  }

  if (price !== undefined && price < 0) {
    return res.status(400).json({
      success: false,
      message: "Price cannot be negative.",
    });
  }

  if (stock !== undefined && stock < 0) {
    return res.status(400).json({
      success: false,
      message: "Stock cannot be negative.",
    });
  }

  next();
};

module.exports = validateProduct;