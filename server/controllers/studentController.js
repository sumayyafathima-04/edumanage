import Student from '../models/Student.js';

// @desc    Get dashboard statistics (total students, department breakdown, year breakdown)
// @route   GET /api/students/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    // Group by department
    const departmentStats = await Student.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Group by year
    const yearStats = await Student.aggregate([
      { $group: { _id: '$year', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        departmentStats,
        yearStats,
      },
    });
  } catch (error) {
    console.error('Stats Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to compute student statistics.',
      error: error.message,
    });
  }
};

// @desc    Create a new student record
// @route   POST /api/students
// @access  Private
export const createStudent = async (req, res) => {
  try {
    const { fullName, rollNumber, email, department, year, phone } = req.body;

    // Validation: Check required fields
    if (!fullName || !rollNumber || !email || !department || !year || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required. Please fill in all student details.',
      });
    }

    const cleanRollNumber = rollNumber.trim().toUpperCase();

    // Check if roll number already exists
    const existingRoll = await Student.findOne({ rollNumber: cleanRollNumber });
    if (existingRoll) {
      return res.status(400).json({
        success: false,
        message: `A student with Roll Number "${cleanRollNumber}" already exists. Roll numbers must be unique.`,
      });
    }

    // Create student in MongoDB
    const student = await Student.create({
      fullName: fullName.trim(),
      rollNumber: cleanRollNumber,
      email: email.trim().toLowerCase(),
      department: department.trim(),
      year: year.trim(),
      phone: phone.trim(),
      createdBy: req.user?.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Student record added successfully!',
      student,
    });
  } catch (error) {
    console.error('Create Student Error:', error);

    // Mongoose validation error handling
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while adding student record.',
    });
  }
};

// @desc    Get all student records (with optional search and department filter)
// @route   GET /api/students
// @access  Private
export const getAllStudents = async (req, res) => {
  try {
    const { search, department, year } = req.query;

    const filter = {};

    // Search filter across fullName, rollNumber, and email
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { fullName: regex },
        { rollNumber: regex },
        { email: regex },
      ];
    }

    // Department filter
    if (department && department !== 'All') {
      filter.department = department;
    }

    // Year filter
    if (year && year !== 'All') {
      filter.year = year;
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error('Get All Students Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while retrieving student records.',
      error: error.message,
    });
  }
};

// @desc    Get single student record by ID
// @route   GET /api/students/:id
// @access  Private
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID "${req.params.id}" not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error('Get Student Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching student record.',
      error: error.message,
    });
  }
};

// @desc    Update existing student record
// @route   PUT /api/students/:id
// @access  Private
export const updateStudent = async (req, res) => {
  try {
    const { fullName, rollNumber, email, department, year, phone } = req.body;

    // Check if student exists
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID "${req.params.id}" not found.`,
      });
    }

    // If roll number is being changed, verify uniqueness
    if (rollNumber) {
      const cleanRollNumber = rollNumber.trim().toUpperCase();
      if (cleanRollNumber !== student.rollNumber) {
        const duplicate = await Student.findOne({
          rollNumber: cleanRollNumber,
          _id: { $ne: req.params.id },
        });

        if (duplicate) {
          return res.status(400).json({
            success: false,
            message: `Roll Number "${cleanRollNumber}" is already in use by another student.`,
          });
        }
        student.rollNumber = cleanRollNumber;
      }
    }

    if (fullName) student.fullName = fullName.trim();
    if (email) student.email = email.trim().toLowerCase();
    if (department) student.department = department.trim();
    if (year) student.year = year.trim();
    if (phone) student.phone = phone.trim();

    const updatedStudent = await student.save();

    return res.status(200).json({
      success: true,
      message: 'Student record updated successfully!',
      student: updatedStudent,
    });
  } catch (error) {
    console.error('Update Student Error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while updating student record.',
    });
  }
};

// @desc    Delete student record
// @route   DELETE /api/students/:id
// @access  Private
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID "${req.params.id}" not found.`,
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: `Student "${student.fullName}" (Roll: ${student.rollNumber}) deleted successfully.`,
    });
  } catch (error) {
    console.error('Delete Student Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting student record.',
      error: error.message,
    });
  }
};
