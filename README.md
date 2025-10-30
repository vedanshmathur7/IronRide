# IronRide — End-to-End Study Material

This document explains the IronRide static website (HTML / CSS / JS). Use it to prepare a PDF for evaluators. Instructions to generate a PDF are at the end.

---

## Project overview

Purpose: A static demo site that showcases a secure cab service. All logic is client-side (no backend). Forms simulate server acknowledgements and persist data in localStorage so evaluators can verify flows using browser DevTools.

Root files:
- index.html — Homepage
- about.html — About / location images (assets/headquarter.png, assets/areamap.png)
- services.html — Services listing
- safety.html — Testimonials / safety info
- booking.html — Ride booking form
- contact.html — Contact form
- join.html — Driver application form
- style.css — Main stylesheet (compact header/footer added)
- app.js — All JavaScript logic (data fetch, dynamic DOM population, form handling, simulation)
- data.json — Site content (services, team, testimonials)
- assets/ — Images used by pages

---

## Key concepts

1. Static-only
   - No server; site runs entirely in browser.
   - data.json is fetched with fetch() (works when served over http:// or Live Server).

2. Simulated backend
   - Forms save to localStorage and call a simulateLocalSave() helper which logs a "simulated server response" to the console.
   - Evaluator inspects the console to confirm behavior.

3. Local persistence
   - Keys used:
     - `ironRideBookings`
     - `ironRideContacts`
     - `ironRideApplications`
   - Inspect via DevTools → Application → Local Storage or run in Console:
     - JSON.parse(localStorage.getItem('ironRideBookings') || '[]')

4. Date/time validation
   - Booking form prevents selecting past dates/times.
   - If booking is for today, minimum time is now + 30 minutes (keeps pickups realistic).

---

## app.js — high level walkthrough

Major responsibilities:
- Fetch site content from data.json (getSiteData).
- Populate dynamic sections:
  - populateTeam() fills #team-container on index.html using data.team.
  - populateServices() renders services on services.html using data.services.
  - populateTestimonials() renders on safety.html using data.testimonials.
- Form handlers:
  - handleBookingForm() — reads booking form, validates date/time, pushes booking into localStorage under `ironRideBookings`, then calls simulateLocalSave('bookings', booking) which:
    - saves locally
    - waits random short delay
    - logs simulated response:
      { status: 'received', kind: 'bookings', id: 'IR' + booking.id, receivedAt: ..., payload: booking }
    - shows toast messages in UI
  - handleContactForm() and handleJoinForm() follow same pattern with different localStorage keys.

Example: simulated response logged to console:
Simulated bookings server response: {
  status: "received",
  kind: "bookings",
  id: "IR163287...",
  receivedAt: "2025-10-30T12:34:56.789Z",
  payload: { id: 163287..., name: "...", date: "...", time: "...", ... }
}

---

## data.json structure

Top-level keys:
- services: array of { name, description, img }
- team: array of { img, name?, role? }
- testimonials: array of { img, author?, text? }

Example (simplified):
{
  "services": [
    { "name": "Standard Ride", "description": "...", "img": "assets/service-standard.jpg" },
    ...
  ],
  "team": [
    { "img": "assets/team-1.jpg", "name": "Anna Kumar", "role": "Operations Lead" },
    ...
  ],
  "testimonials": [
    { "img": "assets/testimonial-1.jpg", "author": "Priya K.", "text": "Excellent service..." }
  ]
}

Note: data.json can use placeholder images or real asset paths in `assets/`.

---

## How to test

1. Serve site (recommended) — run a static server in the project root:
   - VS Code Live Server: right-click index.html → Open with Live Server
   - Python: `py -3 -m http.server 3000` then open `http://localhost:3000/`
2. Open DevTools → Console.
3. Visit booking.html:
   - Fill form with a future date/time and submit.
   - Expect:
     - UI toast confirming the save.
     - Console shows a simulated server response for bookings.
     - localStorage updated: JSON.parse(localStorage.getItem('ironRideBookings')) shows the booking.
4. Repeat for contact.html and join.html:
   - Console shows simulated responses and localStorage keys `ironRideContacts` and `ironRideApplications`.
5. Inspect images:
   - about.html uses `assets/headquarter.png` and `assets/areamap.png`. Validate they render.

Quick console commands:
- View bookings: JSON.parse(localStorage.getItem('ironRideBookings') || '[]')
- Clear bookings: localStorage.removeItem('ironRideBookings')

---

## UI details & styling

- Header and footer have compact styles in style.css (reduced padding, smaller logo).
- Hero section uses `assets/hero.jpg` (or placeholder).
- Service cards display images and "Book Now" buttons linking to booking.html.
- Toast notifications use the #toast-notification element and disappear after a short timeout.

---

## Troubleshooting

- If data.json fetch fails:
  - Ensure site served over http:// (file:// may block fetch).
  - Use Live Server or python http.server.
- If images do not appear:
  - Confirm filenames in assets/ match the src attributes in HTML.
- If console shows CORS or fetch errors:
  - Use a local static server; do not open files directly via file://.

---
