### Directory Structure
```
/ironride
    ├── index.html
    ├── about.html
    ├── services.html
    ├── booking.html
    ├── testimonials.html
    ├── contact.html
    ├── styles.css
    └── script.js
```

### 1. `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>IronRide - Premium Cab Service</title>
</head>
<body>
    <header>
        <h1>IronRide</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="booking.html">Booking</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>Welcome to IronRide</h2>
        <p>Your premium cab service for a comfortable and luxurious ride.</p>
    </main>
    <footer>
        <p>&copy; 2023 IronRide. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
```

### 2. `about.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>About Us - IronRide</title>
</head>
<body>
    <header>
        <h1>IronRide</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="booking.html">Booking</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>About IronRide</h2>
        <p>IronRide is dedicated to providing the best cab service with premium vehicles and professional drivers.</p>
    </main>
    <footer>
        <p>&copy; 2023 IronRide. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
```

### 3. `services.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Services - IronRide</title>
</head>
<body>
    <header>
        <h1>IronRide</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="booking.html">Booking</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>Our Services</h2>
        <ul>
            <li>Airport Transfers</li>
            <li>Corporate Travel</li>
            <li>Luxury Rides</li>
            <li>Long-Distance Travel</li>
        </ul>
    </main>
    <footer>
        <p>&copy; 2023 IronRide. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
```

### 4. `booking.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Booking - IronRide</title>
</head>
<body>
    <header>
        <h1>IronRide</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="booking.html">Booking</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>Book a Ride</h2>
        <form id="booking-form">
            <label for="name">Name:</label>
            <input type="text" id="name" required>
            <label for="pickup">Pickup Location:</label>
            <input type="text" id="pickup" required>
            <label for="dropoff">Drop-off Location:</label>
            <input type="text" id="dropoff" required>
            <button type="submit">Book Now</button>
        </form>
    </main>
    <footer>
        <p>&copy; 2023 IronRide. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
```

### 5. `testimonials.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Testimonials - IronRide</title>
</head>
<body>
    <header>
        <h1>IronRide</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="booking.html">Booking</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>What Our Customers Say</h2>
        <blockquote>
            <p>"IronRide provided an exceptional service! Highly recommend!" - John Doe</p>
        </blockquote>
        <blockquote>
            <p>"The best cab service I've ever used. Comfortable and reliable!" - Jane Smith</p>
        </blockquote>
    </main>
    <footer>
        <p>&copy; 2023 IronRide. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
```

### 6. `contact.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Contact Us - IronRide</title>
</head>
<body>
    <header>
        <h1>IronRide</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="booking.html">Booking</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>Contact Us</h2>
        <p>Email: support@ironride.com</p>
        <p>Phone: +1 234 567 890</p>
    </main>
    <footer>
        <p>&copy; 2023 IronRide. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
```

### 7. `styles.css`
```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

header {
    background-color: #333;
    color: white;
    padding: 10px 0;
    text-align: center;
}

nav ul {
    list-style-type: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin: 0 15px;
}

nav ul li a {
    color: white;
    text-decoration: none;
}

main {
    padding: 20px;
}

footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px 0;
    position: relative;
    bottom: 0;
    width: 100%;
}
```

### 8. `script.js`
```javascript
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your booking has been submitted!');
});
```

### Explanation
- **HTML Files**: Each HTML file represents a different page of the website. They share a common header and footer for consistency.
- **CSS File**: The `styles.css` file contains basic styling for the website, including layout and colors.
- **JavaScript File**: The `script.js` file adds a simple alert when the booking form is submitted.

### How to Run
1. Create a folder named `ironride`.
2. Inside the folder, create the HTML files, CSS file, and JavaScript file as shown above.
3. Open `index.html` in a web browser to view the website.

This is a basic structure and can be expanded with more features, styles, and functionalities as needed.