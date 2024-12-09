const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseStudentEnrollment = require('../schema/courseStudentEnrollment.schema');
const User = require("../../users/schema/user.schema")
const Course = require("../../courses/schema/course.schema")

module.exports = async (req, res, next) => {
    const { users_id, course_id } = req.body;

    // Check if required fields are present
    if (!users_id || !course_id) {
        return next(new ErrorResponse("Students(User) ID and Course ID are required.", 400));
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(users_id) || !mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid user or course ID", 400));
    }

    try {
        // Check if the user (student) exists in the database
        const userExists = await User.findById(users_id);
        if (!userExists) {
            return next(new ErrorResponse("Student (User) not found.", 404));
        }

         // Check if the course exists in the database
         const courseExists = await Course.findById(course_id);
         if (!courseExists) {
             return next(new ErrorResponse("Course not found.", 404));
         }


        // Check if the student is already enrolled in the course
        const existingEnrollment = await CourseStudentEnrollment.findOne({ users_id, course_id });
        if (existingEnrollment) {
            return next(new ErrorResponse("The student is already enrolled in this course.", 400));
        }

        // Create a new course enrollment
        const newEnrollment = new CourseStudentEnrollment({
            users_id,
            course_id,
        });

        await newEnrollment.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: "Student enrolled in the course successfully.",
        });
    } catch (error) {
        next(error);
    }
}