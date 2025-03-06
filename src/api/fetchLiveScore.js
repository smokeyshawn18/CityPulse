import axios from "axios";

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;
const TEAM_ID = "65"; // Manchester City ID

export const fetchLiveMatch = async () => {
  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=LIVE`,
      { headers: { "X-Auth-Token": API_KEY } }
    );
    return response.data.matches;
  } catch (error) {
    console.error("Error fetching live matches:", error);
    return [];
  }
};
