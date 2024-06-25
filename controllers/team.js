const Team = require('../models/team'); 

const addTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json({ message: "Team details saved successfully" });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

const getAllTeams = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const perPage = parseInt(req.query.perPage, 10) || 10;
        
        const skip = (page - 1) * perPage; // Calculate the number of documents to skip
  
      const teams = await Team.find().skip(skip).limit(perPage); // Fetch teams with pagination
  
      res.status(200).json(teams); // Return the paginated list of teams
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ error: error.message });
      }
  };

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({
        message: "Team details updated successfully",
        team: team
      });
      
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  addTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  
};
