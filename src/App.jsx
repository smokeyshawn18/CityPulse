import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Schedule from "./pages/Schedule.jsx";
import Results from "./pages/Result.jsx";
import TrophyCabinet from "./pages/Trophy.jsx";
import PlayerSection from "./pages/PlayerSection.jsx";
import Footer from "./components/Footer.jsx";
import History from "./pages/History.jsx";
import News from "./components/News.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import InstallPopup from "./components/InstallApp.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/results" element={<Results />} />
        <Route path="/trophy-cabinet" element={<TrophyCabinet />} />
        <Route path="/Player-Card" element={<PlayerSection />} />
        <Route path="/History" element={<History />} />
      </Routes>

      <Footer />
      <InstallPopup />
    </Router>
  );
};

export default App;
