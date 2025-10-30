// ============================================
// IRONRIDE - Main Application JavaScript
// Pure Vanilla JS - No Frameworks
// ============================================

// Global Data Store
const AppData = {
    bookings: [],
    contactMessages: [],
    jobApplications: [],
    currentBooking: null
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
}

function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ============================================
// NAVIGATION & HEADER
// ============================================

function initNavigation() {
    const header = document.querySelector('.main-header');
    
    // Sticky header effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(13, 13, 13, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(13, 13, 13, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const form = document.querySelector('.form-container form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || name.length < 2) {
            showMessage('Please enter a valid name', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (!message || message.length < 10) {
            showMessage('Message must be at least 10 characters', 'error');
            return;
        }
        
        // Simulate submission
        const contactData = {
            id: generateId(),
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        };
        
        AppData.contactMessages.push(contactData);
        
        console.log('Contact Message Submitted:', contactData);
        console.log('All Contact Messages:', AppData.contactMessages);
        
        showMessage('Thank you! Your message has been sent successfully.');
        form.reset();
    });
}

// ============================================
// JOB APPLICATION FORM
// ============================================

function initJobApplicationForm() {
    const form = document.querySelector('.form-container form');
    if (!form || !document.getElementById('full-name')) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email-address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const jobCategory = document.getElementById('job-category').value;
        const experience = document.getElementById('experience').value.trim();
        
        // Validation
        if (!fullName || fullName.length < 2) {
            showMessage('Please enter your full name', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (!validatePhone(phone)) {
            showMessage('Please enter a valid phone number', 'error');
            return;
        }
        
        if (!experience || experience.length < 20) {
            showMessage('Please provide at least 20 characters of experience', 'error');
            return;
        }
        
        // Submit application
        const applicationData = {
            id: generateId(),
            fullName,
            email,
            phone,
            jobCategory,
            experience,
            status: 'pending',
            submittedAt: new Date().toISOString()
        };
        
        AppData.jobApplications.push(applicationData);
        
        console.log('Job Application Submitted:', applicationData);
        console.log('All Applications:', AppData.jobApplications);
        
        showMessage('Application submitted successfully! We will contact you soon.');
        form.reset();
    });
}

// ============================================
// BOOKING MODAL & SYSTEM
// ============================================

function createBookingModal() {
    const modal = document.createElement('div');
    modal.id = 'bookingModal';
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="booking-modal-content">
            <div class="booking-modal-header">
                <h2 id="modalServiceTitle">Book Your Ride</h2>
                <button class="modal-close" onclick="closeBookingModal()">&times;</button>
            </div>
            <form id="bookingForm" class="booking-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="pickupLocation">Pickup Location *</label>
                        <input type="text" id="pickupLocation" required placeholder="Enter pickup address">
                    </div>
                    <div class="form-group">
                        <label for="dropoffLocation">Dropoff Location *</label>
                        <input type="text" id="dropoffLocation" required placeholder="Enter dropoff address">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="pickupDate">Pickup Date *</label>
                        <input type="date" id="pickupDate" required>
                    </div>
                    <div class="form-group">
                        <label for="pickupTime">Pickup Time *</label>
                        <input type="time" id="pickupTime" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="passengers">Number of Passengers *</label>
                        <select id="passengers" required>
                            <option value="1">1 Passenger</option>
                            <option value="2">2 Passengers</option>
                            <option value="3">3 Passengers</option>
                            <option value="4">4 Passengers</option>
                            <option value="5+">5+ Passengers</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="customerName">Your Name *</label>
                        <input type="text" id="customerName" required placeholder="Enter your name">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="customerPhone">Phone Number *</label>
                        <input type="tel" id="customerPhone" required placeholder="Enter your phone">
                    </div>
                    <div class="form-group">
                        <label for="customerEmail">Email Address *</label>
                        <input type="email" id="customerEmail" required placeholder="Enter your email">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="specialRequests">Special Requests (Optional)</label>
                    <textarea id="specialRequests" rows="3" placeholder="Any special requirements or notes..."></textarea>
                </div>
                
                <div class="price-display">
                    <span>Estimated Fare:</span>
                    <span id="estimatedPrice" class="price-amount">$0.00</span>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="closeBookingModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Confirm Booking</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set minimum date to today
    const dateInput = document.getElementById('pickupDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
    
    // Set default time to current time + 1 hour
    const timeInput = document.getElementById('pickupTime');
    const now = new Date();
    now.setHours(now.getHours() + 1);
    timeInput.value = now.toTimeString().slice(0, 5);
}

function openBookingModal(serviceType, servicePrice) {
    let modal = document.getElementById('bookingModal');
    if (!modal) {
        createBookingModal();
        modal = document.getElementById('bookingModal');
    }
    
    AppData.currentBooking = { serviceType, servicePrice };
    
    document.getElementById('modalServiceTitle').textContent = `Book ${serviceType}`;
    document.getElementById('estimatedPrice').textContent = `$${servicePrice}.00`;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Initialize form handler
    const form = document.getElementById('bookingForm');
    form.onsubmit = handleBookingSubmit;
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('bookingForm').reset();
    }
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const pickupLocation = document.getElementById('pickupLocation').value.trim();
    const dropoffLocation = document.getElementById('dropoffLocation').value.trim();
    const pickupDate = document.getElementById('pickupDate').value;
    const pickupTime = document.getElementById('pickupTime').value;
    const passengers = document.getElementById('passengers').value;
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const specialRequests = document.getElementById('specialRequests').value.trim();
    
    // Validation
    if (!pickupLocation || !dropoffLocation) {
        showMessage('Please enter both pickup and dropoff locations', 'error');
        return;
    }
    
    if (!customerName || customerName.length < 2) {
        showMessage('Please enter a valid name', 'error');
        return;
    }
    
    if (!validatePhone(customerPhone)) {
        showMessage('Please enter a valid phone number', 'error');
        return;
    }
    
    if (!validateEmail(customerEmail)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Create booking
    const booking = {
        id: generateId(),
        serviceType: AppData.currentBooking.serviceType,
        price: AppData.currentBooking.servicePrice,
        pickupLocation,
        dropoffLocation,
        pickupDate,
        pickupTime,
        passengers,
        customerName,
        customerPhone,
        customerEmail,
        specialRequests,
        status: 'confirmed',
        bookedAt: new Date().toISOString()
    };
    
    AppData.bookings.push(booking);
    
    console.log('Booking Confirmed:', booking);
    console.log('All Bookings:', AppData.bookings);
    
    showMessage(`Booking confirmed! Your ${booking.serviceType} is scheduled for ${formatDate(pickupDate)}`);
    closeBookingModal();
}

// Make closeBookingModal globally accessible
window.closeBookingModal = closeBookingModal;

function initBookingButtons() {
    const serviceData = {
        'Standard Ride': 25,
        'Secure VIP Ride': 75,
        'Airport Transfer': 50,
        'Women & Family Safe Ride': 30
    };
    
    document.querySelectorAll('.service-item .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceItem = btn.closest('.service-item');
            const serviceTitle = serviceItem.querySelector('h3').textContent;
            const servicePrice = serviceData[serviceTitle] || 50;
            
            openBookingModal(serviceTitle, servicePrice);
        });
    });
}

