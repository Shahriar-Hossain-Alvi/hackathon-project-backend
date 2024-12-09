const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const User = require("../../users/schema/user.schema");
const Course = require("../../courses/schema/course.schema");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");

// creat a new user 
module.exports = async (req, res, next) => {
    const { users_id, course_id } = req.body;

    if (!users_id || !course_id) {
        return next(
            new ErrorResponse("Faculty user ID and Assigned Course ID are required.", 400)
        );
    }

    if (!mongoose.Types.ObjectId.isValid(users_id)) {
        return next(new ErrorResponse("Invalid user ID", 400));
    }
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid course ID", 400));
    }

    try {

        // check faculty
        const userExists = await User.findById(users_id);
        if (!userExists) {
            return next(new ErrorResponse("The specified faculty user does not exist in Database.", 404));
        }

        // Check if course exists
        const courseExists = await Course.findById(course_id);
        if (!courseExists) {
            return next(new ErrorResponse("The specified course does not exist in Database.", 404));
        }

        // check existing Faculty user ID
        const isCourseFacultyAssignment = await CourseFacultyAssignment.findOne({ users_id, course_id });

        if (isCourseFacultyAssignment) {
            return next(new ErrorResponse("A course with this faculty is already exist !", 400));
        }

        // Create a new assignment
        const newCourseFacultyAssignment = new CourseFacultyAssignment({
            users_id,
            course_id,
        });
       const result =  await newCourseFacultyAssignment.save();
    
        res.status(201).json({
            success: true,
            message: "Course-Faculty assignment created successfully.",

        });
    } catch (error) {
        // Send Error Response
        next(error);
    }
}