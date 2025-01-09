import React, { useEffect, useState } from "react";
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
  const [clickCount, setClickCount] = useState<number>(0);
  const [formData, setFormData] = React.useState({
    rating: 0,
    feedbackType: "",
    feedbackText: "",
    name: "",
    email: "",
  });
  const [errors, setErrors] = React.useState({
    feedbackType: false,
    rating: false,
  });

  const validation = () => {
    let hasError = false;

    if (!formData.feedbackType) {
      setErrors((prev) => ({ ...prev, feedbackType: true }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, feedbackType: false }));
    }

    if (formData.rating === 0) {
      setErrors((prev) => ({ ...prev, rating: true }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, rating: false }));
    }

    return hasError;
  };

  const handleRatingClick = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rating: prevFormData.rating === index + 1 ? index : index + 1,
    }));
  };

  const handleSubmit = () => {
    if (!validation()) return;
    console.log("Form Submitted===", formData);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleUserClick = () => {
      setClickCount((prevCount:number) => prevCount + 1);
    };
    window.addEventListener("click", handleUserClick);
    return () => {
      window.removeEventListener("click", handleUserClick);
    };
  }, []);

  useEffect(() => {
    if (clickCount >= 7 && !open) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [clickCount]);
  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setOpen(true);
  //   }, 30000);

  //   return () => clearTimeout(timer);
  // }, []);

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
                    errors={errors}
                    handleSubmit={handleSubmit}
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
              <Route path="/dashboard/claim" element={<ClaimPage />} />
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
