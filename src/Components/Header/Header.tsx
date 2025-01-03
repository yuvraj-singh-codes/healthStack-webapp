import {
    Box,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import logo from '../../assets/HS_logo_wText.svg';
import { FiSearch } from 'react-icons/fi';
import { IoMdArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

function Header() {
    // const navigate = useNavigate();

    const handleBack = () => {
        window.history.back();
        // navigate("/");
    };
    return (
            <Box
                sx={{
                    zIndex: 100000,
                    // height: "18vh",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    borderBottom: "2px solid lightgray",
                    maxWidth: 600, margin: "auto",
                }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    <img
                        src={logo}
                        alt="HealthStack Logo"
                        style={{ height: "35px", }}
                    />
                    <Typography sx={{ color: "#49454F", fontSize: "16px", fontWeight: 400 }}>Early Access</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "20px", px: 2,pb:1 }}>
                    <IoMdArrowBack onClick={handleBack} size={24} style={{ cursor: "pointer" }} />
                    <TextField
                        size="small"
                        fullWidth
                        sx={{
                            color: "#212121",
                            borderRadius: "50px",
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                borderColor: "#212121"
                            },
                            '::placeholder': {
                                fontStyle: 'italic',
                            },
                        }}
                        type="text"
                        placeholder="Search HealthStack"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FiSearch size={20} color="#888" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
    );
}

export default Header;
