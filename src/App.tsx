import { Box } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Components/pages/LandingPage";
import HomePage from "./Components/pages/Home";
import Dashboard from "./Components/pages/Dashboard";
import Feedback from "./Components/pages/FeedBack";
import About from "./Components/pages/About";
import BenefitProtocolPage from "./Components/pages/BenifitProtocolPage";
import ProtocolBenefitPage from "./Components/pages/ProtocolBenefitPage";
import ClaimPage from "./Components/pages/ClaimPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children:[
        {
          path: "/dashboard/home",
          element: <HomePage />,
        },
        {
          path: "/dashboard/feedback",
          element: <Feedback />,
        },
        {
          path: "/dashboard/about",
          element: <About />,
        },
        {
          path: "/dashboard/benefit-protocol",
          element: <BenefitProtocolPage />,
        },
        {
          path: "/dashboard/protocol-benefit",
          element: <ProtocolBenefitPage />,
        },
        {
          path: "/dashboard/claim",
          element: <ClaimPage />,
        },
      ]
    },
   
  ]);
  return (
    <Box>
        <RouterProvider router={router} />
    </Box>
  );
}