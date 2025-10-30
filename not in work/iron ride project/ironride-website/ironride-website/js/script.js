
// JSON Data
const siteData = {
    "mission": [
        {
            "icon": "🛡️",
            "title": "Safety First",
            "description": "Your safety is our top priority. All our drivers are thoroughly vetted and our vehicles are regularly inspected to ensure the highest safety standards."
        },
        {
            "icon": "💼",
            "title": "Professionalism",
            "description": "Our team of professional drivers is trained to provide courteous, reliable, and efficient service. We treat every passenger with respect and care."
        },
        {
            "icon": "⭐",
            "title": "Reliability",
            "description": "Count on us to be there when you need us. With 24/7 availability and real-time tracking, we ensure you reach your destination on time, every time."
        }
    ],
    "team": [
        {
            "name": "Michael Chen",
            "title": "Lead Driver",
            "image": "👨"
        },
        {
            "name": "Sarah Johnson",
            "title": "Senior Driver",
            "image": "👩"
        },
        {
            "name": "David Williams",
            "title": "Airport Specialist",
            "image": "👨‍✈️"
        },
        {
            "name": "Emily Rodriguez",
            "title": "VIP Services",
            "image": "👩‍💼"
        }
    ],
    "services": [
        {
            "name": "Standard Ride",
            "description": "Perfect for everyday transportation needs. Comfortable, reliable, and affordable rides across the city.",
            "image": "🚗",
            "features": ["Comfortable vehicles", "Professional drivers", "Competitive pricing", "Real-time tracking"]
        },
        {
            "name": "VIP Luxury",
            "description": "Experience premium transportation with our luxury vehicle fleet. Perfect for special occasions and business travel.",
            "image": "🚙",
            "features": ["Luxury vehicles", "Executive service", "Complimentary refreshments", "Priority booking"]
        },
        {
            "name": "Airport Transfer",
            "description": "Stress-free airport transportation with flight tracking and meet & greet service.",
            "image": "✈️",
            "features": ["Flight tracking", "Meet & greet", "Luggage assistance", "Fixed pricing"]
        },
        {
            "name": "Family Package",
            "description": "Spacious vehicles perfect for family trips with child seats available upon request.",
            "image": "👨‍👩‍👧‍👦",
            "features": ["Spacious vehicles", "Child seats available", "Extra luggage space", "Family-friendly drivers"]
        }
    ],
    "testimonials": [
        {
            "name": "Robert Thompson",
            "quote": "IronRide has been my go-to service for all my business travels. Professional, punctual, and always reliable. Highly recommended!"
        },
        {
            "name": "Jennifer Lee",
            "quote": "The VIP service is exceptional! The vehicles are immaculate and the drivers are incredibly professional. Worth every penny."
        },
        {
            "name": "Marcus Johnson",
            "quote": "I've used IronRide for airport transfers multiple times. They track my flight and are always there waiting. Fantastic service!"
        },
        {
            "name": "Lisa Anderson",
            "quote": "As a parent, I appreciate the family-friendly service. The drivers are patient with kids and the vehicles are always clean and spacious."
        }
    ]
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load dynamic content
    loadMissionValues();
    loadTeam();
    loadServices();
    loadTestimonials();
    
    // Initialize booking modal functionality
    initializeBookingModal();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize careers form
    initializeCareersForm();
});

// Load Mission & Values
function loadMissionValues() {
    const missionGrid = document.getElementById('mission-grid');
    if (!missionGrid) return;
    
    missionGrid.innerHTML = '';
    
    siteData.mission.forEach(mission => {
        const missionCard = document.createElement('div');
        missionCard.className = 'mission-card';
        missionCard.innerHTML = `
            <div class="icon">${mission.icon}</div>
            <h3>${mission.title}</h3>
            <p>${mission.description}</p>
        `;
        missionGrid.appendChild(missionCard);
    });
}

// Load Team Members
function loadTeam() {
    const teamGrid = document.getElementById('team-grid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = '';
    
    siteData.team.forEach(member => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <div class="team-image">${member.image}</div>
            <div class="team-info">
                <h3>${member.name}</h3>
                <p>${member.title}</p>
            </div>
        `;
        teamGrid.appendChild(teamCard);
    });
}

// Load Services
function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = '';
    
    siteData.services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-image">${service.image}</div>
            <div class="service-content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <button class="btn btn-primary book-ride-btn">Book Now</button>
            </div>
        `;
        servicesGrid.appendChild(serviceCard);
    });
    
    // Re-initialize booking buttons after adding new ones
    initializeBookingModal();
}

// Load Testimonials
function loadTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;
    
    testimonialsGrid.innerHTML = '';
    
    siteData.testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="quote">"</div>
            <p>${testimonial.quote}</p>
            <p class="author">- ${testimonial.name}</p>
        `;
        testimonialsGrid.appendChild(testimonialCard);
    });
}

// Initialize Booking Modal
function initializeBookingModal() {
    const modal = document.getElementById('booking-modal');
    const bookingButtons = document.querySelectorAll('.book-ride-btn');
    const closeButton = modal?.querySelector('.modal-close');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const bookingForm = document.getElementById('booking-form');
    
    if (!modal) return;
    
    // Open modal when any booking button is clicked
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (bookingForm) bookingForm.reset();
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(bookingForm);
            const pickup = bookingForm.querySelector('input[type="text"]').value;
            const dropoff = bookingForm.querySelectorAll('input[type="text"]')[1].value;
            const service = bookingForm.querySelector('select').value;
            
            // Show success message
            alert(`🎉 Your ride is booked!\n\nPickup: ${pickup}\nDropoff: ${dropoff}\nService: ${service}\n\nOur team will contact you shortly to confirm your booking. Thank you for choosing IronRide!`);
            
            // Close modal and reset form
            closeModal();
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        
        alert(`✅ Thank you for contacting us, ${name}!\n\nWe've received your message and will respond to ${email} within 24 hours.\n\nOur team is here to help!`);
        
        contactForm.reset();
    });
}

// Initialize Careers Form
function initializeCareersForm() {
    const careersForm = document.getElementById('careers-form');
    if (!careersForm) return;
    
    careersForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = careersForm.querySelector('input[type="text"]').value;
        
        alert(`🎉 Application Submitted Successfully!\n\nThank you for your interest in joining IronRide, ${name}!\n\nOur HR team will review your application and contact you within 3-5 business days.\n\nWe're excited about the possibility of having you on our team!`);
        
        careersForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});