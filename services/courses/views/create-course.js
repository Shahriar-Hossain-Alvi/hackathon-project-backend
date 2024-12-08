const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Course = require("../schema/course.schema");


// create a new course route=> /api/courses
module.exports = async (req, res, next) => {
    const {title, description, cover_url, total_available_seats, start_date, end_date, credits, assigned_faculty, prerequisites} = req.body;

    try {
        // check if the course is already exists/active
        const isCourseExist = await Course.findOne({title: title});
        
        if(isCourseExist){
            if(isCourseExist.is_active){
                return next(
                    new ErrorResponse(`An active course with the title "${title}" already exists!`, 400)
                );
            }else{
                return next(
                    new ErrorResponse(`A course with the title "${title}" already exists but is inactive. Please reactivate the course or choose a different title`, 400)
                );
            }
        }


        // create a new course
        const newCourse = new Course({
            title, description, cover_url, total_available_seats, start_date, end_date, credits, 
            assigned_faculty: assigned_faculty || null, prerequisites: prerequisites || []
        })


        // save new course in the db
        const result = await newCourse.save();


        // send response
        res.status(201).json({
			success: true,
			message: `Course: ${result.title} created successfully`,
		});

    } catch (error) {
        //send error response
        next(error)
    }
}