// document.addEventListener('DOMContentLoaded', () => {

//     const pageId = document.body.id;
//     let siteData = null; // To store fetched data

//     // --- HELPER FUNCTIONS ---

//     // Fetch data from JSON
//     async function getSiteData() {
//         if (!siteData) {
//             try {
//                 const response = await fetch('data.json');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 siteData = await response.json();
//             } catch (error) {
//                 console.error("Could not fetch site data:", error);
//             }
//         }
//         return siteData;
//     }

//     // Show a notification toast
//     function showToast(message) {
//         const toast = document.getElementById('toast-notification');
//         if (toast) {
//             toast.textContent = message;
//             toast.classList.add('show');
//             setTimeout(() => {
//                 toast.classList.remove('show');
//             }, 3000); // Hide after 3 seconds
//         } else {
//             // Fallback for pages without the toast element
//             console.log("Toast message:", message);
//         }
//     }


//     // --- DYNAMIC CONTENT POPULATION ---

//     // Populate team members on the homepage
//     async function populateTeam() {
//         const data = await getSiteData();
//         if (!data || !data.team) return;

//         const container = document.getElementById('team-container');
//         if (!container) return;

//         container.innerHTML = ''; // Clear existing
//         data.team.forEach(member => {
//             const card = document.createElement('div');
//             card.className = 'card team-member-card';
//             card.innerHTML = `
//                 <img src="${member.img}" alt="${member.name}">
//                 <h3>${member.name}</h3>
//                 <p>${member.title}</p>
//             `;
//             container.appendChild(card);
//         });
//     }

//     // Populate services on the services page
//     async function populateServices() {
//         const data = await getSiteData();
//         if (!data || !data.services) return;

//         const container = document.getElementById('services-container');
//         if (!container) return;

//         container.innerHTML = ''; // Clear existing
//         data.services.forEach(service => {
//             const item = document.createElement('div');
//             item.className = 'service-item';
//             item.innerHTML = `
//                 <img src="${service.img}" alt="${service.name}">
//                 <div class="service-text">
//                     <h3>${service.name}</h3>
//                     <p>${service.description}</p>
//                     <a href="booking.html" class="btn">Book Now</a>
//                 </div>
//             `;
//             container.appendChild(item);
//         });
//     }

//     // Populate testimonials on the safety page
//     async function populateTestimonials() {
//         const data = await getSiteData();
//         if (!data || !data.testimonials) return;

//         const container = document.getElementById('testimonials-container');
//         if (!container) return;

//         container.innerHTML = ''; // Clear existing
//         data.testimonials.forEach(testimonial => {
//             const card = document.createElement('div');
//             card.className = 'card testimonial-card';
//             card.innerHTML = `
//                 <img src="${testimonial.img}" alt="${testimonial.name}">
//                 <h3>${testimonial.name}</h3>
//                 <p>"${testimonial.quote}"</p>
//             `;
//             container.appendChild(card);
//         });
//     }


//     // --- FORM HANDLING ---

// //     // Handle booking form submission
// //     function handleBookingForm() {
// //         const form = document.getElementById('booking-form');
// //         if (!form) return;

// //         form.addEventListener('submit', async (e) => {
// //             e.preventDefault();

// //             const formData = new FormData(form);
// //             const bookingDetails = {
// //                 id: Date.now(),
// //                 name: formData.get('name'),
// //                 phone: formData.get('phone'),
// //                 pickup: formData.get('pickup'),
// //                 dropoff: formData.get('dropoff'),
// //                 date: formData.get('date'),
// //                 time: formData.get('time'),
// //                 service: formData.get('service-type')
// //             };

// //             // Persist locally so UI is responsive
// //             let bookings = JSON.parse(localStorage.getItem('ironRideBookings')) || [];
// //             bookings.push(bookingDetails);
// //             try {
// //                 localStorage.setItem('ironRideBookings', JSON.stringify(bookings));
// //                 showToast('Booking saved locally — confirming...');
// //                 form.reset();
// //             } catch (error) {
// //                 console.error('Error saving to localStorage:', error);
// //                 showToast('Booking failed. Please try again.');
// //                 return;
// //             }

// //             // Simulate server processing and show response in console (no backend)
// //             // small random delay to mimic network/processing time
// //             const delay = 600 + Math.floor(Math.random() * 1000);
// //             await new Promise(resolve => setTimeout(resolve, delay));

// //             const simulatedResponse = {
// //                 status: 'confirmed',
// //                 bookingId: 'IR' + bookingDetails.id,
// //                 receivedAt: new Date().toISOString(),
// //                 booking: bookingDetails
// //             };

// //             // evaluator can see this in browser console
// //             console.log('Simulated server response:', simulatedResponse);


// //             showToast(`Booking confirmed — ID ${simulatedResponse.bookingId}`);
// //         });
// //     }

// //     async function handleBookingSubmit(e) {
// //     e.preventDefault();
// //     const form = e.target;
// //     const formData = new FormData(form);
// //     const submitButton = form.querySelector('button[type="submit"]');
// //     submitButton.disabled = true;
// //     submitButton.textContent = 'Processing...';

