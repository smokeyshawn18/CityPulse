"use client"
import { useState } from "react";
import premierLeague from "../../assets/images/pl.jpeg";
import faCup from "../../assets/images/fa-cup.jpg";
import champ from "../../assets/images/cl.jpg";
import shield from "../../assets/images/shield.jpg";
import supercup from "../../assets/images/super.png";
import fifa from "../../assets/images/fifaa.jpg";
import carabao from "../../assets/images/carabao.webp";
import Image from "next/image";

// Add images for all trophies

const TrophyCabinet = () => {
  const [selectedTrophy, setSelectedTrophy] = useState(null);

  const trophies = [
    {
      name: "Premier League",
      image: "/assets/images/pl.jpeg",
      wins: 10,
      years: [
        "1936/37", "1967/68", "2011/12", "2013/14", "2017/18", 
        "2018/19", "2020/21", "2021/22", "2022/23", "2023/24"
      ],
      gradient: "from-sky-400 to-blue-600"
    },
    {
      name: "FA Cup",
      image: "/assets/images/fa-cup.jpg",
      wins: 7,
      years: ["1903/04", "1933/34", "1955/56", "1968/69", "2010/11", "2018/19", "2021/22"],
      gradient: "from-red-400 to-red-600"
    },
    {
      name: "Champions League",
      image: "/assets/images/cl.jpg",
      wins: 1,
      years: ["2022/23"],
      gradient: "from-purple-400 to-indigo-600"
    },
    {
      name: "FIFA Club World Cup",
      image: "/assets/images/fifaa.jpg",
      wins: 1,
      years: ["2023"],
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      name: "Community Shield",
      image: "/assets/images/shield.jpg",
      wins: 7,
      years: ["1937", "1968", "1972", "2012", "2018", "2019", "2024"],
      gradient: "from-gray-400 to-gray-600"
    },
    {
      name: "UEFA Super Cup",
      image: "/assets/images/super.png",
      wins: 1,
      years: ["2022/23"],
      gradient: "from-blue-400 to-purple-600"
    },
    {
      name: "Carabao Cup",
      image: "/assets/images/carabao.webp",
      wins: 8,
      years: ["1969/70", "1975/76", "2013/14", "2015/16", "2017/18", "2018/19", "2019/20", "2020/21"],
      gradient: "from-green-400 to-teal-600"
    }
  ];

  const handleClick = (trophy) => {
    setSelectedTrophy(trophy);
  };

  const closeModal = () => {
    setSelectedTrophy(null);
  };

  return (
   <section className="py-16 bg-sky-100 dark:bg-gray-950">
    
  <div className="container mx-auto">
    <h2 className="text-4xl text-sky-900 dark:text-white font-extrabold text-center mb-8 uppercase tracking-wider">
      Trophy Cabinet
    </h2>
    <p className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300 mb-8 px-4 md:px-0">
      A showcase of our champion&apos;s achievements.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
      {trophies.map((trophy, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 relative"
          onClick={() => handleClick(trophy)}
        >
          <Image
         width={400}
         height={100}
         quality={100}
            src={trophy.image}
            alt={trophy.name}
            className=" object-cover rounded-t-lg transition-shadow duration-300 hover:shadow-2xl"
          />
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-[#004C8C] dark:text-white mb-2">
              {trophy.name}
            </h3>
            <span className="inline-block bg-[#3c9dec] dark:bg-[#1e6fb8] text-white px-4 py-1 rounded-lg font-bold text-lg">
              {trophy.wins} {trophy.wins > 1 ? "Wins" : "Win"}
            </span>
          </div>
          <div className="absolute inset-0 bg-blue-100 dark:bg-gray-700 opacity-0 hover:opacity-40 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>

    {/* Modal */}
    {selectedTrophy && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-[#004C8C] dark:text-white mb-4 text-center">
              {selectedTrophy.name} - Winning Years
            </h3>
            <ul className="text-center mb-4">
              {selectedTrophy.years.map((year, i) => (
                <li key={i} className="text-lg font-bold text-[#214e6e] dark:text-gray-300">
                  {year}
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-[#3c9dec] dark:bg-[#1e6fb8] text-white py-2 rounded-lg font-bold text-lg hover:bg-[#1e6fb8] transition-colors duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</section>

  );
};

export default TrophyCabinet;
