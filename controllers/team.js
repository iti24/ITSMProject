const Team = require('../models/team'); 

// Create a new team
const createTeam = async (req, res) => {
  console.log("itishree");
  try {
    const { name, description, employeeIds } = req.body;
    console.log(req.body);

    const team = new Team({
      name,
      description,
      employees: employeeIds
    });
console.log(team);
    await team.save();
    res.status(201).send(team);
  } catch (error) {
    res.status(500).send({ error: 'Error creating team' });
  }
};
// Add employees to a team
const addEmployeesToTeam = async (req, res) => {
  try {

    const teamId = req.params.id;
    console.log(teamId);
    const { employeeIds } = req.body;
    const team = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { employees: { $each: employeeIds } } },
      { new: true }
    ).populate('employees');
    console.log(team);


    if (!team) {
      return res.status(404).send({ error: 'Team not found' });
    }

    res.status(200).send(team);
  } catch (error) {
    res.status(500).send({ error: 'Error adding employees to team' });
  }
};
// Remove employees from a team
const removeEmployeesFromTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const { employeeIds } = req.body;

    const team = await Team.findByIdAndUpdate(
      teamId,
      { $pull: { employees: { $in: employeeIds } } },
      { new: true }
    ).populate('employees');

    if (!team) {
      return res.status(404).send({ error: 'Team not found' });
    }

    res.status(200).send(team);
  } catch (error) {
    res.status(500).send({ error: 'Error removing employees from team' });
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


// Get team data along with employee details by team ID
const getTeamWithEmployeesById = async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findById(teamId).populate('employees');

    if (!team) {
      return res.status(404).send({ error: 'Team not found' });
    }

    res.status(200).send(team);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching team data' });
  }
};


// Edit team details
const updateTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const { name, description } = req.body;

    const team = await Team.findByIdAndUpdate(
      teamId,
      { name, description },
      { new: true }
    ).populate('employees');

    if (!team) {
      return res.status(404).send({ error: 'Team not found' });
    }

    res.status(200).send({ message: 'Team updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error updating team' });
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
  createTeam,
  addEmployeesToTeam,
  removeEmployeesFromTeam,
  getAllTeams,
  getTeamWithEmployeesById,
  updateTeam,
  deleteTeam,
  
};
