# RentACar API

A RESTful API for a car rental service built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- Car Management System
- Filtering Cars by Various Parameters
- Secure Password Hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rentacar
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

4. Start the server:

```bash
npm start
```

## API Endpoints

### Authentication

- **POST** `/auth/register` - Register a new user

  - Body: `{ fullname, username, email, password }`

- **POST** `/auth/login` - Login user

  - Body: `{ username, password }`

- **GET** `/auth/my-profile` - Get user profile (Protected)
  - Headers: `Authorization: Bearer <token>`

### Cars

All car endpoints require authentication (Bearer token)

- **POST** `/cars` - Create a new car

  - Body: `{ name, price_per_day, year, color, steering_type, number_of_seats, status }`

- **GET** `/cars` - Get all cars

  - Query Parameters: `status, year, color, steering_type, number_of_seats`

- **GET** `/cars/:id` - Get car by ID

## Car Status Types

- AVAILABLE
- RENTED

## Technologies Used

- Express.js
- MongoDB
- JWT (jsonwebtoken)
- bcrypt
- dotenv

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Input validation


