const ErrorResponse = require("../../../utils/middleware/error/error.response");
const User = require("../schema/user.schema");
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
	const { email, password, user_role } = req.body;
	console.log(req.body);
	try {
		if (!email || !password || !user_role) {
			return next(
				new ErrorResponse("Email, Password & Role are required!", 400)
			);
		}

		// check existing user
		const isUserExist = await User.findOne({ email });
		if (isUserExist) {
			return next(new ErrorResponse("User exist with the email!", 400));
		}

		//Hash the pin
		const salt = bcrypt.genSaltSync(10);
		const hashedPass = bcrypt.hashSync(password.toString(), salt);

		// create a new user
		const newUser = new User({ email, password_hashed: hashedPass, user_role });
		// save the new user in the DB
		const result = await newUser.save();

		res.status(201).json({
			success: true,
			message: `Account with ${result.email} email created successfully`,
		});
	} catch (error) {
		// Send Error Response
		next(error);
	}
};
