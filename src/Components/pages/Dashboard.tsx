import {
    Box,
} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../BottomNav/BottomNavigation";
import Header from "../Header/Header";
import Paragraph from "../utils/Paragraph";

function Dashboard() {
    const loaction = useLocation();
    const path = loaction.pathname;
    console.log(path);
    // const [open, setOpen] = React.useState(false);
    return (
        <Box
            sx={{
                bgcolor: "#ffffff",
                height: "100vh",
                alignItems: "center",
                position: "relative",
                maxWidth: 600,
                margin: "auto"
            }}
        >
            {/* Header */}
            <div className="family" style={{ overflow: "auto", height: "85vh", alignItems: "center", position: "relative", fontFamily: "Open Sans" }}>
                <Header />
                <Outlet />
            </div>
            {
                path.includes("/dashboard/benefit-protocol") || path.includes("/dashboard/protocol-benefit") || path.includes("/dashboard/claim") ?
                    <Box sx={{ height: "5vh", width: "100%", bgcolor: "#ffffff", px: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Paragraph />
                    </Box> : ""

            }
            {/* Bottom Navigation */}
            <Box sx={{ position: "fixed", bottom: "0px", left: "0px", width: "100%" }}>
                <BottomNav />
            </Box>
        </Box>
    );
}

export default Dashboard;
