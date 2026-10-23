import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Student full name is required'],
      trim: true,
      minlength: [2, 'Full name must have at least 2 characters'],
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
      enum: {
        values: [
          'Computer Science & Engineering',
          'Information Technology',
          'Electronics & Telecommunication',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electrical Engineering',
          'Artificial Intelligence & Data Science',
        ],
        message: '{VALUE} is not a supported department',
      },
    },
    year: {
      type: String,
      required: [true, 'Year of study is required'],
      trim: true,
      enum: {
        values: ['First Year', 'Second Year', 'Third Year', 'Final Year'],
        message: '{VALUE} is not a valid year of study',
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9+\-\s()]{10,15}$/, 'Please enter a valid phone number (10 to 15 digits)'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual or helper for student ID display
studentSchema.virtual('studentId').get(function () {
  return this._id.toHexString();
});

studentSchema.set('toJSON', {
  virtuals: true,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
