import {
    Box,
    Typography,
} from "@mui/material";
import logo from '../../assets/HS_logo_wText.svg';

function Header() {
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
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2,pt:2 }}>
                    <img
                        src={logo}
                        alt="HealthStack Logo"
                        style={{ height: "35px", }}
                    />
                    <Typography sx={{ color: "#49454F", fontSize: "16px", fontWeight: 400 }}>Early Access</Typography>
                </Box>
            </Box>
    );
}

export default Header;
