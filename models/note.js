const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const noteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

// model the schema
const Note = mongoose.model('Notes', noteSchema);

// export module
module.exports = Note;