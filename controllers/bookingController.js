// const Booking = require('../models/Booking');

// // Nayi booking create karne ke liye
// exports.createBooking = async (req, res) => {
//     try {
//         // 1. Frontend se data aaya
//         console.log('Backend received data:', req.body);

//         // 2. Database me save karo
//         const newBooking = await Booking.create(req.body);

//         // 3. Success ka response bhejo
//         console.log('✅ Booking saved to MongoDB:', newBooking._id);
//         res.status(201).json({
//             success: true,
//             message: 'Booking confirmed successfully!',
//             data: newBooking
//         });

//     } catch (error) {
//         // 4. Agar koi error aaye toh usey bhejo
//         console.error('❌ Error saving booking:', error.message);
//         res.status(400).json({
//             success: false,
//             message: 'Data validation failed. Please check all fields.',
//             error: error.message
//         });
//     }
// };

// // Saari bookings get karne ke liye
// exports.getBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find().sort({ createdAt: -1 });
//         res.status(200).json({
//             success: true,
//             count: bookings.length,
//             data: bookings
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };

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
