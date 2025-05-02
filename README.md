# Fitness Dashboard

A full-stack fitness tracking application built with React, Node.js, and MongoDB.

## Features

- User authentication (login/register)
- Dashboard with fitness statistics
- Weight tracking with charts
- Activity logging
- Profile management

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit for state management
- React Router for navigation
- Chart.js for data visualization
- Axios for API calls

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd fitness-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_API_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/fitness_dashboard
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the development servers:
```bash
# Run both frontend and backend
npm run dev

# Run frontend only
npm run client

# Run backend only
npm run server
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Project Structure

```
fitness-dashboard/
├── src/                    # Frontend source files
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Reusable React components
│   ├── features/          # Redux slices
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── charts/            # Chart.js configurations
├── server/                # Backend source files
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── config/           # Configuration files
└── package.json          # Project dependencies
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Users
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

### Activities
- GET /api/activities - Get user activities
- POST /api/activities - Create new activity
- PUT /api/activities/:id - Update activity
- DELETE /api/activities/:id - Delete activity

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
