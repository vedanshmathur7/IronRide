const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    serviceType: { type: String, required: [true, 'Service type is required'] },
    customerName: { type: String, required: [true, 'Customer name is required'], trim: true },
    customerEmail: { type: String, required: [true, 'Email is required'], lowercase: true },
    customerPhone: { type: String, required: [true, 'Phone number is required'] },
    pickupLocation: { type: String, required: [true, 'Pickup location is required'] },
    dropoffLocation: { type: String, required: [true, 'Dropoff location is required'] },
    pickupDate: { type: String, required: [true, 'Pickup date is required'] },
    pickupTime: { type: String, required: [true, 'Pickup time is required'] },
    passengers: { type: Number, required: true, min: 1 },
    specialRequests: { type: String, default: '' },
    estimatedPrice: { type: Number, required: true },
    status: { type: String, default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
