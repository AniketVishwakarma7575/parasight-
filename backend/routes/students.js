const express = require('express');
const { body, validationResult } = require('express-validator');
const studentsController = require('../controllers/studentsController');

const router = express.Router();

// Public GET
router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getById);

// POST route with validators properly wrapped
router.post(
  '/',
  [
    body('roll').notEmpty().withMessage('roll required'),
    body('name').notEmpty().withMessage('name required'),
    body('classSec').notEmpty().withMessage('classSec required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    studentsController.create(req, res, next);
  }
);

// PUT and DELETE routes without auth
router.put('/:id', studentsController.update);
router.delete('/:id', studentsController.remove);

module.exports = router;
