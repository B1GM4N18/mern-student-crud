const Student = require('../models/Student');

// GET Students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1});
        return res.json({ success: true, data: students});
    } catch (err) {
        console.error('Error in getStudents:', err);
        return res.status(500).json({ success: false, message: 'Server error'});
    }
};

// POST create a new student
exports.addStudent = async (req, res) => {
    try {
        const { name, rollNumber } = req.body;
        if(!name || !rollNumber) {
            return res.status(400).json({ success: false, message: 'Name and rollNumber are required' });
        }

        const student = new Student({ name, rollNumber });
        await student.save();
        return res.status(201).json({success: true, data: student});
    } catch (err) {
        console.error('Error in addStudent: ', err);
        if (err.code === 11000 && err.keyPattern?.rollNumber) {
            return res.status(400).json({ success: false, message: 'RollNumber must be unique' });
        }
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// PUT update student
exports.updateStudent = async (req, res) => {
    try {
        const updates = req.body;
        const student = await Student.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found'});
        }
        return res.json({ success: true, data: student });
    } catch (err) {
        console.error('Error in updateStudent: ', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid student ID'});
        }
        if (err.code === 11000 && err.keyPattern?.rollNumber) {
            return res.status(400).json({ success: false, message: 'rollNumber must be unique'});
        }
        return res.status(500).json({ success: false, message: 'Server Error'});
    }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found'});
        }
        return res.json({ success: true, message: 'Student Deleted' });
    } catch (err) {
        console.error('Error in deleteStudent: ', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid Student ID'});
        }
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};