const Student = require('../models/Student');

const sanitizeName = (raw) => {
    if (typeof raw !== 'string') return '';
    let name = raw.trim().replace(/\s+/g, ' ').normalize('NFC');
    return name;
};


const sanitizeRoll = (raw) => {
    if (typeof raw !== 'string') return '';
    return raw.trim().toUpperCase();
};

const nameRegex = /^[\p{L}]['\p{L}\-\. ]{0,99}$/u;
const rollRegex = /^[A-Z0-9]{6,10}$/;

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
        let { name, rollNumber } = req.body;
        name = sanitizeName(name);
        rollNumber = sanitizeRoll(rollNumber);

        if(!name || !rollNumber) {
            return res.status(400).json({ success: false, message: 'Name and rollNumber are required' });
        }

        if (!nameRegex.test(name)) {
            return res.status(400).json({ success: false, message: 'Invalid name format'});
        }

        if (!rollRegex.test(rollNumber)) {
            return res.status(400).json({ success: false, message: 'Roll number must be 6–10 uppercase letters or digits'});
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
      const updatesRaw = req.body;
      const updates = {};
  
      if (updatesRaw.name !== undefined) {
        const name = sanitizeName(updatesRaw.name);
        if (!name) {
          return res.status(400).json({ success: false, message: 'Name cannot be empty' });
        }
        if (!nameRegex.test(name)) {
          return res.status(400).json({ success: false, message: 'Invalid name format' });
        }
        updates.name = name;
      }
  
      if (updatesRaw.rollNumber !== undefined) {
        const rollNumber = sanitizeRoll(updatesRaw.rollNumber);
        if (!rollNumber) {
          return res.status(400).json({ success: false, message: 'Roll number cannot be empty' });
        }
        if (!rollRegex.test(rollNumber)) {
          return res.status(400).json({ success: false, message: 'Roll number must be 6–10 uppercase letters or digits' });
        }
        updates.rollNumber = rollNumber;
      }
  
      const student = await Student.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true
      });
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
      return res.json({ success: true, data: student });
    } catch (err) {
      console.error('Error in updateStudent:', err);
      if (err.name === 'CastError') {
        return res.status(400).json({ success: false, message: 'Invalid student ID' });
      }
      if (err.code === 11000 && err.keyPattern?.rollNumber) {
        return res.status(400).json({ success: false, message: 'Roll number already exists' });
      }
      return res.status(500).json({ success: false, message: 'Server error' });
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