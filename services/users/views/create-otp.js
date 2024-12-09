const generateOtp = require("../../../utils/otpGenerator/otpGenerator");
const sendOtpEmail = require("../../../utils/otpGenerator/sendOtpEmail");



module.exports = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    // Generate OTP
    const otp = generateOtp();

    // Send OTP to email
    sendOtpEmail(email, otp);

    // Save OTP to the database for later verification (e.g., in a user schema or session)
    // Here you can create logic to save the OTP for a limited time to a user session

    return res.status(200).json({ message: "OTP sent successfully" });
};