// //     const bookingData = {
// //         serviceType: AppData.currentBooking?.serviceType,
// //         customerName: formData.get('customerName'),
// //         customerEmail: formData.get('customerEmail'),
// //         customerPhone: formData.get('customerPhone'),
// //         pickupLocation: formData.get('pickupLocation'),
// //         dropoffLocation: formData.get('dropoffLocation'),
// //         pickupDate: formData.get('pickupDate'),
// //         pickupTime: formData.get('pickupTime'),
// //         passengers: parseInt(formData.get('passengers')),
// //         specialRequests: formData.get('specialRequests'),
// //         estimatedPrice: AppData.currentBooking?.servicePrice
// //     };
// //     console.log("",bookingData);
// //     try {
// //         const response = await fetch(`api/bookings`, {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify(bookingData)
// //         });
// //         const result = await response.json();
// //         if (result.success) {
// //             showMessage('Booking confirmed! We will contact you shortly.');
// //             closeBookingModal();
// //         } else {
// //             showMessage(result.message || 'Booking failed. Please check your details.', 'error');
// //         }
// //     } catch (error) {
// //         showMessage('Network error. Could not connect to server.', 'error');
// //     } finally {
// //         submitButton.disabled = false;
// //         submitButton.textContent = 'Confirm Booking';
// //     }
// // }

// /* ---------------------------
//    Helpers
// ---------------------------- */
// function showToast(msg) {
//     console.log("Toast:", msg);
// }

// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// /* ---------------------------
//    Unified Booking Handler
// ---------------------------- */
// async function handleBookingSubmit(e) {
//     e.preventDefault();

//     const form = e.target;
//     const formData = new FormData(form);
//     const submitButton = form.querySelector('button[type="submit"]');

//     // Disable button while processing
//     submitButton.disabled = true;
//     submitButton.textContent = 'Processing...';

//     // Build booking object
//     const bookingData = {
//         id: Date.now(),
//         serviceType: AppData.currentBooking?.serviceType || formData.get('service-type'),
//         customerName: formData.get('customerName') || formData.get('name'),
//         customerEmail: formData.get('customerEmail'),
//         customerPhone: formData.get('customerPhone') || formData.get('phone'),
//         pickupLocation: formData.get('pickupLocation') || formData.get('pickup'),
//         dropoffLocation: formData.get('dropoffLocation') || formData.get('dropoff'),
//         pickupDate: formData.get('pickupDate') || formData.get('date'),
//         pickupTime: formData.get('pickupTime') || formData.get('time'),
//         passengers: parseInt(formData.get('passengers')) || 1,
//         specialRequests: formData.get('specialRequests'),
//         estimatedPrice: AppData.currentBooking?.servicePrice || 0
//     };

//     console.log("Booking Data:", bookingData);

//     /* ---------------------------
//        1️⃣ Save locally first
//     ---------------------------- */
//     try {
//         const bookings = JSON.parse(localStorage.getItem('ironRideBookings')) || [];
//         bookings.push(bookingData);

//         localStorage.setItem('ironRideBookings', JSON.stringify(bookings));
//         showToast('Booking saved locally — confirming...');
//         form.reset();
//     } catch (error) {
//         console.error('Local save error:', error);
//         showToast('Booking failed. Please try again.');
//         resetButton(submitButton);
//         return;
//     }

//     /* ---------------------------
//        2️⃣ Try backend API
//     ---------------------------- */
//     try {
//         const response = await fetch(`api/bookings`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(bookingData)
//         });

//         const result = await response.json();

//         if (!result.success) {
//             showToast(result.message || 'Server rejected booking.', 'error');
//             resetButton(submitButton);
//             return;
//         }

//         showToast(`Booking confirmed — ID ${result.bookingId}`);
//         closeBookingModal?.();

//     } catch (error) {
//         /* ---------------------------
//            3️⃣ If no backend → simulate
//         ---------------------------- */
//         console.warn("API unavailable — using simulated server.");

//         await delay(600 + Math.random() * 1000);

//         const simulatedResponse = {
//             status: 'confirmed',
//             bookingId: 'IR' + bookingData.id,
//             receivedAt: new Date().toISOString()
//         };

//         console.log("Simulated server response:", simulatedResponse);

//         showToast(`Booking confirmed — ID ${simulatedResponse.bookingId}`);
//     }

//     resetButton(submitButton);
// }

// /* ---------------------------
//    Re-enable button
// ---------------------------- */
// function resetButton(btn) {
//     btn.disabled = false;
//     btn.textContent = 'Confirm Booking';
// }

// /* ---------------------------
//    Attach listener on page load
// ---------------------------- */
// function initBookingForm() {
//     const form = document.getElementById('booking-form');
//     if (form) {
//         form.addEventListener('submit', handleBookingSubmit);
//     }
// }

// document.addEventListener('DOMContentLoaded', initBookingForm);


//     // small helper to simulate server ack and log to console (used by forms)
//     async function simulateLocalSave(kind, details) {
//         // persist under a kind-specific localStorage key
//         const key = `ironRide${kind.charAt(0).toUpperCase() + kind.slice(1)}`;
//         const items = JSON.parse(localStorage.getItem(key)) || [];
//         items.push(details);
//         localStorage.setItem(key, JSON.stringify(items));

//         // mimic async server processing
//         const delay = 400 + Math.floor(Math.random() * 900);
//         await new Promise(r => setTimeout(r, delay));

//         const resp = {
//             status: 'received',
//             kind,
//             id: kind === 'bookings' ? 'IR' + details.id : (kind.slice(0,3).toUpperCase() + Date.now()),
//             receivedAt: new Date().toISOString(),
//             payload: details
//         };

//         // evaluator can inspect browser console to see that the data was received
//         console.log(`Simulated ${kind} server response:`, resp);
//         return resp;
//     }

//     // Handle contact form submission (simulation + local save + console response)
//     function handleContactForm() {
//         const form = document.getElementById('contact-form');
//         if (!form) return;

//         form.addEventListener('submit', async (e) => {
//             e.preventDefault();

//             const formData = new FormData(form);
//             const contact = {
//                 id: Date.now(),
//                 name: formData.get('name'),
//                 email: formData.get('email'),
//                 message: formData.get('message'),
//                 submittedAt: new Date().toISOString()
//             };

