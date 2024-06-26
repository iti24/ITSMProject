

const Employee = require('../models/employees'); 

const createEmployee = async (req, res) => {
  try {
    const { name, position } = req.body;

    const employee = new Employee({ name, position });
    await employee.save();

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee' });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees
};
