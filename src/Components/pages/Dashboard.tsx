import {
    Box,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import BottomNav from "../BottomNav/BottomNavigation";
import Header from "../Header/Header";

function Dashboard() {
    return (
        <Box
            sx={{
                bgcolor: "#FFFFFF",
                height: "100vh",
                alignItems: "center"
            }}
        >
            {/* Header */}
            <Header />
            <Box sx={{ overflow: "auto", height: "72vh", alignItems: "center" }}>
                <Outlet />
            </Box>
            {/* Bottom Navigation */}
            <BottomNav />
        </Box>
    );
}

export default Dashboard;
