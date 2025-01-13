import { Box, Button, Typography } from "@mui/material";
import SearchComponent from "../utils/Search";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        // window.history.back();
        navigate("/dashboard/home")
    }
    return (
        <>
            <SearchComponent />
            <Box
                className="bg_landingpage"
                sx={{
                    py: 1,
                    maxWidth: 600,
                    margin: "auto"
                }}
            >
                <Box px={1} pb={1}>
                    <Typography
                        sx={{
                            fontSize: "16px",
                            color: "#ffffff",
                            textAlign: "center"
                        }}
                    >
                        <strong>Today's world</strong> makes staying healthy complicated - we're here to change that.
                    </Typography>
                    <Typography
                        mt={2}
                        sx={{
                            fontSize: "16px",
                            color: "#ffffff",
                            textAlign: "center"
                        }}
                    >
                        <strong>Our mission</strong> is to make reliable, unbiased, and actionable health knowledge accessible to everyone - for free.
                    </Typography>
                </Box>
                <Box className="family" sx={{ bgcolor: "#fff", textAlign: "center", p: 2}}>
                    <Box>
                        <Typography sx={{ fontSize: "18px", color: "#000", fontWeight: 700 }}>
                            📚 Powered by Science
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#000", }}>
                            No need to sift through complex studies—we distil the science into actionable steps tailored to your health goals.
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography sx={{ fontSize: "18px", color: "#000", fontWeight: 700 }}>
                            ✍️ Simplified for You
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#000", }}>
                            Our algorithms draw from over 200 million research publications to provide reliable, evidence-based information.
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography sx={{ fontSize: "18px", color: "#000", fontWeight: 700 }}>
                            🛡️ Transparent and Unbiased
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#000", }}>
                            Every recommendation highlights the level of evidence without sponsorships or hidden agendas.
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'center', px: 2, }}>
                <Button onClick={handleBack} sx={{ color: "#000", border: "1px solid #212121", width: "286px", borderRadius: "30px", bgcolor: "#F4F1E6", textTransform: "capitalize", fontWeight: 600, mt: 2 }}>
                        Help us improve!
                    </Button>
                    <Typography sx={{ fontSize: "14px", color: "#fff", }}>
                        We’re in Beta - and your voice matters.</Typography>
                    <Typography sx={{ fontSize: "16px", color: "#fff",fontWeight:500 }}>
                        This is just the beginning—there’s so much more coming to HealthStack soon.
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default About;
