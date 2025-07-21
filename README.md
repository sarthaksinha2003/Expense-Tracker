# Expense Tracker

A full-stack Expense Tracker application to manage your income and expenses, visualize your financial data, and gain insights into your spending habits.

## Features

- User authentication (sign up, login)
- Add, edit, and delete expenses and income
- Dashboard with financial overview and recent transactions
- Data visualization with interactive charts (bar, line, pie)
- Profile photo upload
- Responsive and modern UI

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Other:** JWT Auth, Multer (file uploads), Chart libraries

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/sarthaksinha2003/Expense-Tracker.git
cd Expense-Tracker
```

#### 2. Install backend dependencies

```bash
cd backend
npm install
```

#### 3. Install frontend dependencies

```bash
cd ../frontend/expense-tracker
npm install
```

#### 4. Set up environment variables

- Create a `.env` file in the `backend` directory.
- Add your MongoDB URI and JWT secret:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### 5. Start the backend server

```bash
cd backend
npm start
```

#### 6. Start the frontend development server

```bash
cd ../frontend/expense-tracker
npm run dev
```

- The frontend will typically run on `http://localhost:5173`
- The backend will typically run on `http://localhost:5000`

## Folder Structure

```
Expense-Tracker/
  backend/           # Express API, models, controllers, routes
  frontend/
    expense-tracker/ # React app (Vite)
```

## Usage

1. Register a new user or log in.
2. Add your income and expenses.
3. View your dashboard for an overview and charts.
4. Manage your transactions and profile.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
