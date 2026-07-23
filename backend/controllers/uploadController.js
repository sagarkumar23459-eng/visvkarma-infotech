const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully.",
    imageUrl: `/uploads/products/${req.file.filename}`,
  });
};

module.exports = {
  uploadImage,
};