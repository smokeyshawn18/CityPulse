import React, { useState, useEffect } from "react";
import { Clock, Loader2, PlayCircle } from "lucide-react";

const LiveMatches = () => {
  const [liveMatches, setLiveMatches] = useState([]);
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
        console.log("API Response: ", data);
        if (data.matches && Array.isArray(data.matches)) {
          // Filter for live matches (IN_PLAY or PAUSED)
          const currentMatches = data.matches.filter(
            (match) => match.status === "IN_PLAY" || match.status === "PAUSED"
          );
          setLiveMatches(currentMatches);
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

  // Format match time (assuming API provides lastUpdated or similar)
  const formatTime = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="min-h-screen mb-6 bg-gradient-to-br from-[#87CEEB] via-[#1E90FF] to-[#00B7EB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 flex items-center justify-center gap-3">
          <PlayCircle className="w-8 h-8 text-[#1A4268]" />
          Live Matches
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="w-12 h-12 text-[#1A4268] animate-spin" />
          </div>
        ) : liveMatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map((match) => {
              const {
                homeTeam,
                awayTeam,
                score,
                utcDate,
                competition,
                status,
              } = match;
              const homeScore = score?.fullTime?.home || 0;
              const awayScore = score?.fullTime?.away || 0;

              return (
                <div
                  key={match.id}
                  className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-[#1A4268]/30 hover:border-[#1A4268]/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="space-y-6">
                    {/* Teams and Score */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 flex justify-center">
                        <img
                          src={homeTeam.crest}
                          alt="Home team"
                          className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full border-2 border-[#1A4268]/50"
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-[#1A4268] font-bold text-2xl md:text-3xl">
                          {homeScore} - {awayScore}
                        </span>
                        <p className="text-white text-sm mt-1">
                          {status === "IN_PLAY" ? "Live" : "Paused"}
                        </p>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <img
                          src={awayTeam.crest}
                          alt="Away team"
                          className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full border-2 border-[#1A4268]/50"
                        />
                      </div>
                    </div>

                    {/* Competition and Time */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={competition.emblem}
                            alt={competition.name}
                            className="w-20 h-20 object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <Clock className="w-5 h-5 text-[#1A4268]" />
                        <span className="text-white text-sm md:text-base font-medium">
                          {formatTime(utcDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-[#1A4268] text-sm md:text-base font-bold bg-white/30 px-3 py-1 rounded-full">
                          {status === "IN_PLAY"
                            ? "Playing Now"
                            : "Match Paused"}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <button className="w-full bg-[#1E90FF] hover:bg-[#1A4268] text-white py-2 px-4 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
                      Live Updates
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-white/80 py-20">
            <p className="text-lg font-medium">No live matches currently.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveMatches;
