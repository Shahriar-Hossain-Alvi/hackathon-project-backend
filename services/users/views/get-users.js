const User = require("../schema/user.schema");


module.exports = async (req, res, next) => {

	try {
		const result = await User.find().select("-password_hashed -__v");

		res.status(201).json({
			success: true,
			message: `Account with ${result.email} email created successfully`,
			data: result
		});
	} catch (error) {
		// Send Error Response
		next(error);
	}
};
