import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import ReactGA from 'react-ga4';
import PrivacyPolicy from "./Components/pages/PrivacyPolicy";
import CookieConsent from 'react-cookie-consent';


function TrackPageViews() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);
  return null;
}

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

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Box>
          <TrackPageViews />
          <CookieConsent buttonText="Accept" onAccept={() => ReactGA.initialize('G-KDDY2YF56F')}>
            Analytics improve our site. No personal data. <a href="/privacy-policy">More</a>
          </CookieConsent>
          {/* Routes for the main application */}
          <Routes>
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/" element={<Navigate to="/landingPage" replace />} />
            <Route path="/landingPage" element={<LandingPage />} />
            {/* <Route path="/" element={<LandingPage />} /> */}
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
            open={false}   //open={open} 
            onClose={handleClose}
            handleRatingClick={handleRatingClick}
            formData={formData}
          />   
        </Box>
      </BrowserRouter>
    </Provider>
  );
}
