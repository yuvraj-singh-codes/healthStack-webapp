import {
    Box,
    InputAdornment,
    TextField,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import BottomNav from "../BottomNav/BottomNavigation";
import Header from "../Header/Header";
import { FiSearch } from 'react-icons/fi';
import { IoMdArrowBack } from "react-icons/io";

function Dashboard() {
    const handleBack = () => {
        window.history.back();
    };
    return (
        <Box
            sx={{
                bgcolor: "#FFFFFF",
                height: "100vh",
                alignItems: "center",
                position:"relative",
                maxWidth:600,
                margin:"auto"
            }}
        >
            {/* Header */}
            <Box sx={{ overflow: "auto", height: "90vh", alignItems: "center", position: "relative" }}>
                <Header />
                {/* <Box sx={{ display: "flex", alignItems: "center", gap: "20px", px: 2, pb: 1, position: "sticky", top: 0, bgcolor: "#fff", py: 1, zIndex: 100, borderBottom: "2px solid lightgray",maxWidth:600,margin:"auto" }}>
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
                </Box> */}
                <Outlet />
            </Box>
            {/* Bottom Navigation */}
            <Box sx={{position:"fixed",bottom:"0px",left:"0px",width:"100%"}}>
            <BottomNav />
            </Box>
        </Box>
    );
}

export default Dashboard;
