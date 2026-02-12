const db = require('./db');

const EmployeeModel = {
  getAll: (department = null) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM employees';
      let params = [];

      if (department) {
        query += ' WHERE department = ?';
        params.push(department);
      }

      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM employees WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  create: (employee) => {
    return new Promise((resolve, reject) => {
      const { name, email, department, role, hireDate } = employee;
      db.run(
        'INSERT INTO employees (name, email, department, role, hireDate) VALUES (?, ?, ?, ?, ?)',
        [name, email, department, role, hireDate],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, ...employee });
          }
        }
      );
    });
  },

  update: (id, employee) => {
    return new Promise((resolve, reject) => {
      const { name, email, department, role, hireDate } = employee;
      db.run(
        'UPDATE employees SET name = ?, email = ?, department = ?, role = ?, hireDate = ? WHERE id = ?',
        [name, email, department, role, hireDate, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: parseInt(id), ...employee });
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM employees WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
};

module.exports = EmployeeModel;
