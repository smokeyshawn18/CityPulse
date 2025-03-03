import PremierLeagueLogo from "../assets/images/prem.webp";
import ChampionsLeagueLogo from "../assets/images/champions.png";
// import ParisSaintGerman from "../assets/images/psg.png";
import ManCityLogo from "../assets/images/logo.svg";
import Tottenham from "../assets/images/tottenham.webp";
import Liverpool from "../assets/images/lfc.webp";
import ManUtd from "../assets/images/united.png";
import AstonVilla from "../assets/images/aston-villa.png";
// import Carabao from "../assets/images/carabao.png";
// import WestHamLogo from "../assets/images/westham.png";
import New from "../assets/images/newcastle.png";
// import ChelseaLogo from "../assets/images/Chelsea.webp";
import ArsenalLogo from "../assets/images/arsenal.png";
import Juventus from "../assets/images/juv.jpg";
import Fifacwc from "../assets/images/cwc.webp";
import Rma from "../assets/images/rma.png";
import Not from "../assets/images/not.png";
// Full list of matches including additional teams
const matches = [
  {
    date: "2025-02-20",
    opponent: "Real Madrid",
    time: "01:45",
    venue: "Santiago Bernabeu",
    competition: "2nd Leg (Round of 32) - Champions League",
    opponentLogo: Rma,
    competitionLogo: ChampionsLeagueLogo,
  },
  {
    date: "2025-02-23",
    opponent: "Liverpool",
    time: "20:45",
    venue: "Etihad Stadium",
    competition: "Premier League",
    opponentLogo: Liverpool,
    competitionLogo: PremierLeagueLogo,
  },

  {
    date: "2025-02-26",
    opponent: "Tottenham",
    time: "01:30",
    venue: "Tottenham Hotspur Stadium",
    competition: "Premier League",
    opponentLogo: Tottenham,
    competitionLogo: PremierLeagueLogo,
  },
  {
    date: "2025-03-08",
    opponent: "N. Forest",
    time: "19:45",
    venue: "City Ground, Nottingham",
    competition: "Premier League",
    opponentLogo: Not,
    competitionLogo: PremierLeagueLogo,
  },
  {
    date: "2025-04-05",
    opponent: "Man United",
    time: "19:45",
    venue: "Old Trafford",
    competition: "Premier League",
    opponentLogo: ManUtd,
    competitionLogo: PremierLeagueLogo,
  },
  {
    date: "2025-04-26",
    opponent: "Aston Villa",
    time: "19:45",
    venue: "Etihad Stadium",
    competition: "Premier League",
    opponentLogo: AstonVilla,
    competitionLogo: PremierLeagueLogo,
  },
  {
    date: "2025-06-27",
    opponent: "Juventus",
    time: "19:45",
    venue: "Camping World Stadium",
    competition: "Fifa CLub World Cup",
    opponentLogo: Juventus,
    competitionLogo: Fifacwc,
  },
];

// Function to calculate if the match is Today, Tomorrow, or future
const calculateRelativeTime = (matchDate) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const matchDay = new Date(matchDate).setHours(0, 0, 0, 0);

  const diffInDays = (matchDay - today) / (1000 * 60 * 60 * 24); // Difference in days

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Tomorrow";
  } else if (diffInDays > 1) {
    return `${Math.ceil(diffInDays)} days to go`;
  } else {
    return "Match has passed";
  }
};

// Function to format date and time for display
const formatDateTime = (date, time) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(`${date}T${time}`).toLocaleDateString(
    undefined,
    options
  ); // undefined for local time
  const formattedTime = new Date(`${date}T${time}`).toLocaleTimeString(
    undefined,
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  return `${formattedDate} at ${formattedTime}`;
};

const Schedule = () => {
  // Filter out matches that have already passed
  const upcomingMatches = matches.filter((match) => {
    const matchDateTime = new Date(`${match.date}T${match.time}`);
    return matchDateTime >= new Date(); // Only show future or ongoing matches
  });

  return (
    <section id="schedule" className="bg-sky-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-sky-900 text-4xl font-bold text-center mb-6 uppercase tracking-wider">
          Upcoming Matches
        </h2>
        <h3 className="text-gray-800 font-semibold text-lg text-center mb-3">
          Major Club matches only
        </h3>
        <h3 className="text-gray-600 font-semibold text-lg text-center mb-6">
          All times are in your local timezone
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match, index) => (
              <div
                key={index}
                className="bg-[#E6F1FA] rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-300 to-sky-500 rounded-t-lg">
                  {/* Conditional logo placement */}
                  {match.venue === "Etihad Stadium" ? (
                    <>
                      <div className="flex flex-col items-center">
                        <img
                          src={ManCityLogo}
                          alt="Manchester City"
                          className="w-20 h-20 rounded-full border-2 border-white"
                        />
                        <p className="mt-2 text-lg font-semibold text-[#ffffff]">
                          Man City
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-white">VS</p>
                      <div className="flex flex-col items-center">
                        <img
                          src={match.opponentLogo}
                          alt={match.opponent}
                          className="w-20 h-20 rounded-full border-2 border-white"
                        />
                        <p className="mt-2 text-lg font-semibold text-[#ffffff]">
                          {match.opponent}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center">
                        <img
                          src={match.opponentLogo}
                          alt={match.opponent}
                          className="w-20 h-20 rounded-full border-2 border-white"
                        />
                        <p className="mt-2 text-lg font-semibold text-[#ffffff]">
                          {match.opponent}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-white">VS</p>
                      <div className="flex flex-col items-center">
                        <img
                          src={ManCityLogo}
                          alt="Manchester City (Home)"
                          className="w-20 h-20 rounded-full border-2 border-white"
                        />
                        <p className="mt-2 text-lg font-semibold text-[#ffffff]">
                          Man City
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6 text-center">
                  <p className="text-lg font-semibold text-gray-600">
                    {formatDateTime(match.date, match.time)}
                  </p>

                  <img
                    src={match.competitionLogo}
                    alt={`${match.competition} Logo`}
                    className="w-12 h-12 rounded-lg mx-auto my-4"
                  />
                  <p className="text-gray-700 font-semibold mb-2">
                    {calculateRelativeTime(
                      new Date(`${match.date}T${match.time}`)
                    )}
                  </p>
                  <p className="text-blue-900 font-bold">{match.competition}</p>
                  <p className="text-gray-900 mt-2 font-bold uppercase tracking-widest">
                    {match.venue}
                  </p>

                  <button className="bg-[#0047AB] text-white font-semibold py-2 px-6 rounded-full mt-4 hover:bg-[#003578] transition-colors">
                    Enjoy The Game
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No upcoming matches.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
