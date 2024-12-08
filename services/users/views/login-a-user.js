const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const bcrypt = require('bcryptjs');
const User = require("../schema/user.schema");

// login user
module.exports = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new ErrorResponse("Email and Password are required", 400));
    }

    try {
        // find user by email
        const user = await User.findOne({ email });

        // If user not found, show error
        if (!user) {
            return next(new ErrorResponse("User not found!", 404));
        }

        // Compare the password with the hashed_password
        const isMatch = await bcrypt.compare(password, user.password_hashed);


        // If passwords do not match, return error
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const result =  user.toObject();
        delete result.password_hashed;
        delete result.__v;

        // success response
        res.status(200).json({
            success: true,
            message: "login successful",
            data: result,
        });
    } catch (error) {
        // send error response
        next(error)
    }
};
