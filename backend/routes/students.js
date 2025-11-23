const express = require('express');
const { body } = require('express-validator');
const studentsController = require('../controllers/studentsController');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

// Public GET
router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getById);

// Protected - only logged-in admins
router.post('/',
  jwtAuth,
  body('roll').notEmpty().withMessage('roll required'),
  body('name').notEmpty().withMessage('name required'),
  body('classSec').notEmpty().withMessage('classSec required'),
  studentsController.create
);

router.put('/:id', jwtAuth, studentsController.update);
router.delete('/:id', jwtAuth, studentsController.remove);

module.exports = router;
