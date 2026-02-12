const express = require('express');
const cors = require('cors');
const EmployeeModel = require('./employeeModel');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET all employees or filter by department
app.get('/api/employees', async (req, res) => {
  try {
    const { department } = req.query;
    const employees = await EmployeeModel.getAll(department);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees', message: error.message });
  }
});

// GET employee by ID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await EmployeeModel.getById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employee', message: error.message });
  }
});

// POST create new employee
app.post('/api/employees', async (req, res) => {
  try {
    const { name, email, department, role, hireDate } = req.body;

    if (!name || !email || !department || !role || !hireDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const employee = await EmployeeModel.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create employee', message: error.message });
  }
});

// PUT update employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { name, email, department, role, hireDate } = req.body;

    if (!name || !email || !department || !role || !hireDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingEmployee = await EmployeeModel.getById(req.params.id);
    if (!existingEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const employee = await EmployeeModel.update(req.params.id, req.body);
    res.json(employee);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to update employee', message: error.message });
  }
});

// DELETE employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const existingEmployee = await EmployeeModel.getById(req.params.id);
    if (!existingEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await EmployeeModel.delete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee', message: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
