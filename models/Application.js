const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[\d\s\-\+\(\)]{10,}$/, 'Please enter a valid phone number']
    },
    jobCategory: {
        type: String,
        required: [true, 'Job category is required'],
        enum: ['Driving', 'Operations', 'Support', 'Management']
    },
    experience: {
        type: String,
        required: [true, 'Experience details are required'],
        minlength: [20, 'Please provide at least 20 characters of experience']
    },
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);