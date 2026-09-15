const express = require('express');
const router = express.Router();
const Canvas = require('../models/Canvas');
const auth = require('../middleware/auth');

router.use(auth);

// POST /api/canvases - Create a new canvas
router.post('/', async (req, res) => {
  try {
    // Attach the logged-in user's ID to the canvas payload
    const newCanvas = new Canvas({ ...req.body, user: req.user.id });
    const savedCanvas = await newCanvas.save();
    res.status(201).json(savedCanvas);
  } catch (error) {
    res.status(500).json({ message: 'Error creating canvas', error: error.message });
  }
});

// GET /api/canvases - Get all canvases for logged-in user only
router.get('/', async (req, res) => {
  try {
    // Filter canvases by the authenticated user's ID
    const canvases = await Canvas.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(canvases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching canvases', error: error.message });
  }
});

// GET /api/canvases/:id - Get a specific canvas
router.get('/:id', async (req, res) => {
  try {
    const canvas = await Canvas.findOne({ _id: req.params.id, user: req.user.id });
    if (!canvas) return res.status(404).json({ message: 'Canvas not found or unauthorized' });
    res.status(200).json(canvas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching canvas', error: error.message });
  }
});

// PUT /api/canvases/:id - Update a canvas
router.put('/:id', async (req, res) => {
  try {
    const updatedCanvas = await Canvas.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Must match ID AND User
      { $set: req.body },
      { new: true }
    );
    if (!updatedCanvas) return res.status(404).json({ message: 'Canvas not found or unauthorized' });
    res.status(200).json(updatedCanvas);
  } catch (error) {
    res.status(500).json({ message: 'Error updating canvas', error: error.message });
  }
});

// DELETE /api/canvases/:id - Delete a canvas
router.delete('/:id', async (req, res) => {
  try {
    const deletedCanvas = await Canvas.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deletedCanvas) return res.status(404).json({ message: 'Canvas not found or unauthorized' });
    res.status(200).json({ message: 'Canvas deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting canvas', error: error.message });
  }
});

module.exports = router;