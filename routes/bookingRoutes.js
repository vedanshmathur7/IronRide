// const express = require('express');
// const router = express.Router();
// const { createBooking, getBookings } = require('../controllers/bookingController');

// // Jab POST request aaye /api/bookings par, toh createBooking chalao
// router.post('/', createBooking);

// // Jab GET request aaye /api/bookings par, toh getBookings chalao
// router.get('/', getBookings);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getBookings);

module.exports = router;