//             try {
//                 showToast('Saving contact locally...');
//                 // simulate local save + server ack
//                 const resp = await simulateLocalSave('contacts', contact);
//                 showToast('Message received — thank you!');
//                 form.reset();
//                 // log extra info for evaluator
//                 console.log('Contact saved locally (localStorage key: ironRideContacts):', contact);
//                 console.log('Simulated server ack:', resp);
//             } catch (err) {
//                 console.error('Contact save failed:', err);
//                 showToast('Failed to submit message. Try again.');
//             }
//         });
//     }

//     // Handle join form submission (simulation + local save + console response)
//     function handleJoinForm() {
//         const form = document.getElementById('join-form');
//         if (!form) return;

//         form.addEventListener('submit', async (e) => {
//             e.preventDefault();

//             const formData = new FormData(form);
//             const application = {
//                 id: Date.now(),
//                 name: formData.get('name'),
//                 phone: formData.get('phone'),
//                 email: formData.get('email'),
//                 experience: formData.get('experience'),
//                 resumeText: formData.get('resume') || null,
//                 appliedAt: new Date().toISOString()
//             };

//             try {
//                 showToast('Saving application locally...');
//                 const resp = await simulateLocalSave('applications', application);
//                 showToast('Application submitted. We will contact you.');
//                 form.reset();
//                 console.log('Application saved locally (localStorage key: ironRideApplications):', application);
//                 console.log('Simulated server ack:', resp);
//             } catch (err) {
//                 console.error('Application save failed:', err);
//                 showToast('Failed to submit application. Try again.');
//             }
//         });
//     }


//     // --- PAGE-SPECIFIC INITIALIZATION ---

//     // Run functions based on which page is loaded
//     switch (pageId) {
//         case 'home-page':
//             populateTeam();
//             break;
//         case 'services-page':
//             populateServices();
//             break;
//         case 'safety-page':
//             populateTestimonials();
//             break;
//         case 'booking-page':
//             handleBookingForm();
//             break;
//         case 'contact-page':
//             handleContactForm();
//             break;
//         case 'join-page':
//             handleJoinForm();
//             break;
//     }
// });

// (function(){
//     const dateInput = document.getElementById('date');
//     const timeInput = document.getElementById('time');
//     const form = document.getElementById('booking-form');

//     function pad(n){ return n < 10 ? '0' + n : String(n); }

//     function setMinDate(){
//         const now = new Date();
//         const y = now.getFullYear(), m = pad(now.getMonth() + 1), d = pad(now.getDate());
//         const todayStr = `${y}-${m}-${d}`;
//         if (dateInput) {
//             dateInput.min = todayStr;
//             if (!dateInput.value) dateInput.value = todayStr;
//         }
//     }

//     function setMinTime(){
//         if (!dateInput || !timeInput) return;
//         const now = new Date();
//         const todayStr = dateInput.min;
//         if (dateInput.value === todayStr) {
//             // set min to now + 30 minutes buffer
//             const minDate = new Date(now.getTime() + 30 * 60000);
//             const hh = pad(minDate.getHours()), mm = pad(minDate.getMinutes());
//             const minTime = `${hh}:${mm}`;
//             timeInput.min = minTime;
//             if (!timeInput.value || timeInput.value < minTime) timeInput.value = minTime;
//         } else {
//             timeInput.min = '00:00';
//         }
//     }

//     // initialize and keep updated
//     if (dateInput && timeInput) {
//         setMinDate();
//         setMinTime();
//         dateInput.addEventListener('change', setMinTime);
//         // update min time every minute when booking for today
//         setInterval(() => {
//             if (dateInput.value === dateInput.min) setMinTime();
//         }, 60000);
//     }

//     // extra submit validation to prevent past datetime
//     if (form) {
//         form.addEventListener('submit', function(e){
//             const now = new Date();
//             const dateVal = dateInput && dateInput.value ? dateInput.value : null;
//             const timeVal = timeInput && timeInput.value ? timeInput.value : '00:00';
//             if (!dateVal) return; // required attribute handles it
//             const picked = new Date(dateVal + 'T' + timeVal);
//             if (picked.getTime() < now.getTime()) {
//                 e.preventDefault();
//                 alert('Pickup date/time cannot be in the past. Please choose a future date/time.');
//                 dateInput.focus();
//                 return;
//             }
//             // ...existing submit handling code continues...
//         });
//     }
// })();

// // API Base URL
// const API_BASE = 'http://localhost:5000/api';

// // Global Data Store
// const AppData = {
//     currentBooking: null,
//     servicePriceMap: {}
// };

// // --- Helper Functions ---
// function showMessage(message, type = 'success') {
//     const toast = document.createElement('div');
//     toast.className = `toast ${type}`;
//     toast.textContent = message;
//     document.body.appendChild(toast);
//     setTimeout(() => toast.remove(), 3000);
// }

// // --- Core Functions ---
// async function loadSiteData() {
//     try {
//         const res = await fetch(`${API_BASE}/sitedata`);
//         const data = await res.json();
//         AppData.siteData = data;
//         renderServices(data.services);
//     } catch (err) {
//         console.error('Failed to load site data', err);
//     }
// }

// function renderServices(services = []) {
//     const list = document.getElementById('services-list');
//     if (!list) return;
//     list.innerHTML = '';
//     services.forEach(svc => {
//         AppData.servicePriceMap[svc.name] = svc.basePrice;
//         const card = document.createElement('article');
//         card.className = 'service-item card';
//         card.innerHTML = `
//             <img src="${svc.image}" alt="${svc.name}" class="service-image">
//             <div class="service-body">
//                 <h3>${svc.name}</h3>
//                 <p class="service-desc">${svc.description}</p>
//                 <div class="service-actions">
//                     <a href="#" class="btn primary book-service-btn">Book Now</a>
//                     <span class="price">$${svc.basePrice}</span>
//                 </div>
//             </div>`;
//         list.appendChild(card);
//     });
// }

