import React, { useState, useEffect } from "react";
import { Calendar, Clock, Loader2 } from "lucide-react";
import mcity from "../assets/images/logo.svg";
import Bou from "../assets/images/bour.webp";
import Fa from "../assets/images/fa.jpg";

const Schedule = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch matches.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.matches && Array.isArray(data.matches)) {
          // Filter upcoming matches from API
          const apiMatches = data.matches.filter(
            (match) => match.status === "TIMED"
          );

          // Manually add more matches (Ensure the structure matches API data)
          const manualMatches = [
            {
              id: "99901",
              homeTeam: { name: "Man City", crest: mcity },
              awayTeam: {
                name: "Bournemouth",
                crest: Bou,
              },
              competition: {
                name: "Qf - FA Cup",
                emblem: Fa,
              },
              utcDate: "2025-03-29T15:00:00Z",
              status: "TIMED",
            },
            // {
            //   id: "99902",
            //   homeTeam: { name: "Chelsea", crest: "/path-to-chelsea-logo.png" },
            //   awayTeam: { name: "Man City", crest: "/path-to-city-logo.png" },
            //   competition: {
            //     name: "Premier League",
            //     emblem: "/path-to-pl-logo.png",
            //   },
            //   utcDate: "2024-09-05T18:30:00Z",
            //   status: "TIMED",
            // },
          ];

          // Combine both API and manually added matches
          const allMatches = [...apiMatches, ...manualMatches];

          // Sort matches in ascending order by date
          allMatches.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

          setMatches(allMatches);
        } else {
          console.error("Matches data is not in the expected format");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDaysToGo = (utcDate) => {
    const matchDate = new Date(utcDate);
    const currentDate = new Date();
    matchDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const timeDifference = matchDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) return "Today";
    if (daysDifference === 1) return "Tomorrow";
    if (daysDifference < 0) return "Past Match";
    return `${daysDifference} days to go`;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#87CEEB] via-[#1E90FF] to-[#00B7EB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 flex items-center justify-center gap-3">
          <Calendar className="w-8 h-8 text-[#1A4268]" />
          Upcoming Matches
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="w-12 h-12 text-[#1A4268] animate-spin" />
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => {
              const { homeTeam, awayTeam, utcDate, competition } = match;

              return (
                <div
                  key={match.id}
                  className="bg-sky-100 backdrop-blur-lg rounded-2xl p-6 border border-[#1A4268]/30 hover:border-[#1A4268]/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 flex justify-center">
                        <img
                          src={homeTeam.crest}
                          alt={homeTeam.name}
                          className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full border-2 border-[#1A4268]/50"
                        />
                      </div>
                      <span className="text-[#1A4268] font-bold text-2xl md:text-3xl px-2">
                        VS
                      </span>
                      <div className="flex-1 flex justify-center">
                        <img
                          src={awayTeam.crest}
                          alt={awayTeam.name}
                          className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full "
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <img
                          src={competition.emblem}
                          alt={competition.name}
                          className="w-20 h-20 object-contain rounded-xl"
                        />
                        <span className="text-black font-semibold uppercase tracking-wider">
                          | {competition.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <Clock className="w-5 h-5 text-[#1A4268]" />
                        <span className="text-black text-sm md:text-base font-medium">
                          {formatDate(utcDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-[#1A4268] text-sm md:text-base font-bold bg-white/30 px-3 py-1 rounded-full">
                          {getDaysToGo(utcDate)}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-[#1E90FF] hover:bg-[#1A4268] text-white py-2 px-4 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
                      Match Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-black/80 py-20">
            <p className="text-lg font-medium">
              No upcoming matches scheduled.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Schedule;
