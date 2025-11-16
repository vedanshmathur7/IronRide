const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        console.log('🔥 Backend received:', req.body);

        const newBooking = await Booking.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Booking confirmed successfully!',
            data: newBooking
        });

    } catch (error) {
        console.error('❌ Booking save error:', error.message);
        res.status(400).json({
            success: false,
            message: 'Data validation failed. Please check all fields.',
            error: error.message
        });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
