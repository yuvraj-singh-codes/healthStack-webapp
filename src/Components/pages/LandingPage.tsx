import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import mainImg from '../../assets/mainUIImage.svg'
import logo from '../../assets/HS_logo_wText.svg'

function LandingPage() {
    const navigate = useNavigate();

    const handleEnter = () => {
        navigate("/dashboard/home");
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto' }} >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1 }}>
                <img
                    onClick={() => navigate("/dashboard/home")}
                    src={logo}
                    alt="HealthStack Logo"
                    style={{ height: "35px",cursor:"pointer" }}
                />
                <Typography onClick={() => navigate("/dashboard/about")} sx={{ color: "#49454F", fontSize: "18px", fontWeight: 700,cursor:"pointer" }}>Early Access</Typography>
            </Box>
            <Typography variant="h5" sx={{ mt: 2, p: 2, color: "#212121", fontSize: "20px", fontWeight: 700 }}>
                Welcome to HealthStack.
            </Typography>
            <Box
                sx={{
                    backgroundImage: `url(${mainImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "168px",
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    textAlign: "center",
                    px: 4
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "#212121",
                        mt:2
                    }}
                >
                    Empower your health journey with science-backed protocols.
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography sx={{ mt: 2, fontSize: "16px", color: "#212121" }}>
                    How It Works
                </Typography>
                <Typography sx={{ mt: 2, fontSize: "16px", color: "#212121" }}>HealthStack simplifies health decisions with <strong>natural protocols</strong> focused on:</Typography>
                <ul style={{ color: "#212121", fontSize: "16px", paddingLeft: "20px", marginTop: "10px" }}>
                    <li>Behavior (e.g., sleep improvement, meditation)</li>
                    <li>Food (e.g., wholegrains, omega-3 foods)</li>
                    <li>Supplements (e.g., green tea extract)</li>
                </ul>
                <Box mt={2}>
                    <Typography sx={{ color: "#212121", fontSize: "16px" }}><strong>🔍 Explore Protocols:</strong> Browse protocols linked to specific health benefits.</Typography>
                    <Typography sx={{ color: "#212121", fontSize: "16px" }}><strong>📚 Backed by Science:</strong> Powered by over 200 million research publications.</Typography>
                    <Typography sx={{ color: "#212121", fontSize: "16px" }}><strong>⚙️ Tailored for You:</strong> Filter by time, cost, and evidence strength to find what works best for you.</Typography>
                </Box>
                <Box>
                    <Typography sx={{ color: "#212121", fontSize: "14px", fontWeight: 600, py: 2 }}>
                        We are currently in our test phase and would love your feedback!
                    </Typography>
                    <Typography sx={{ color: "#212121", fontSize: "14px" }}>
                        Disclaimer
                    </Typography>
                    <Typography sx={{ color: "#212121", fontSize: "14px" }}>
                        While HealthStack strives to provide accurate and reliable information, it is possible that the data provided is inaccurate or incorrect. By clicking "Enter" below, you acknowledge that HealthStack provides general information only and is not a substitute for professional health advice. You agree to consult a qualified health professional before making any lifestyle changes.
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button
                        sx={{ mt: 2, bgcolor: "#D4C89E", border: "1px solid #212121", color: "#212121", textTransform: "capitalize", fontWeight: "bold", width: "219px", height: "40px" }}
                        onClick={handleEnter}
                    >
                        Enter
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default LandingPage;