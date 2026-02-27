import { GiCricketBat, GiVolleyballBall, GiBaseballBat } from "react-icons/gi";
import { BiFootball, BiCricketBall } from "react-icons/bi";

// Mapping of sports to icons
export const sportIconMap = {
  "cricket softball": GiCricketBat,
  "cricket hardball": BiCricketBall,
  volleyball: GiVolleyballBall,
  football: BiFootball,
  elle: GiBaseballBat,
};

// Get the appropriate icon component for the sport
export const getSportIcon = (sport) => {
  const sportLower = sport?.toLowerCase() || "cricket softball";
  return sportIconMap[sportLower] || GiCricketBat;
};
