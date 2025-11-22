const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const teachersController = require('../controllers/teachersController');
const adminAuth = require('../middleware/adminAuth');

router.get('/', teachersController.list);
router.post('/',
  adminAuth,
  body('name').notEmpty().withMessage('name required'),
  teachersController.create
);
router.delete('/:id', adminAuth, teachersController.remove);

module.exports = router;
