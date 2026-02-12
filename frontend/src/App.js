import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchDepartment, setSearchDepartment] = useState('');
  const [error, setError] = useState('');
  const [departments] = useState([
    'Engineering',
    'Human Resources',
    'Marketing',
    'Sales',
    'Finance',
    'Operations',
    'IT',
    'Customer Service'
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    hireDate: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchDepartment) {
      const filtered = employees.filter(
        (emp) => emp.department.toLowerCase() === searchDepartment.toLowerCase()
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchDepartment, employees]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
      setFilteredEmployees(data);
      setError('');
    } catch (err) {
      setError('Failed to load employees. Make sure the backend server is running.');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (selectedEmployee) {
        const response = await fetch(`${API_URL}/${selectedEmployee.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update employee');
        }
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create employee');
        }
      }
      fetchEmployees();
      closeForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      hireDate: employee.hireDate
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete employee');
      fetchEmployees();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const openForm = () => {
    setSelectedEmployee(null);
    setFormData({ name: '', email: '', department: '', role: '', hireDate: '' });
    setIsFormOpen(true);
    setError('');
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedEmployee(null);
    setFormData({ name: '', email: '', department: '', role: '', hireDate: '' });
    setError('');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Employee Management System</h1>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="controls">
        <button className="btn btn-primary" onClick={openForm}>
          Add New Employee
        </button>
        <div className="filter-section">
          <label htmlFor="department-filter">Filter by Department:</label>
          <select
            id="department-filter"
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
            className="filter-select"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="role">Role *</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="hireDate">Hire Date *</label>
                <input
                  type="date"
                  id="hireDate"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {selectedEmployee ? 'Update' : 'Create'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={closeForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="employee-list">
        <h2>Employee List ({filteredEmployees.length})</h2>
        {filteredEmployees.length === 0 ? (
          <p className="no-employees">No employees found. Add your first employee to get started!</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
                <th>Hire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td>{employee.hireDate}</td>
                  <td className="actions">
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
