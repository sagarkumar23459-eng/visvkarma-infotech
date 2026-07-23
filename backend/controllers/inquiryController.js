const Inquiry = require("../models/inquiry");

// Create Inquiry
exports.createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Inquiry

exports.deleteInquiry = async (req,res)=>{

    try{

        const inquiry =
        await Inquiry.findByIdAndDelete(req.params.id);


        if(!inquiry){

            return res.status(404).json({

                success:false,
                message:"Inquiry not found"

            });

        }


        res.json({

            success:true,
            message:"Inquiry deleted successfully"

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};

// Get All Inquiries
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};