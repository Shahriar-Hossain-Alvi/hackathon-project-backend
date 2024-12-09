const ErrorResponse = require("../../../utils/middleware/error/error.response");
const User = require("../schema/user.schema");


module.exports = async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return next(new ErrorResponse("Email and OTP are required.", 400));
    }

    // Check if the OTP matches the one saved in the database (you can store it in the user's session or database)
    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorResponse("User not found.", 404));
    }

    if (user.otp !== otp) {
        return next(new ErrorResponse("Invalid OTP.", 400));
    }

    // OTP is valid, proceed to activate the user or authenticate
    return res.status(200).json({
        success: true,
        message: "OTP verified successfully."
    });
};
