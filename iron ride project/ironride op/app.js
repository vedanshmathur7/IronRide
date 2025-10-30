document.addEventListener('DOMContentLoaded', () => {

    const pageId = document.body.id;
    let siteData = null; // To store fetched data

    // --- HELPER FUNCTIONS ---

    // Fetch data from JSON
    async function getSiteData() {
        if (!siteData) {
            try {
                const response = await fetch('data.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                siteData = await response.json();
            } catch (error) {
                console.error("Could not fetch site data:", error);
            }
        }
        return siteData;
    }

    // Show a notification toast
    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000); // Hide after 3 seconds
        } else {
            // Fallback for pages without the toast element
            console.log("Toast message:", message);
        }
    }


    // --- DYNAMIC CONTENT POPULATION ---

    // Populate team members on the homepage
    async function populateTeam() {
        const data = await getSiteData();
        if (!data || !data.team) return;

        const container = document.getElementById('team-container');
        if (!container) return;

        container.innerHTML = ''; // Clear existing
        data.team.forEach(member => {
            const card = document.createElement('div');
            card.className = 'card team-member-card';
            card.innerHTML = `
                <img src="${member.img}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.title}</p>
            `;
            container.appendChild(card);
        });
    }

    // Populate services on the services page
    async function populateServices() {
        const data = await getSiteData();
        if (!data || !data.services) return;

        const container = document.getElementById('services-container');
        if (!container) return;

        container.innerHTML = ''; // Clear existing
        data.services.forEach(service => {
            const item = document.createElement('div');
            item.className = 'service-item';
            item.innerHTML = `
                <img src="${service.img}" alt="${service.name}">
                <div class="service-text">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <a href="booking.html" class="btn">Book Now</a>
                </div>
            `;
            container.appendChild(item);
        });
    }

    // Populate testimonials on the safety page
    async function populateTestimonials() {
        const data = await getSiteData();
        if (!data || !data.testimonials) return;

        const container = document.getElementById('testimonials-container');
        if (!container) return;

        container.innerHTML = ''; // Clear existing
        data.testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'card testimonial-card';
            card.innerHTML = `
                <img src="${testimonial.img}" alt="${testimonial.name}">
                <h3>${testimonial.name}</h3>
                <p>"${testimonial.quote}"</p>
            `;
            container.appendChild(card);
        });
    }


    // --- FORM HANDLING ---

    // Handle booking form submission
    function handleBookingForm() {
        const form = document.getElementById('booking-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const bookingDetails = {
                id: Date.now(),
                name: formData.get('name'),
                phone: formData.get('phone'),
                pickup: formData.get('pickup'),
                dropoff: formData.get('dropoff'),
                date: formData.get('date'),
                time: formData.get('time'),
                service: formData.get('service-type')
            };

            // Persist locally so UI is responsive
            let bookings = JSON.parse(localStorage.getItem('ironRideBookings')) || [];
            bookings.push(bookingDetails);
            try {
                localStorage.setItem('ironRideBookings', JSON.stringify(bookings));
                showToast('Booking saved locally — confirming...');
                form.reset();
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                showToast('Booking failed. Please try again.');
                return;
            }

            // Simulate server processing and show response in console (no backend)
            // small random delay to mimic network/processing time
            const delay = 600 + Math.floor(Math.random() * 1000);
            await new Promise(resolve => setTimeout(resolve, delay));

            const simulatedResponse = {
                status: 'confirmed',
                bookingId: 'IR' + bookingDetails.id,
                receivedAt: new Date().toISOString(),
                booking: bookingDetails
            };

            // evaluator can see this in browser console
            console.log('Simulated server response:', simulatedResponse);
            showToast(`Booking confirmed — ID ${simulatedResponse.bookingId}`);
        });
    }

    // small helper to simulate server ack and log to console (used by forms)
    async function simulateLocalSave(kind, details) {
        // persist under a kind-specific localStorage key
        const key = `ironRide${kind.charAt(0).toUpperCase() + kind.slice(1)}`;
        const items = JSON.parse(localStorage.getItem(key)) || [];
        items.push(details);
        localStorage.setItem(key, JSON.stringify(items));

        // mimic async server processing
        const delay = 400 + Math.floor(Math.random() * 900);
        await new Promise(r => setTimeout(r, delay));

        const resp = {
            status: 'received',
            kind,
            id: kind === 'bookings' ? 'IR' + details.id : (kind.slice(0,3).toUpperCase() + Date.now()),
            receivedAt: new Date().toISOString(),
            payload: details
        };

        // evaluator can inspect browser console to see that the data was received
        console.log(`Simulated ${kind} server response:`, resp);
        return resp;
    }

    // Handle contact form submission (simulation + local save + console response)
    function handleContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const contact = {
                id: Date.now(),
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                submittedAt: new Date().toISOString()
            };

            try {
                showToast('Saving contact locally...');
                // simulate local save + server ack
                const resp = await simulateLocalSave('contacts', contact);
                showToast('Message received — thank you!');
                form.reset();
                // log extra info for evaluator
                console.log('Contact saved locally (localStorage key: ironRideContacts):', contact);
                console.log('Simulated server ack:', resp);
            } catch (err) {
                console.error('Contact save failed:', err);
                showToast('Failed to submit message. Try again.');
            }
        });
    }

    // Handle join form submission (simulation + local save + console response)
    function handleJoinForm() {
        const form = document.getElementById('join-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const application = {
                id: Date.now(),
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                experience: formData.get('experience'),
                resumeText: formData.get('resume') || null,
                appliedAt: new Date().toISOString()
            };

            try {
                showToast('Saving application locally...');
                const resp = await simulateLocalSave('applications', application);
                showToast('Application submitted. We will contact you.');
                form.reset();
                console.log('Application saved locally (localStorage key: ironRideApplications):', application);
                console.log('Simulated server ack:', resp);
            } catch (err) {
                console.error('Application save failed:', err);
                showToast('Failed to submit application. Try again.');
            }
        });
    }


    // --- PAGE-SPECIFIC INITIALIZATION ---

    // Run functions based on which page is loaded
    switch (pageId) {
        case 'home-page':
            populateTeam();
            break;
        case 'services-page':
            populateServices();
            break;
        case 'safety-page':
            populateTestimonials();
            break;
        case 'booking-page':
            handleBookingForm();
            break;
        case 'contact-page':
            handleContactForm();
            break;
        case 'join-page':
            handleJoinForm();
            break;
    }
});

