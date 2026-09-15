const mongoose = require('mongoose');

const canvasSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled Canvas' },
  elements: { type: Array, default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Canvas', canvasSchema);