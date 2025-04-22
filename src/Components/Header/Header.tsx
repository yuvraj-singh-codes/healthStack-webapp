import {
    Box,
    Typography,
} from "@mui/material";
// import logo from '../../assets/images/homePageLogo.svg';
import logo from "../../assets/images/HealthStack_updated_navbar_logo.svg"
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
                <Box sx={{ display: "flex", alignItems: "center", justifyContent:"space-between", px: 2,pt:2 }}>
                    <img
                     onClick={() => navigate("/")}
                        src={logo}
                        alt="HealthStack Logo"
                        style={{ height: "auto",cursor:"pointer" }}
                    />
                    <Typography sx={{color:"#333333",fontSize:"16px",fontWeight:700}}>Early Access</Typography>
                </Box>
            </Box>
    );
}

export default Header;
