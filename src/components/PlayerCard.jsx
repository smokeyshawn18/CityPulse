import PropTypes from "prop-types";
import {
  FaFutbol,
  FaMedal,
  FaRegFutbol,
  FaRunning,
  FaFlag,
  FaTshirt,
  FaTrophy,
} from "react-icons/fa";
import { CiMedicalCross } from "react-icons/ci";
import { useState, useEffect } from "react";
import { DollarSign } from "lucide-react";

const PlayerCard = ({ player }) => {
  const [activeTab, setActiveTab] = useState("season");
  const [careerStats, setCareerStats] = useState(player.careerStats);

  useEffect(() => {
    if (player.position === "GK") {
      setCareerStats({
        appearances:
          player.careerStats.appearances + player.seasonStats.appearances,
        goalsConceded:
          player.careerStats.goalsConceded + player.seasonStats.goalsConceded,
        cleanSheets:
          player.careerStats.cleanSheets + player.seasonStats.cleanSheets,
      });
    } else {
      setCareerStats({
        appearances:
          player.careerStats.appearances + player.seasonStats.appearances,
        goals: player.careerStats.goals + player.seasonStats.goals,
        assists: player.careerStats.assists + player.seasonStats.assists,
      });
    }
  }, [player]); // Depend only on `player` to prevent unnecessary re-renders
  // Dependency array triggers when seasonStats or player position changes

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-3xl duration-300 ease-in-out">
      {/* Player Image */}
      <div className="relative w-24 h-24 mx-auto mt-4 rounded-full overflow-hidden bg-[#6accf5] shadow-lg clip-star">
        <img
          src={player.image}
          alt={player.name}
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />
      </div>

      {/* Player Info */}
      <div className="p-6 bg-white">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-[#2ea9cb] mb-2 text-center uppercase tracking-widest">
          {player.name}
        </h2>

        {/* Player Rating */}
        {player.fotmobRating && (
          <div className="text-center mb-2">
            <span className="inline-block bg-[#31f448] text-white text-base font-bold py-1 px-3 rounded-full shadow-lg">
              Fotmob Rating: {player.fotmobRating}
            </span>
          </div>
        )}

        <p className="font-bold text-3xl text-center mt-2 mb-4 text-black flex items-center justify-center gap-2">
          <FaTshirt className="text-[#702020] text-4xl" />
          {player.number}
        </p>
        <p className="font-bold text-2xl text-center mt-2 mb-4 text-blue-900 flex items-center justify-center gap-2">
          {/* <DollarSign className="text-[#233e8a] font-bold text-2xl" /> */}$
          {player.value}M
        </p>

        <p className="text-[#000000] mb-4 text-xl font-bold text-center">
          {player.position}
        </p>

        <img
          src={player.country}
          alt={player.country}
          className="w-10 h-8 mx-auto mb-4"
        />

        <p className="text-[#10252b] mb-6 text-2xl font-bold text-center uppercase">
          {player.age}
        </p>

        {/* Injured Section */}
        {player.injured && (
          <div className="text-center mb-3 mt-[-1em]">
            <div className="inline-block bg-white text-red-600 p-2">
              <CiMedicalCross className="text-4xl" />
            </div>
            <span className="block font-extrabold text-[#e11d48] text-lg mb-2">
              {player.injuryDetails.type} / {player.injuryDetails.tm}
            </span>
            <p className="text-gray-700 font-bold">
              Expected return: {player.injuryDetails.recoveryTime}
            </p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex justify-center mb-4 space-x-2">
          <button
            className={`px-4 py-2 mx-1 font-bold text-sm uppercase tracking-wider rounded-full flex items-center ${
              activeTab === "season"
                ? "bg-[#1e3a8a] text-white shadow-md"
                : "bg-[#f0f4f8] text-[#1e3a8a] hover:bg-[#e2e8f0]"
            } transition-colors duration-300 ease-in-out`}
            onClick={() => setActiveTab("season")}
          >
            <FaMedal className="mr-2" />
            This Season
          </button>
          <button
            className={`px-4 py-2 mx-1 font-bold text-sm uppercase tracking-wider rounded-full flex items-center ${
              activeTab === "career"
                ? "bg-[#1e3a8a] text-white shadow-md"
                : "bg-[#f0f4f8] text-[#1e3a8a] hover:bg-[#e2e8f0]"
            } transition-colors duration-300 ease-in-out`}
            onClick={() => setActiveTab("career")}
          >
            <FaTrophy className="mr-2" />
            Career Stats
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          {activeTab === "career" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FaRunning className="mr-2 text-[#1e3a8a]" />
                <span className="flex-1 text-lg text-[#1e3a8a] font-extrabold">
                  <strong className="text-green-600">Matches:</strong>{" "}
                  {careerStats.appearances}
                </span>
              </div>

              {player.position === "GK" ? (
                <>
                  <div className="flex items-center justify-between">
                    <FaFutbol className="mr-2 text-[#1e3a8a]" />
                    <span className="flex-1 text-lg text-[#1e3a8a] font-extrabold">
                      <strong className="text-red-600">Goals Conceded:</strong>{" "}
                      {careerStats.goalsConceded}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <FaRegFutbol className="mr-2 text-[#1e3a8a]" />
                    <span className="flex-1 text-lg text-[#1e3a8a] font-extrabold">
                      <strong className="text-purple-600">Clean Sheets:</strong>{" "}
                      {careerStats.cleanSheets}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <FaFutbol className="mr-2 text-[#1e3a8a]" />
                    <span className="flex-1 text-lg text-[#1e3a8a] font-extrabold">
                      <strong className="text-pink-600">Goals:</strong>{" "}
                      {careerStats.goals}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <FaRegFutbol className="mr-2 text-[#1e3a8a]" />
                    <span className="flex-1 text-lg text-[#1e3a8a] font-extrabold">
                      <strong className="text-purple-600">Assists:</strong>{" "}
                      {careerStats.assists}
                    </span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FaFlag className="mr-2 text-[#272373]" />
                <span className="flex-1 text-lg text-[#24205e] font-extrabold">
                  <strong className="text-green-700">Matches:</strong>{" "}
                  {player.seasonStats.appearances}
                </span>
              </div>

              {player.position === "GK" ? (
                <>
                  <div className="flex items-center justify-between">
                    <FaFutbol className="mr-2 text-[#272465]" />
                    <span className="flex-1 text-lg text-[#29266a] font-extrabold">
                      <strong className="text-red-700">Goals Conceded:</strong>{" "}
                      {player.seasonStats.goalsConceded}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <FaRegFutbol className="mr-2 text-[#25225b]" />
                    <span className="flex-1 text-lg text-[#272468] font-extrabold">
                      <strong className="text-purple-700">Clean Sheets:</strong>{" "}
                      {player.seasonStats.cleanSheets}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <FaFutbol className="mr-2 text-[#272465]" />
                    <span className="flex-1 text-lg text-[#29266a] font-extrabold">
                      <strong className="text-pink-700">Goals:</strong>{" "}
                      {player.seasonStats.goals}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <FaRegFutbol className="mr-2 text-[#25225b]" />
                    <span className="flex-1 text-lg text-[#272468] font-extrabold">
                      <strong className="text-purple-700">Assists:</strong>{" "}
                      {player.seasonStats.assists}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PlayerCard.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,

    position: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    injured: PropTypes.bool,
    injuryDetails: PropTypes.shape({
      type: PropTypes.string,
      recoveryTime: PropTypes.string,
      tm: PropTypes.string,
    }),
    seasonStats: PropTypes.shape({
      appearances: PropTypes.number.isRequired,
      goals: PropTypes.number,
      assists: PropTypes.number,
      goalsConceded: PropTypes.number, // Only for GKs
      cleanSheets: PropTypes.number, // Only for GKs
    }).isRequired,
    careerStats: PropTypes.shape({
      appearances: PropTypes.number.isRequired,
      goals: PropTypes.number,
      assists: PropTypes.number,
      goalsConceded: PropTypes.number, // Only for GKs
      cleanSheets: PropTypes.number, // Only for GKs
    }).isRequired,
  }).isRequired,
};

export default PlayerCard;
