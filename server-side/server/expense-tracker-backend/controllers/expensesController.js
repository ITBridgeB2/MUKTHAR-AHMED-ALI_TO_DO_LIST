const db = require('../db');

// Get all expenses (for list view)
exports.getExpenses = (req, res) => {
  db.query('SELECT id, amount,category, date FROM expenses ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get single expense by ID
exports.getExpenseById = (req, res) => {
  db.query('SELECT * FROM expenses WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Expense not found' });
    res.json(results[0]);
  });
};

// Add a new expense
exports.addExpense = (req, res) => {
  const { amount, category, date } = req.body;
  db.query(
    'INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)',
    [amount, category, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, amount, category, date });
    }
  );
};

// Update an expense
exports.updateExpense = (req, res) => {
  const { amount, category, date, description } = req.body; // Include description
  db.query(
    'UPDATE expenses SET amount = ?, category = ?, date = ?, description = ? WHERE id = ?',
    [amount, category, date, description, req.params.id], // Include description in query
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Expense updated' });
    }
  );
};


// Delete an expense
exports.deleteExpense = (req, res) => {
  db.query('DELETE FROM expenses WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Expense deleted' });
  });
};
