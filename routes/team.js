const express = require("express");
const router = express.Router();
const {
  addTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require("../controllers/team"); 

// Define routes for CRUD operations on teams
router.post("/", addTeam);
router.get("/", getAllTeams);
router.get("/:id", getTeamById);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

module.exports = router;
