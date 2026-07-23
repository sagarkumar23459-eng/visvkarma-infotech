const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://USERNAME:sagar9931cluster0.imedf92.mongodb.net/sibani-chemicals?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("✅ Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });