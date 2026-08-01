# 🎬 Movie Ticket Booking System

A full-stack, enterprise-grade Movie Ticket Booking Application developed with **Java 21 (Spring Boot 3)** on the backend and **React** on the frontend. Features JWT authentication, interactive 2D seat selection grid, payment processing, printable PDF ticket generation, and a comprehensive Admin management dashboard.

---

## 🌟 Features

### 👤 User Features
- **Authentication**: Registration, JWT Login, Secure Password Hashing (BCrypt), and Session context.
- **Movie Browsing**: Filter by genre, language, search by title, and view movie details with ratings & duration.
- **Theatre & Showtimes**: Select theatres by city and pick showtime slots.
- **Interactive Seat Map**: Real-time seat layout with status indicators (`White` = Available, `Red` = Booked, `Green` = Selected).
- **Checkout & Payment**: Order overview summary card, mock payment gateway processing (Card, UPI, Net Banking).
- **Instant PDF Ticket**: Generate and download printable ticket PDF with QR code upon successful booking.
- **Booking History & Cancellation**: View past bookings, cancel tickets with instant status update.

### 🛡️ Admin Features
- **Dashboard Analytics**: Real-time metrics for Total Movies, Total Users, Today's Bookings, and Total Revenue.
- **Movie Management**: Add, update, delete, and upload poster URLs for movies.
- **Theatre & Screen Management**: Add theatres, manage screens, and configure seat capacities.
- **Show Scheduling**: Schedule shows linked to specific movies, screens, and times.
- **User & Booking Audit**: View list of registered users and inspect all customer booking records.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), Axios, React Router DOM v6, Lucide Icons, html2pdf.js |
| **Backend** | Java 21, Spring Boot 3.2, Spring MVC, Spring Security 6, JWT Authentication, Hibernate, Spring Data JPA, Maven |
| **Database** | MySQL 8.0 / H2 In-Memory Database Engine |
| **Tools** | VS Code, IntelliJ IDEA, MySQL Workbench, Postman, Git & GitHub |

---

## 📂 Folder Structure

```
Movie-Ticket-Booking-System/
├── Database/
│   ├── schema.sql
│   └── data.sql
├── movie-ticket-backend/
│   ├── pom.xml
│   └── src/main/java/com/moviebooking/
│       ├── config/
│       ├── controller/
│       ├── dto/
│       ├── entity/
│       ├── exception/
│       ├── repository/
│       ├── security/
│       ├── service/
│       └── MovieBookingApplication.java
├── movie-ticket-frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
└── README.md
```

---

## 🔗 REST API Endpoints

### 🔑 Authentication
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `POST` | `/api/auth/logout` | User / Admin | Logout user session |

### 🎬 Movies
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/movies` | Public | Fetch all movies |
| `GET` | `/api/movies/{id}` | Public | Fetch movie details by ID |
| `POST` | `/api/movies` | Admin | Create a new movie |
| `PUT` | `/api/movies/{id}` | Admin | Update existing movie |
| `DELETE` | `/api/movies/{id}` | Admin | Delete a movie |

### 🏛️ Theatres & Shows
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/theatres` | Public | List all theatres & screens |
| `POST` | `/api/theatres` | Admin | Create new theatre |
| `GET` | `/api/shows` | Public | List available shows |
| `POST` | `/api/shows` | Admin | Add show schedule |
| `GET` | `/api/shows/{id}/seats` | Public | Fetch seat layout & booked status for show |

### 🎟️ Bookings & Payments
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/booking` | User | Confirm seat selection & create booking |
| `GET` | `/api/booking/history` | User | Fetch booking history for logged user |
| `DELETE` | `/api/booking/{id}` | User | Cancel booking |
| `POST` | `/api/payment` | User | Process mock payment |
| `GET` | `/api/admin/dashboard` | Admin | Fetch admin analytics summary |

---

## ⚡ Quick Start Guide

### 1. Database Setup
Execute `Database/schema.sql` followed by `Database/data.sql` in MySQL Workbench or terminal.

```bash
mysql -u root -p < Database/schema.sql
mysql -u root -p < Database/data.sql
```

### 2. Backend Setup
Navigate to `movie-ticket-backend` and run:

```bash
cd movie-ticket-backend
mvn clean spring-boot:run
```
> The backend server runs on `http://localhost:8080`.

### 3. Frontend Setup
Navigate to `movie-ticket-frontend` and run:

```bash
cd movie-ticket-frontend
npm install
npm run dev
```
> The frontend application runs on `http://localhost:5173`.

---

## 🔮 Future Enhancements
- 💳 Integration with real payment gateways (Stripe / Razorpay).
- 📧 Automated email confirmation with embedded QR Code ticket.
- 💬 Real-time seat availability updates using WebSockets.
- ⭐ User ratings, reviews, and discount coupon codes.

---

## ✍️ Author
Designed & Developed for Movie Ticket Booking Systems.