// // --- Booking Modal Logic ---
// function createBookingModal() {
//     const existingModal = document.getElementById('bookingModal');
//     if (existingModal) existingModal.remove();

//     const modal = document.createElement('div');
//     modal.id = 'bookingModal';
//     modal.className = 'booking-modal';
//     modal.innerHTML = `
//         <div class="booking-modal-content">
//             <div class="booking-modal-header">
//                 <h2 id="modalServiceTitle">Book Your Ride</h2>
//                 <button class="modal-close" type="button">&times;</button>
//             </div>
//             <form id="bookingForm" class="booking-form">
//                 <div class="form-row">
//                     <div class="form-group"><label for="pickupLocation">Pickup *</label><input type="text" id="pickupLocation" name="pickupLocation" required></div>
//                     <div class="form-group"><label for="dropoffLocation">Dropoff *</label><input type="text" id="dropoffLocation" name="dropoffLocation" required></div>
//                 </div>
//                 <div class="form-row">
//                     <div class="form-group"><label for="pickupDate">Date *</label><input type="date" id="pickupDate" name="pickupDate" required></div>
//                     <div class="form-group"><label for="pickupTime">Time *</label><input type="time" id="pickupTime" name="pickupTime" required></div>
//                 </div>
//                 <div class="form-row">
//                     <div class="form-group"><label for="passengers">Passengers *</label><select id="passengers" name="passengers" required><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
//                     <div class="form-group"><label for="customerName">Name *</label><input type="text" id="customerName" name="customerName" required></div>
//                 </div>
//                 <div class="form-row">
//                     <div class="form-group"><label for="customerPhone">Phone *</label><input type="tel" id="customerPhone" name="customerPhone" required></div>
//                     <div class="form-group"><label for="customerEmail">Email *</label><input type="email" id="customerEmail" name="customerEmail" required></div>
//                 </div>
//                 <div class="form-group"><label for="specialRequests">Special Requests</label><textarea id="specialRequests" name="specialRequests" rows="2"></textarea></div>
//                 <div class="price-display"><span>Fare:</span><span id="estimatedPrice" class="price-amount">$0.00</span></div>
//                 <div class="form-actions"><button type="button" class="btn-secondary close-modal-btn">Cancel</button><button type="submit" class="btn btn-primary">Confirm Booking</button></div>
//             </form>
//         </div>`;
//     document.body.appendChild(modal);

//     // Set default date/time
//     const dateInput = document.getElementById('pickupDate');
//     const timeInput = document.getElementById('pickupTime');
//     if(dateInput) {
//         const today = new Date().toISOString().split('T')[0];
//         dateInput.min = today;
//         dateInput.value = today;
//     }
//     if(timeInput) {
//         const now = new Date();
//         now.setHours(now.getHours() + 1);
//         timeInput.value = now.toTimeString().slice(0, 5);
//     }

//     // Add event listeners
//     modal.querySelector('.modal-close').onclick = closeBookingModal;
//     modal.querySelector('.close-modal-btn').onclick = closeBookingModal;
//     document.getElementById('bookingForm').onsubmit = handleBookingSubmit;
// }

// function openBookingModal(serviceType, servicePrice) {
//     createBookingModal();
//     AppData.currentBooking = { serviceType, servicePrice };
//     document.getElementById('modalServiceTitle').textContent = `Book ${serviceType}`;
//     document.getElementById('estimatedPrice').textContent = `$${servicePrice.toFixed(2)}`;
//     document.getElementById('bookingModal').style.display = 'flex';
//     document.body.style.overflow = 'hidden';
// }

// function closeBookingModal() {
//     const modal = document.getElementById('bookingModal');
//     if (modal) {
//         modal.style.display = 'none';
//         document.body.style.overflow = 'auto';
//     }
// }

// async function handleBookingSubmit(e) {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData(form);
//     const submitButton = form.querySelector('button[type="submit"]');
//     submitButton.disabled = true;
//     submitButton.textContent = 'Processing...';

//     const bookingData = {
//         serviceType: AppData.currentBooking?.serviceType,
//         customerName: formData.get('customerName'),
//         customerEmail: formData.get('customerEmail'),
//         customerPhone: formData.get('customerPhone'),
//         pickupLocation: formData.get('pickupLocation'),
//         dropoffLocation: formData.get('dropoffLocation'),
//         pickupDate: formData.get('pickupDate'),
//         pickupTime: formData.get('pickupTime'),
//         passengers: parseInt(formData.get('passengers')),
//         specialRequests: formData.get('specialRequests'),
//         estimatedPrice: AppData.currentBooking?.servicePrice
//     };
//     console.log("",bookingData);
//     try {
//         const response = await fetch(`api/bookings`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(bookingData)
//         });
//         const result = await response.json();
//         if (result.success) {
//             showMessage('Booking confirmed! We will contact you shortly.');
//             closeBookingModal();
//         } else {
//             showMessage(result.message || 'Booking failed. Please check your details.', 'error');
//         }
//     } catch (error) {
//         showMessage('Network error. Could not connect to server.', 'error');
//     } finally {
//         submitButton.disabled = false;
//         submitButton.textContent = 'Confirm Booking';
//     }
// }

// // --- Initializer ---
// document.addEventListener('DOMContentLoaded', () => {
//     loadSiteData();

//     // Event delegation for booking buttons
//     document.body.addEventListener('click', (e) => {
//         const bookBtn = e.target.closest('.book-service-btn');
//         if (bookBtn) {
//             e.preventDefault();
//             const serviceItem = bookBtn.closest('.service-item');
//             const serviceTitle = serviceItem.querySelector('h3')?.textContent;
//             const servicePrice = AppData.servicePriceMap[serviceTitle] || 0;
//             openBookingModal(serviceTitle, servicePrice);
//         }
//     });
// });

