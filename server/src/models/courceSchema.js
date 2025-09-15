const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true } // duration in minutes
});

const InstructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String }, // URL
  bio: { type: String }
});

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const RatingSchema = new mongoose.Schema({
  average: { type: Number, default: 0 },
  count: { type: Number, default: 0 }
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, default: "" },

    instructor: { type: InstructorSchema, required: true },
    lessons: [LessonSchema],
    objectives: [{ type: String }],
    prerequisites: [{ type: String }],
    targetAudience: { type: String },

    faqs: [FAQSchema],
    rating: { type: RatingSchema, default: () => ({}) },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true } 
);

const CourseModel = mongoose.model("Course", CourseSchema);
module.exports = CourseModel;