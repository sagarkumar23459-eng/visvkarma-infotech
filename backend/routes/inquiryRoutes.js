const express = require("express");

const router = express.Router();

const {
  createInquiry,
  getInquiries,
  deleteInquiry
} = require("../controllers/inquiryController");

router.delete("/:id", deleteInquiry);
router.post("/", createInquiry);

router.get("/", getInquiries);

module.exports = router;