// ============================================
// ANIMATION ON SCROLL
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .service-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// DATA EXPORT/IMPORT (Console Commands)
// ============================================

window.exportData = function() {
    console.log('=== IRONRIDE DATA EXPORT ===');
    console.log('Bookings:', AppData.bookings);
    console.log('Contact Messages:', AppData.contactMessages);
    console.log('Job Applications:', AppData.jobApplications);
    console.log('Export completed at:', new Date().toISOString());
    return AppData;
};

window.clearData = function() {
    if (confirm('Are you sure you want to clear all data?')) {
        AppData.bookings = [];
        AppData.contactMessages = [];
        AppData.jobApplications = [];
        console.log('All data cleared');
        showMessage('All data has been cleared');
    }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚗 IronRide Application Initialized');
    console.log('Available commands: exportData(), clearData()');
    
    // Initialize all modules
    initNavigation();
    initContactForm();
    initJobApplicationForm();
    initBookingButtons();
    initScrollAnimations();
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('bookingModal');
        if (modal && e.target === modal) {
            closeBookingModal();
        }
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBookingModal();
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    
    .booking-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        z-index: 9999;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        overflow-y: auto;
    }
    
    .booking-modal-content {
        background: #1a1a1a;
        border: 1px solid #2c2c2c;
        border-radius: 12px;
        max-width: 700px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        animation: modalSlideIn 0.3s ease-out;
    }
    
    @keyframes modalSlideIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    .booking-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid #2c2c2c;
    }
    
    .booking-modal-header h2 {
        margin: 0;
        color: #f0f0f0;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: #a0a0a0;
        font-size: 2rem;
        cursor: pointer;
        transition: color 0.3s;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-close:hover {
        color: #f0f0f0;
    }
    
    .booking-form {
        padding: 2rem;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .price-display {
        background: #0d0d0d;
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #2c2c2c;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 2rem 0;
        font-size: 1.2rem;
    }
    
    .price-amount {
        color: #007bff;
        font-weight: 700;
        font-size: 1.5rem;
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
    }
    
    .btn-secondary {
        padding: 0.8rem 2rem;
        border: 1px solid #2c2c2c;
        border-radius: 5px;
        background: transparent;
        color: #a0a0a0;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 500;
        font-family: 'Inter', sans-serif;
    }
    
    .btn-secondary:hover {
        background: #2c2c2c;
        color: #f0f0f0;
    }
    
    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .booking-modal-content {
            margin: 1rem;
        }
        
        .booking-form {
            padding: 1.5rem;
        }
    }
`;
document.head.appendChild(style);