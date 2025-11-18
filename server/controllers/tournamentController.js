const Tournament = require("../models/tournamentModel");

//post tournaments
exports.postTournament = async (req, res) => {
  const { name, sport, startDate, endDate } = req.body;

  try {
    const tournament = new Tournament({
      name,
      sport,
      startDate,
      endDate,
    });
    await tournament.save();
    res
      .status(201)
      .json({ message: "Tournament created successfully", tournament });
  } catch (error) {
    console.error("Error creating tournament", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//retrive tournamens
exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edit tournaments
exports.updateTournament = async (req, res) => {
  const { id } = req.params;
  const { name, sport, startDate, endDate } = req.body;

  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      id,
      { name, sport, startDate, endDate },
      { new: true, runValidators: true }
    );
    if (!updatedTournament) {
      return res.status(404).json({ message: "Tournament Not Found" });
    }
    res.json({
      message: "Tournament updated successfully",
      tournament: updatedTournament,
    });
  } catch (error) {
    console.error("Error updating tournament", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete tournament
exports.deleteTournament = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTournament = Tournament.findByIdAndDelete(id);

    if (!deletedTournament) {
      console.log("no tournament found");
      
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.json({ message: "Tournament deleted successfully" });
  } catch (error) {
    console.error("Error deleting tournament", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
