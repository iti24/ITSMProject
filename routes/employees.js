// routes/employeeRoutes.js

const express = require('express');
const router = express.Router();
const { createEmployee, getAllEmployees } = require('../controllers/employees'); // Adjust the path as necessary

router.post('/', createEmployee);
router.get('/', getAllEmployees);

module.exports = router;
