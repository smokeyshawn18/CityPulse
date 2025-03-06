export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/teams/65/matches",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
