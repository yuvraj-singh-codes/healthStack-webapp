import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/pages/LandingPage";
import HomePage from "./Components/pages/Home";
import Dashboard from "./Components/pages/Dashboard";
import Feedback from "./Components/pages/FeedBack";
import About from "./Components/pages/About";
import BenefitProtocolPage from "./Components/pages/BenefitProtocolPage";
import ProtocolBenefitPage from "./Components/pages/ProtocolBenefitPage";
import ClaimPage from "./Components/pages/ClaimPage";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import FeedBackAlert from "./Components/FeedBackAlert";
import { Box } from "@mui/material";

export default function App() {
  const [open, setOpen] = React.useState(false);
  // const [clickCount, setClickCount] = useState<number>(0);
  const [formData, setFormData] = React.useState({
    rating: 0,
    feedbackType: "",
    feedbackText: "",
    name: "",
    email: "",
  });

  // Retrieve or generate the session ID
  const sessionID = sessionStorage.getItem("sessionID") || Date.now().toString(); // Use the current time as a fallback session ID
  sessionStorage.setItem("sessionID", sessionID); // Store the session ID in sessionStorage

  const handleRatingClick = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rating: prevFormData.rating === index + 1 ? index : index + 1,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   const handleUserClick = () => {
  //     setClickCount((prevCount) => prevCount + 1);
  //   };

  //   window.addEventListener("click", handleUserClick);
  //   return () => {
  //     window.removeEventListener("click", handleUserClick);
  //   };
  // }, []);

  // useEffect(() => {
  //   const startTime = Date.now();
  //   const popupShown = sessionStorage.getItem("popupShown") === "true";

  //   const checkConditions = () => {
  //     const timeSpent = (Date.now() - startTime) / 1000; // Convert to seconds
  //     if (clickCount >= 7 && timeSpent >= 30 && !popupShown) {
  //       setOpen(true);
  //       sessionStorage.setItem("popupShown", "true");
  //     }
  //   };

  //   const interval = setInterval(checkConditions, 1000); // Check conditions every second
  //   return () => clearInterval(interval);
  // }, [clickCount]);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Box>
          {/* Routes for the main application */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/home" element={<HomePage />} />
              <Route
                path="/dashboard/feedback"
                element={
                  <Feedback
                    setOpen={setOpen}
                    handleRatingClick={handleRatingClick}
                    formData={formData}
                    setFormData={setFormData}
                  />
                }
              />
              <Route path="/dashboard/about" element={<About />} />
              <Route
                path="/dashboard/benefit-protocol"
                element={<BenefitProtocolPage />}
              />
              <Route
                path="/dashboard/protocol-benefit"
                element={<ProtocolBenefitPage />}
              />
              <Route path="/dashboard/claim" element={<ClaimPage setOpen={setOpen} />} />
            </Route>
          </Routes>

          <FeedBackAlert
            open={open}
            onClose={handleClose}
            handleRatingClick={handleRatingClick}
            formData={formData}
          />
        </Box>
      </BrowserRouter>
    </Provider>
  );
}