// // Add some basic styles for the toast message
// const style = document.createElement('style');
// style.textContent = `
//     .toast { position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem; border-radius: 8px; color: white; z-index: 10001; }
//     .toast.success { background-color: #28a745; }
//     .toast.error { background-color: #dc3545; }
//     /* Add other styles from your previous app.js if needed */
// `;
// document.head.appendChild(style);



// ironRide app.js — refactored with verbose console logging
(function () {
    console.log('Script start');

    // ---------- Config & Globals ----------
    const API_BASE = 'http://localhost:5000/api';
    const LOCAL_KEYS = {
        bookings: 'ironRideBookings',
        contacts: 'ironRideContacts',
        applications: 'ironRideApplications'
    };

    const AppData = {
        siteData: null,
        currentBooking: null,
        servicePriceMap: {}
    };

    let siteDataCache = null;

    // ---------- Utility helpers ----------
    function logStep(...args) { console.log('[STEP]', ...args); }
    function logDebug(...args) { console.debug('[DEBUG]', ...args); }
    function logWarn(...args) { console.warn('[WARN]', ...args); }
    function logErr(...args) { console.error('[ERROR]', ...args); }

    function showToast(message) {
        logStep('showToast ->', message);
        const toastElem = document.getElementById('toast-notification');
        if (toastElem) {
            toastElem.textContent = message;
            toastElem.classList.add('show');
            setTimeout(() => toastElem.classList.remove('show'), 3000);
        } else {
            // fallback visual toast
            const t = document.createElement('div');
            t.className = 'toast temporary';
            t.textContent = message;
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 3000);
        }
    }

    function showMessage(message, type = 'success') {
        logStep('showMessage ->', message, type);
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ---------- Site data fetch ----------
    async function getSiteData() {
        logStep('getSiteData called');
        if (siteDataCache) {
            logDebug('Returning cached siteData');
            return siteDataCache;
        }
        try {
            logStep('Fetching data.json from server...');
            const res = await fetch('data.json');
            if (!res.ok) throw new Error(`HTTP status ${res.status}`);
            siteDataCache = await res.json();
            logStep('Fetched data.json successfully', siteDataCache);
            return siteDataCache;
        } catch (err) {
            logErr('Failed to fetch data.json:', err);
            return null;
        }
    }

    // ---------- Populate functions ----------
    async function populateTeam() {
        logStep('populateTeam start');
        const data = await getSiteData();
        if (!data || !data.team) {
            logWarn('No team data to populate');
            return;
        }
        const container = document.getElementById('team-container');
        if (!container) {
            logWarn('No #team-container found on page');
            return;
        }
        container.innerHTML = '';
        data.team.forEach(member => {
            logDebug('Adding team member:', member.name);
            const card = document.createElement('div');
            card.className = 'card team-member-card';
            card.innerHTML = `
                <img src="${member.img}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.title}</p>
            `;
            container.appendChild(card);
        });
        logStep('populateTeam completed');
    }

    async function populateServices() {
        logStep('populateServices start');
        const data = await getSiteData();
        if (!data || !data.services) {
            logWarn('No services data to populate');
            return;
        }
        const container = document.getElementById('services-container');
        if (!container) {
            logWarn('No #services-container found on page');
            return;
        }
        container.innerHTML = '';
        data.services.forEach(service => {
            logDebug('Adding service:', service.name);
            const item = document.createElement('div');
            item.className = 'service-item';
            item.innerHTML = `
                <img src="${service.img}" alt="${service.name}">
                <div class="service-text">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <a href="booking.html" class="btn book-service-btn">Book Now</a>
                </div>
            `;
            container.appendChild(item);
        });
        logStep('populateServices completed');
    }

    async function populateTestimonials() {
        logStep('populateTestimonials start');
        const data = await getSiteData();
        if (!data || !data.testimonials) {
            logWarn('No testimonials to populate');
            return;
        }
        const container = document.getElementById('testimonials-container');
        if (!container) {
            logWarn('No #testimonials-container on page');
            return;
        }
        container.innerHTML = '';
        data.testimonials.forEach(t => {
            logDebug('Adding testimonial:', t.name);
            const card = document.createElement('div');
            card.className = 'card testimonial-card';
            card.innerHTML = `
                <img src="${t.img}" alt="${t.name}">
                <h3>${t.name}</h3>
                <p>"${t.quote}"</p>
            `;
            container.appendChild(card);
        });
        logStep('populateTestimonials completed');
    }

    // ---------- Local simulation & saves ----------
    async function simulateLocalSave(kind, details) {
        logStep('simulateLocalSave start', kind, details);
        const key = LOCAL_KEYS[kind] || `ironRide${kind}`;
        const items = JSON.parse(localStorage.getItem(key)) || [];
        items.push(details);
        localStorage.setItem(key, JSON.stringify(items));
        logDebug('Saved to localStorage key:', key, 'count:', items.length);

        const wait = 400 + Math.floor(Math.random() * 900);
        logDebug('Simulating server delay (ms):', wait);
        await delay(wait);

        const resp = {
            status: 'received',
            kind,
            id: (kind === 'bookings') ? 'IR' + details.id : (kind.slice(0, 3).toUpperCase() + Date.now()),
            receivedAt: new Date().toISOString(),
            payload: details
        };
        logStep(`Simulated ${kind} server response:`, resp);
        return resp;
    }

    // ---------- Form handlers ----------
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) {
            logDebug('No contact-form on this page');
            return;
        }
        logStep('Initializing contact form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            logStep('contact-form submit event');
            const fd = new FormData(form);
            const contact = {
                id: Date.now(),
                name: fd.get('name'),
                email: fd.get('email'),
                message: fd.get('message'),
                submittedAt: new Date().toISOString()
            };
            logDebug('Contact payload:', contact);
            try {
                showToast('Saving contact locally...');
                const ack = await simulateLocalSave('contacts', contact);
                showToast('Message received — thank you!');
                form.reset();
                logStep('Contact saved & simulated ack:', ack);
            } catch (err) {
                logErr('Contact save failed:', err);
                showToast('Failed to submit message. Try again.');
            }
        });
    }

    function initJoinForm() {
        const form = document.getElementById('join-form');
        if (!form) {
            logDebug('No join-form on this page');
            return;
        }
        logStep('Initializing join form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            logStep('join-form submit event');
            const fd = new FormData(form);
            const application = {
                id: Date.now(),
                name: fd.get('name'),
                phone: fd.get('phone'),
                email: fd.get('email'),
                experience: fd.get('experience'),
                resumeText: fd.get('resume') || null,
                appliedAt: new Date().toISOString()
            };
            logDebug('Application payload:', application);
            try {
                showToast('Saving application locally...');
                const ack = await simulateLocalSave('applications', application);
                showToast('Application submitted. We will contact you.');
                form.reset();
                logStep('Application saved & simulated ack:', ack);
            } catch (err) {
                logErr('Application save failed:', err);
                showToast('Failed to submit application. Try again.');
            }
        });
    }

    // ---------- Booking form (modal) ----------
    function createBookingModal() {
        logStep('createBookingModal called');
        const existing = document.getElementById('bookingModal');
        if (existing) {
            logDebug('Removing existing booking modal');
            existing.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'bookingModal';
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="booking-modal-content">
                <div class="booking-modal-header">
                    <h2 id="modalServiceTitle">Book Your Ride</h2>
                    <button class="modal-close" type="button">&times;</button>
                </div>
                <form id="bookingForm" class="booking-form">
                    <div class="form-row">
                        <div class="form-group"><label for="pickupLocation">Pickup *</label><input type="text" id="pickupLocation" name="pickupLocation" required></div>
                        <div class="form-group"><label for="dropoffLocation">Dropoff *</label><input type="text" id="dropoffLocation" name="dropoffLocation" required></div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label for="pickupDate">Date *</label><input type="date" id="pickupDate" name="pickupDate" required></div>
                        <div class="form-group"><label for="pickupTime">Time *</label><input type="time" id="pickupTime" name="pickupTime" required></div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label for="passengers">Passengers *</label><select id="passengers" name="passengers" required>
                            <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
                        <div class="form-group"><label for="customerName">Name *</label><input type="text" id="customerName" name="customerName" required></div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label for="customerPhone">Phone *</label><input type="tel" id="customerPhone" name="customerPhone" required></div>
                        <div class="form-group"><label for="customerEmail">Email *</label><input type="email" id="customerEmail" name="customerEmail" required></div>
                    </div>
                    <div class="form-group"><label for="specialRequests">Special Requests</label><textarea id="specialRequests" name="specialRequests" rows="2"></textarea></div>
                    <div class="price-display"><span>Fare:</span><span id="estimatedPrice" class="price-amount">$0.00</span></div>
                    <div class="form-actions"><button type="button" class="btn-secondary close-modal-btn">Cancel</button><button type="submit" class="btn btn-primary">Confirm Booking</button></div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        logDebug('Booking modal appended to DOM');

        // default date/time settings
        const dateInput = modal.querySelector('#pickupDate');
        const timeInput = modal.querySelector('#pickupTime');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today;
            logDebug('pickupDate min & default set to', today);
        }
        if (timeInput) {
            const now = new Date();
            now.setHours(now.getHours() + 1);
            timeInput.value = now.toTimeString().slice(0, 5);
            logDebug('pickupTime default set to', timeInput.value);
        }

        // event bindings
        modal.querySelector('.modal-close').onclick = closeBookingModal;
        modal.querySelector('.close-modal-btn').onclick = closeBookingModal;
        modal.querySelector('#bookingForm').addEventListener('submit', handleBookingSubmit);

        logStep('createBookingModal finished');
    }

    function openBookingModal(serviceType, servicePrice) {
        logStep('openBookingModal called', serviceType, servicePrice);
        createBookingModal();
        AppData.currentBooking = { serviceType, servicePrice };
        const title = document.getElementById('modalServiceTitle');
        const priceElem = document.getElementById('estimatedPrice');
        if (title) title.textContent = `Book ${serviceType}`;
        if (priceElem) priceElem.textContent = `$${servicePrice.toFixed(2)}`;
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            logDebug('Booking modal opened');
        }
    }

    function closeBookingModal() {
        logStep('closeBookingModal called');
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.style.display = 'none';
            modal.remove();
            document.body.style.overflow = 'auto';
            logDebug('Booking modal closed and removed from DOM');
        }
    }

    // ---------- Booking submit logic ----------
