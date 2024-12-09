const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");

 // get all courseFacultyAssignment
module.exports = async (req, res, next) => {

    try {
       
        const result = await CourseFacultyAssignment.find().select("-__v");
    
        // if courseFacultyAssignment list is empty
        if(result.length === 0){
            return new ErrorResponse("There are no Course Faculty Assignment available", 404)
        }

        // send response
        res.status(200).json({
			success: true,
			message: "Data fetched successfully",
            data: result
		});

    } catch (error) {
        //send error response
        next(error)
    }
}