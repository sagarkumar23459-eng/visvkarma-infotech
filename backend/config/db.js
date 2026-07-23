const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}`
    );

  } catch(error){

    console.error("❌ MongoDB Connection Failed");
    console.error(error);

    process.exit(1);

  }
};

module.exports = connectDB;