//     async function handleBookingSubmit(e) {
//         e.preventDefault();
//         logStep('handleBookingSubmit invoked');

//         const form = e.target;
//         const formData = new FormData(form);
//         const submitButton = form.querySelector('button[type="submit"]');
//         if (submitButton) {
//             submitButton.disabled = true;
//             submitButton.textContent = 'Processing...';
//             logDebug('Submit button disabled & text changed');
//         }

//         const bookingData = {
//             id: Date.now(),
//             serviceType: AppData.currentBooking?.serviceType,
//             customerName: formData.get('customerName'),
//             customerEmail: formData.get('customerEmail'),
//             customerPhone: formData.get('customerPhone'),
//             pickupLocation: formData.get('pickupLocation'),
//             dropoffLocation: formData.get('dropoffLocation'),
//             pickupDate: formData.get('pickupDate'),
//             pickupTime: formData.get('pickupTime'),
//             passengers: parseInt(formData.get('passengers')) || 1,
//             specialRequests: formData.get('specialRequests'),
//             estimatedPrice: AppData.currentBooking?.servicePrice || 0
//         };

//         logDebug('Built bookingData:', bookingData);

//         // Save locally first
//         try {
//             const bookings = JSON.parse(localStorage.getItem(LOCAL_KEYS.bookings)) || [];
//             bookings.push(bookingData);
//             localStorage.setItem(LOCAL_KEYS.bookings, JSON.stringify(bookings));
//             showToast('Booking saved locally — confirming...');
//             form.reset();
//             logStep('Booking saved to localStorage', LOCAL_KEYS.bookings);
//         } catch (err) {
//             logErr('Local save error:', err);
//             showToast('Booking failed. Please try again.');
//             if (submitButton) {
//                 submitButton.disabled = false;
//                 submitButton.textContent = 'Confirm Booking';
//             }
//             return;
//         }

