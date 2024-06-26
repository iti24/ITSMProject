const express = require("express");
const router = express.Router();
const {
  createTeam,
  addEmployeesToTeam,
  removeEmployeesFromTeam,
  getAllTeams,
  getTeamWithEmployeesById,
  updateTeam,
  deleteTeam
} = require("../controllers/team"); 

// Define routes for CRUD operations on teams
router.post('/', createTeam);
router.patch('/:id', addEmployeesToTeam);
router.patch('/:id/employees/remove', removeEmployeesFromTeam);
router.get('/:id', getTeamWithEmployeesById);
router.put('/:id', updateTeam);
router.delete("/:id", deleteTeam);
router.get("/", getAllTeams);
module.exports = router;
