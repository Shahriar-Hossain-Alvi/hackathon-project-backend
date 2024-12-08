const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover_url: { type: String, required: true },
    total_available_seats: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    credits: { type: Number, required: true },
    assigned_faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    is_active: { type: Boolean, default: true },

    prerequisites: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "Course"
    },
}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;