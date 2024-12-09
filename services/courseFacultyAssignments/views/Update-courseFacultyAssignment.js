const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");


module.exports = async (req, res, next) => {
	const {
		params: { id },
		body: { users_id,course_id, start_date, end_date,is_active, },
	} = req;

	// check if the id is a valid mongodb id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorResponse("Invalid user ID", 400));
	}

	try {
		// create a update CourseFacultyAssignment
		const updateData = {};

		if (users_id) updateData.users_id = users_id;
		if (course_id) updateData.course_id= course_id;
		if (start_date) updateData.start_date = start_date;
		if (end_date) updateData.end_date = end_date;  
		if (typeof is_active !== "undefined") updateData.is_active = is_active;

		// Find CourseFacultyAssignment by ID and update
		const result = await CourseFacultyAssignment.findByIdAndUpdate(id, updateData, {
			new: true, // Returns the updated document instead of the old one
			runValidators: true, // Runs schema validation after updating fields
		});

		// If CourseFacultyAssignment not found
		if (!result) return next(new ErrorResponse("No CourseFacultyAssignment found with the given ID", 404));

		// send response
		res.status(200).json({
			success: true,
			message: "CourseFacultyAssignment updated successfully"
		});

	} catch (error) {
		// Send Error Response
		next(error);
	}
};
