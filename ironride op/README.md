# IronRide — Static Demo (HTML / CSS / JS)

This is a static demo site for IronRide. It uses only HTML, CSS and client-side JavaScript. No backend or portal is required.

## What it includes
- Pages: index.html, about.html, services.html, safety.html, booking.html, contact.html, join.html
- Styling: style.css
- Client logic: app.js
- Site content: data.json
- Images: assets/ (use your asset filenames like `headquarter.png`, `areamap.png`, etc.)

## Behavior
- Forms (Booking, Contact, Join) are handled client-side:
  - Data is saved to `localStorage`.
  - A simulated server acknowledgement is logged to the browser console so an evaluator can confirm the flow.
  - Date/time validation prevents past pickups.
- No files on the server are modified. Everything runs in the browser.

## How to run (recommended)
Serve the project over a local static server (some browser features and fetch work best over http://):

Option A — VS Code Live Server
- Install Live Server extension → Right-click `index.html` → Open with Live Server.

Option B — Python (Windows PowerShell or CMD)
- From project root:
  - py -3 -m http.server 3000
- Open: http://localhost:3000/

Option C — Simple Node static server (optional)
- npm install -g http-server
- http-server -p 3000
- Open: http://localhost:3000/

You can also open files directly (file://), but fetch for data.json and some APIs may not work in that mode.

## What the evaluator should check
1. Open DevTools → Console.
2. Go to a page with a form (e.g., booking.html).
3. Fill and submit the form.
4. Expected:
   - A UI toast confirming save.
   - Console shows a simulated server response (e.g. "Simulated bookings server response: ...").
   - Data stored in localStorage under these keys:
     - ironRideBookings
     - ironRideContacts
     - ironRideApplications

To inspect stored data in console:
- JSON.parse(localStorage.getItem('ironRideBookings') || '[]')
- JSON.parse(localStorage.getItem('ironRideContacts') || '[]')
- JSON.parse(localStorage.getItem('ironRideApplications') || '[]')

To clear demo data:
- localStorage.removeItem('ironRideBookings')
- localStorage.removeItem('ironRideContacts')
- localStorage.removeItem('ironRideApplications')

## Notes
- This is a client-side demo only. For real persistence, add a backend API and change app.js to POST data to it.
- If you want, I can add a simple "View Saved Data" admin page that prints the localStorage items on-screen for easier evaluation.
```// filepath: d:\Maal\SEM3\Web dev\Project\IronRide\iron ride project\ironride op\README.md
# IronRide — Static Demo (HTML / CSS / JS)

This is a static demo site for IronRide. It uses only HTML, CSS and client-side JavaScript. No backend or portal is required.

## What it includes
- Pages: index.html, about.html, services.html, safety.html, booking.html, contact.html, join.html
- Styling: style.css
- Client logic: app.js
- Site content: data.json
- Images: assets/ (use your asset filenames like `headquarter.png`, `areamap.png`, etc.)

## Behavior
- Forms (Booking, Contact, Join) are handled client-side:
  - Data is saved to `localStorage`.
  - A simulated server acknowledgement is logged to the browser console so an evaluator can confirm the flow.
  - Date/time validation prevents past pickups.
- No files on the server are modified. Everything runs in the browser.

## How to run (recommended)
Serve the project over a local static server (some browser features and fetch work best over http://):

Option A — VS Code Live Server
- Install Live Server extension → Right-click `index.html` → Open with Live Server.

Option B — Python (Windows PowerShell or CMD)
- From project root:
  - py -3 -m http.server 3000
- Open: http://localhost:3000/

Option C — Simple Node static server (optional)
- npm install -g http-server
- http-server -p 3000
- Open: http://localhost:3000/

You can also open files directly (file://), but fetch for data.json and some APIs may not work in that mode.

## What the evaluator should check
1. Open DevTools → Console.
2. Go to a page with a form (e.g., booking.html).
3. Fill and submit the form.
4. Expected:
   - A UI toast confirming save.
   - Console shows a simulated server response (e.g. "Simulated bookings server response: ...").
   - Data stored in localStorage under these keys:
     - ironRideBookings
     - ironRideContacts
     - ironRideApplications

To inspect stored data in console:
- JSON.parse(localStorage.getItem('ironRideBookings') || '[]')
- JSON.parse(localStorage.getItem('ironRideContacts') || '[]')
- JSON.parse(localStorage.getItem('ironRideApplications') || '[]')

To clear demo data:
- localStorage.removeItem('ironRideBookings')
- localStorage.removeItem('ironRideContacts')
- localStorage.removeItem('ironRideApplications')

## Notes
- This is a client-side demo only. For real persistence, add a backend API and change app.js to POST data to it.
- If you want, I can add a simple "View Saved Data" admin page that prints the localStorage items on-screen for easier evaluation.