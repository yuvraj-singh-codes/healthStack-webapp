import {
    BottomNavigation, BottomNavigationAction
} from "@mui/material";
import { TiMessages } from "react-icons/ti";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function BottomNav() {
    const [navValue, setNavValue] = useState<number>(0);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Set the navValue based on the current path
        if (location.pathname === "/dashboard/home") {
            setNavValue(0);
        } else if (location.pathname === "/dashboard/feedback") {
            setNavValue(1);
        } else if (location.pathname === "/dashboard/about") {
            setNavValue(2);
        }
    }, [location.pathname]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event);

        if (newValue === 0) {
            navigate("/dashboard/home");
        } else if (newValue === 1) {
            navigate("/dashboard/feedback");
        } else if (newValue === 2) {
            navigate("/dashboard/about");
        }
        setNavValue(newValue);
    };

    return (
        <BottomNavigation
            value={navValue}
            onChange={handleChange}
            showLabels
            sx={{
                height: "10vh",
                bgcolor: "#fff",
                borderTop: "2px solid lightgray",
                maxWidth: 600,
                margin: "auto",
            }}
        >
            <BottomNavigationAction
                sx={{
                    fontSize: "8px",
                    borderTop: navValue === 0 ? "5px solid #000" : "none",
                    "& .MuiBottomNavigationAction-label": {
                        color: "#333333", // Set label color to black
                    },
                }}
                label="Home"
                icon={<IoHomeOutline style={{ color: "#000", fontWeight: "bold" }} size={20} />}
            />
            <BottomNavigationAction
                sx={{
                    fontSize: "8px",
                    borderTop: navValue === 1 ? "5px solid #000" : "none",
                    "& .MuiBottomNavigationAction-label": {
                        color: "#333333", // Set label color to black
                    },
                }}
                label="Send us Feedback"
                icon={<TiMessages style={{ color: "#000", fontWeight: "bold" }} size={20} />}
            />
            <BottomNavigationAction
                sx={{
                    fontSize: "8px",
                    borderTop: navValue === 2 ? "5px solid #000" : "none",
                    "& .MuiBottomNavigationAction-label": {
                        color: "#333333", // Set label color to black
                    },
                }}
                label="About"
                icon={<IoMdInformationCircleOutline style={{ color: "#000", fontWeight: "bold" }} size={20} />}
            />
        </BottomNavigation>
    );
}

export default BottomNav;
