const Team = require('../models/Team');

// Add a new team
exports.addTeam = async (req, res) => {
  try {
    const newTeam = new Team({ name: req.body.name });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all teams (sorted by points)
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ points: -1 });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update team points
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, { points: req.body.points }, { new: true });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
