# Employee Management System

A full-stack employee management application with CRUD operations, built with Node.js, Express, SQLite, and React.

## Features

- ✅ Complete CRUD operations for employee records
- ✅ Employee fields: ID, Name, Email, Department, Role, Hire Date
- ✅ Search and filter employees by department
- ✅ RESTful API design
- ✅ Clean, maintainable code with proper error handling
- ✅ Modern, responsive UI

## Tech Stack

### Backend
- **Node.js** with Express
- **SQLite** database
- **CORS** enabled for cross-origin requests

### Frontend
- **React** (Create React App)
- Modern CSS with responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nivitha311/Employee-management-app.git
   cd Employee-management-app
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The backend server will run on `http://localhost:5000`

3. **Start the Frontend Application** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend application will run on `http://localhost:3000`

4. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### GET /api/employees
Get all employees or filter by department
- Query params: `department` (optional)
- Example: `/api/employees?department=Engineering`

### GET /api/employees/:id
Get a specific employee by ID

### POST /api/employees
Create a new employee
- Body: `{ name, email, department, role, hireDate }`

### PUT /api/employees/:id
Update an existing employee
- Body: `{ name, email, department, role, hireDate }`

### DELETE /api/employees/:id
Delete an employee

## Project Structure

```
Employee-management-app/
├── backend/
│   ├── db.js              # Database configuration
│   ├── employeeModel.js   # Employee data model
│   ├── server.js          # Express server and API routes
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   └── index.js       # React entry point
│   ├── public/
│   └── package.json
└── README.md
```

## Screenshots

### Employee List View
![Employee List](https://github.com/user-attachments/assets/f694217f-5c98-42ae-bb09-e9ec84da737c)

### Filter by Department
![Filter by Department](https://github.com/user-attachments/assets/f5f4ed89-3ece-4862-9c09-00f9f6eccc6c)

### Add New Employee
![Add Employee](https://github.com/user-attachments/assets/f9dcb883-0e6b-487f-bc82-1ea495eac10c)

### Edit Employee
![Edit Employee](https://github.com/user-attachments/assets/964405a7-836a-4bcb-8b17-7fd41874f7ae)

## License

ISC
