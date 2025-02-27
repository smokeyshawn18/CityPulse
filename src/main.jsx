import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Results from "./pages/Result";
import TrophyCabinet from "./pages/Trophy";
import PlayerSection from "./pages/PlayerSection";
import Footer from "./components/Footer";
import History from "./pages/History";
import News from "./components/News";
import ScrollToTop from "./components/ScrollToTop";
import InstallPopup from "./components/InstallApp";

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
        {/* Add additional routes as needed */}
      </Routes>
      <Footer />
      <InstallPopup />
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
