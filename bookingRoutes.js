const express = require('express');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create Booking
router.post('/', authMiddleware, async (req, res) => {
    const { eventId, seatsBooked } = req.body;
    const event = await Event.findById(eventId);

    if (!event || event.seats < seatsBooked) {
        return res.status(400).json({ message: 'Not enough seats available' });
    }

    const newBooking = new Booking({
        user: req.user.id,
        event: eventId,
        seatsBooked
    });

    await newBooking.save();

    // Update event seats
    event.seats -= seatsBooked;
    await event.save();

    res.status(201).json(newBooking);
});

// Get Bookings for User
router.get('/', authMiddleware, async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
});

module.exports = router;
