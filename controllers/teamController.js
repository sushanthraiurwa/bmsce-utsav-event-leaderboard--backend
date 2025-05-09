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

// Start timer for all teams
exports.startTimer = async (req, res) => {
  try {
    // Set startTime to now for all teams and reset timeTaken to null
    await Team.updateMany({}, { timerStarTime: new Date(), totalTimeTaken: null });
    res.json({ message: 'Timer started for all teams' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Stop timer for a specific team
// Stop timer for a specific team
exports.stopTimer = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team || !team.timerStarTime) {
      return res.status(400).json({ error: 'Timer not started yet' });
    }

    // Calculate time difference in seconds
    const now = new Date();
    const timeDiffSeconds = Math.floor((now - team.timerStarTime) / 1000); // Correct the field name to timerStarTime

    // Update the team's totalTimeTaken
    team.totalTimeTaken = timeDiffSeconds;  // Ensure it's a number
    team.timerStoppedAt = now; // Optional: update the stop time if needed
    await team.save();

    res.json({ message: 'Timer stopped for team', totalTimeTaken: team.totalTimeTaken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get teams sorted by points and timeTaken
exports.getSortedTeams = async (req, res) => {
  try {
    // Sort teams first by points in descending order, then by timeTaken in ascending order
    const teams = await Team.find().sort({
      points: -1,
      totalTimeTaken: 1 // Will sort nulls last
    });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// routes/teamRoutes.js or wherever your routes are
// In teamController.js
exports.resetTimers = async (req, res) => {
  try {
    // Reset all timers
    const result = await Team.updateMany({}, {
      $set: {
        timerStarTime: null,
        timerStartTime: null,
        totalTimeTaken: null
      }
    });

    // Send response
    res.json({ message: 'All timers reset', modified: result.modifiedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reset timers' });
  }
};

