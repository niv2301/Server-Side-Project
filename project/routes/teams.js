var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const team_utils = require("./utils/team_utils");

router.get("/teamFullDetails/:teamId", async (req, res, next) => {
 
  try {
    
    const team_players = await players_utils.getPlayersByTeam(req.params.teamId);
    const future_games = await team_utils.futureGamesInTeam(req.params.teamId);
    const prev_games = await team_utils.pastGamesInTeam(req.params.teamId);
    const result = [team_players,future_games,prev_games];

    if (result[0].length == 0 && result[1].length == 0 && result[2].length == 0)
        res.send({ status: 204, message: "no information found" });
    else
        res.status(200).send(result);
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