//         // Try backend API
//         try {
//             logStep('Attempting to POST to backend', `${API_BASE}/bookings`);
//             const resp = await fetch('http://localhost:5000/api/bookings', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(bookingData)
// });

//             logDebug('Raw response from API:', resp);
//             const result = await resp.json();
//             logDebug('Parsed JSON from API:', result);

//             if (result && result.success) {
//                 showMessage('Booking confirmed! We will contact you shortly.');
//                 logStep('Backend confirmed booking', result.bookingId || result.id);
//                 closeBookingModal();
//             } else {
//                 logWarn('Backend rejected booking or returned failure', result);
//                 showMessage(result?.message || 'Booking failed. Please check your details.', 'error');
//             }
//         } catch (err) {
//             logWarn('Network/API error — will simulate response', err);
//             // fallback simulation
//             const simulatedDelay = 600 + Math.floor(Math.random() * 1000);
//             logDebug('Simulated delay (ms):', simulatedDelay);
//             await delay(simulatedDelay);
//             const simulatedResponse = {
//                 status: 'confirmed',
//                 bookingId: 'IR' + bookingData.id,
//                 receivedAt: new Date().toISOString(),
//                 booking: bookingData
//             };
//             console.log('Simulated server response:', simulatedResponse);
//             showToast(`Booking confirmed — ID ${simulatedResponse.bookingId}`);
//             logStep('Simulated booking response returned');
//         } finally {
//             if (submitButton) {
//                 submitButton.disabled = false;
//                 submitButton.textContent = 'Confirm Booking';
//                 logDebug('Submit button reset');
//             }
//         }
//     }
async function handleBookingSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const fd = new FormData(form);

    document.getElementById("hiddenServiceType").value =
        fd.get("service-type") || "General Ride";

    const bookingData = {
        serviceType: fd.get("service-type") || "General Ride",
        customerName: fd.get("name"),
        customerPhone: fd.get("phone"),
        customerEmail: "notprovided@ironride.com", // optional fallback
        pickupLocation: fd.get("pickup"),
        dropoffLocation: fd.get("dropoff"),
        pickupDate: fd.get("date"),
        pickupTime: fd.get("time"),
        passengers: 1,
        specialRequests: "",
        estimatedPrice: 0
    };

    console.log("🔥 Final bookingData:", bookingData);

    const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
    });

    const result = await response.json();
    console.log("📥 Backend response:", result);

    if (result.success) {
        showToast("Booking Confirmed!");
        form.reset();
    } else {
        showToast(result.message || "Booking failed");
    }
}

    // ---------- Date & time helpers (standalone, for inline forms) ----------
    function initDateTimeConstraints() {
        logStep('initDateTimeConstraints start');
        const dateInput = document.getElementById('date') || document.getElementById('pickupDate');
        const timeInput = document.getElementById('time') || document.getElementById('pickupTime');
        const bookingForm = document.getElementById('booking-form') || document.getElementById('bookingForm');

        function pad(n) { return n < 10 ? '0' + n : String(n); }

        function setMinDate() {
            const now = new Date();
            const y = now.getFullYear(), m = pad(now.getMonth() + 1), d = pad(now.getDate());
            const todayStr = `${y}-${m}-${d}`;
            if (dateInput) {
                dateInput.min = todayStr;
                if (!dateInput.value) dateInput.value = todayStr;
                logDebug('Date input min set to', todayStr);
            }
        }

        function setMinTime() {
            if (!dateInput || !timeInput) return;
            const now = new Date();
            const todayStr = dateInput.min;
            if (dateInput.value === todayStr) {
                const minDate = new Date(now.getTime() + 30 * 60000);
                const hh = pad(minDate.getHours()), mm = pad(minDate.getMinutes());
                const minTime = `${hh}:${mm}`;
                timeInput.min = minTime;
                if (!timeInput.value || timeInput.value < minTime) timeInput.value = minTime;
                logDebug('Time input min set to', minTime);
            } else {
                timeInput.min = '00:00';
                logDebug('Time input min reset to 00:00');
            }
        }

        if (dateInput && timeInput) {
            setMinDate();
            setMinTime();
            dateInput.addEventListener('change', () => {
                logDebug('Date input changed to', dateInput.value);
                setMinTime();
            });
            setInterval(() => {
                if (dateInput.value === dateInput.min) setMinTime();
            }, 60000);
            logStep('Date/time constraints initialized');
        } else {
            logDebug('No date/time inputs present on page');
        }

        if (bookingForm && dateInput && timeInput) {
            bookingForm.addEventListener('submit', function (evt) {
                logStep('Inline bookingForm submit validation start');
                const now = new Date();
                const dateVal = dateInput.value;
                const timeVal = timeInput.value || '00:00';
                if (!dateVal) {
                    logWarn('No date value; letting required attribute handle it');
                    return;
                }
                const picked = new Date(dateVal + 'T' + timeVal);
                if (picked.getTime() < now.getTime()) {
                    evt.preventDefault();
                    alert('Pickup date/time cannot be in the past. Please choose a future date/time.');
                    dateInput.focus();
                    logWarn('User attempted to submit past date/time', picked, now);
                    return;
                }
                logStep('Inline bookingForm validation passed');
            });
        }
    }

    // ---------- Services rendering from API ----------
    async function loadSiteDataFromApi() {
        logStep('loadSiteDataFromApi start');
        try {
            const res = await fetch(`${API_BASE}/sitedata`);
            if (!res.ok) throw new Error('Site data API failed: ' + res.status);
            const data = await res.json();
            AppData.siteData = data;
            logDebug('Site data loaded from API:', data);
            renderServices(data.services);
        } catch (err) {
            logErr('Failed to load site data from API:', err);
            // fallback: try local data.json
            const local = await getSiteData();
            if (local && local.services) {
                logDebug('Falling back to data.json for services');
                renderServices(local.services);
            }
        }
    }

    function renderServices(services = []) {
        logStep('renderServices called, count:', services.length);
        const list = document.getElementById('services-list') || document.getElementById('services-container');
        if (!list) {
            logWarn('No services list/container found');
            return;
        }
        list.innerHTML = '';
        services.forEach(svc => {
            logDebug('Rendering service card:', svc.name, svc.basePrice);
            AppData.servicePriceMap[svc.name] = svc.basePrice || 0;
            const card = document.createElement('article');
            card.className = 'service-item card';
            card.innerHTML = `
                <img src="${svc.image || svc.img}" alt="${svc.name}" class="service-image">
                <div class="service-body">
                    <h3>${svc.name}</h3>
                    <p class="service-desc">${svc.description}</p>
                    <div class="service-actions">
                        <a href="#" class="btn primary book-service-btn">Book Now</a>
                        <span class="price">$${(svc.basePrice || 0).toFixed(2)}</span>
                    </div>
                </div>`;
            list.appendChild(card);
        });
        logStep('renderServices completed');
    }

    // ---------- Event delegation & initialization ----------
    function initDelegation() {
        logStep('initDelegation: attaching body click handler for .book-service-btn');
        document.body.addEventListener('click', (e) => {
            const bookBtn = e.target.closest('.book-service-btn');
            if (bookBtn) {
                e.preventDefault();
                logStep('.book-service-btn clicked');
                const serviceItem = bookBtn.closest('.service-item');
                const serviceTitle = serviceItem?.querySelector('h3')?.textContent;
                const servicePrice = AppData.servicePriceMap[serviceTitle] || 0;
                logDebug('Service selected:', serviceTitle, servicePrice);
                openBookingModal(serviceTitle || 'Service', servicePrice);
            }
        });
    }

    async function pageSpecificInit() {
        logStep('pageSpecificInit running');
        const pageId = document.body.id;
        logDebug('Detected pageId:', pageId);

        // common initializers
        initDateTimeConstraints();
        initContactForm();
        initJoinForm();
        initDelegation();

        // page-based
        switch (pageId) {
            case 'home-page':
                logStep('Initializing home page');
                populateTeam();
                break;
            case 'services-page':
                logStep('Initializing services page');
                populateServices();
                // additionally try API load for dynamic list
                loadSiteDataFromApi();
                break;
            case 'safety-page':
                logStep('Initializing safety page');
                populateTestimonials();
                break;
            case 'booking-page':
                logStep('Initializing booking page (inline booking form)');
                // if there is an inline #booking-form, attach its submit behavior
                const inlineForm = document.getElementById('booking-form');
                if (inlineForm) {
                    logDebug('Attaching inline booking form submit handler to #booking-form');
                    inlineForm.addEventListener('submit', handleBookingSubmit);
                } else {
                    logDebug('No inline booking form found');
                }
                break;
            case 'contact-page':
                logStep('Contact page found - contact form already initialized');
                break;
            case 'join-page':
                logStep('Join page found - join form already initialized');
                break;
            default:
                logDebug('No page-specific initializers matched');
        }
        logStep('pageSpecificInit finished');
    }

    // ---------- Attach global styles for toast (non-destructive) ----------
    function injectStyles() {
        logStep('Injecting basic toast styles');
        const style = document.createElement('style');
        style.textContent = `
            .toast { position: fixed; top: 20px; right: 20px; padding: 0.8rem 1.2rem; border-radius: 8px; color: white; z-index: 10001; font-family: sans-serif; }
            .toast.success { background-color: #28a745; }
            .toast.error { background-color: #dc3545; }
            .toast.temporary { background-color: rgba(0,0,0,0.8); }
            #toast-notification.show { opacity: 1; transition: opacity 0.2s; }
            .booking-modal { position: fixed; inset: 0; display: none; align-items: center; justify-content: center; background: rgba(0,0,0,0.4); z-index: 10000; }
            .booking-modal-content { width: 90%; max-width: 720px; background: #fff; padding: 1rem; border-radius: 8px; }
        `;
        document.head.appendChild(style);
    }

    // ---------- DOMContentLoaded ----------
    document.addEventListener('DOMContentLoaded', async () => {
        logStep('DOMContentLoaded fired');
        injectStyles();
        await pageSpecificInit();
        logStep('All initializers run');
    });

    // ---------- Script end ----------
    console.log('Script initialization complete (deferred until DOMContentLoaded)');
})();
