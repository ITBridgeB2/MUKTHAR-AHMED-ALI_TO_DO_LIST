const express = require('express');
const router = express.Router();
const controller = require('../controllers/expensesController');

router.get('/', controller.getExpenses);
router.get('/:id', controller.getExpenseById);
router.post('/', controller.addExpense);
router.put('/:id', controller.updateExpense);
router.delete('/:id', controller.deleteExpense);

module.exports = router;
