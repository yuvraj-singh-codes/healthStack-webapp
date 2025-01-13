import {
    Box,
} from "@mui/material";
import logo from '../../assets/Group_171.svg';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate=useNavigate();
    return (
            <Box
                sx={{
                    zIndex: 100000,
                    // height: "18vh",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    maxWidth: 600, margin: "auto",
                }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent:"start", px: 2,pt:2 }}>
                    <img
                     onClick={() => navigate("/dashboard/home")}
                        src={logo}
                        alt="HealthStack Logo"
                        style={{ height: "35px",cursor:"pointer" }}
                    /> 
                </Box>
            </Box>
    );
}

export default Header;