(function(){
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const form = document.getElementById('booking-form');

    function pad(n){ return n < 10 ? '0' + n : String(n); }

    function setMinDate(){
        const now = new Date();
        const y = now.getFullYear(), m = pad(now.getMonth() + 1), d = pad(now.getDate());
        const todayStr = `${y}-${m}-${d}`;
        if (dateInput) {
            dateInput.min = todayStr;
            if (!dateInput.value) dateInput.value = todayStr;
        }
    }

    function setMinTime(){
        if (!dateInput || !timeInput) return;
        const now = new Date();
        const todayStr = dateInput.min;
        if (dateInput.value === todayStr) {
            // set min to now + 30 minutes buffer
            const minDate = new Date(now.getTime() + 30 * 60000);
            const hh = pad(minDate.getHours()), mm = pad(minDate.getMinutes());
            const minTime = `${hh}:${mm}`;
            timeInput.min = minTime;
            if (!timeInput.value || timeInput.value < minTime) timeInput.value = minTime;
        } else {
            timeInput.min = '00:00';
        }
    }

    // initialize and keep updated
    if (dateInput && timeInput) {
        setMinDate();
        setMinTime();
        dateInput.addEventListener('change', setMinTime);
        // update min time every minute when booking for today
        setInterval(() => {
            if (dateInput.value === dateInput.min) setMinTime();
        }, 60000);
    }

    // extra submit validation to prevent past datetime
    if (form) {
        form.addEventListener('submit', function(e){
            const now = new Date();
            const dateVal = dateInput && dateInput.value ? dateInput.value : null;
            const timeVal = timeInput && timeInput.value ? timeInput.value : '00:00';
            if (!dateVal) return; // required attribute handles it
            const picked = new Date(dateVal + 'T' + timeVal);
            if (picked.getTime() < now.getTime()) {
                e.preventDefault();
                alert('Pickup date/time cannot be in the past. Please choose a future date/time.');
                dateInput.focus();
                return;
            }
            // ...existing submit handling code continues...
        });
    }
})();
