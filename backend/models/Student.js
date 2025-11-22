const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    roll: { 
        type: String,
        required: true, 
        trim: true,
        unique: true 
    },
    name: { 
        type: String, 
        required: true, 
        trim: true,
    },
    classSec: {
        type: String, 
        required: true, 
        trim: true,
        required: true,  
    },
    email: { 
        type: String, 
        trim: true, 
        unique: true ,
        required: true, 
    }
        
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);













