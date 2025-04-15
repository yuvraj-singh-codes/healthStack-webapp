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
                bgcolor: "#F0EFEF",
                height: "100vh",
                alignItems: "center",
                position:"relative",
                maxWidth:600,
                margin:"auto"
            }}
        >
            {/* Header */}
            <div className="family" style={{ overflow: "auto", height: "90vh", alignItems: "center", position: "relative",fontFamily:"Open Sans" }}>
                <Header />
                <Outlet />
            </div>
            {/* Bottom Navigation */}
            <Box sx={{position:"fixed",bottom:"0px",left:"0px",width:"100%"}}>
            <BottomNav />
            </Box>
        </Box>
    );
}

export default Dashboard;
