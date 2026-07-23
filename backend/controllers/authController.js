const generateToken = require("../utils/generateToken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // Check Admin Email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check Admin Password
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT Token
    const token = generateToken({
      email: process.env.ADMIN_EMAIL,
      role: "admin",
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
};