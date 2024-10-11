const express = require('express');
const Event = require('../models/Event');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create Event
router.post('/', authMiddleware, async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
});

// Get All Events
router.get('/', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

module.exports = router;
