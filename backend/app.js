require("dotenv").config();

const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");

const notFound = require("./middleware/notFound");

const errorHandler = require("./middleware/errorHandler");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");
const path = require("path");
const uploadRoutes =
require("./routes/uploadRoutes");

const app = express();

const inquiryRoutes = require("./routes/inquiryRoutes");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);
app.use(
"/api/upload",
uploadRoutes
);
app.use("/api/inquiries", inquiryRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sibhani Chemicals Backend Running 🚀",
  });
});

app.get("/api/test-auth", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route working",
    admin: req.admin
  });
});
// Invalid Route

app.use(notFound);

// Global Error Handler

app.use(errorHandler);

module.exports = app;