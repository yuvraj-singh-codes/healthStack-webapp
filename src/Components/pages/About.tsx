import { Box, Typography, List, ListItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import ClaimPage from "./ClaimPage";

const About = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                p:2,
                maxWidth: 600, margin: "auto",
            }}
        >
            <Typography sx={{fontSize:"24px",color:"#000",}}>
                About HealthStack
            </Typography>

            <Box my={4}>
                <Typography sx={{fontSize:"20px",color:"#000",fontWeight:"600"}}>
                    Your Health, Simplified
                </Typography>
                <Typography sx={{fontSize:"16px",color:"#000"}}>
                    Navigating health and wellness can be overwhelming:
                </Typography>
                <List>
                    {[
                        "❌ Conflicting advice everywhere.",
                        "❌ Forgetting helpful insights.",
                        "❌ Wondering if an action will make a difference.",
                    ].map((text, index) => (
                        <ListItem sx={{ fontSize: "16px", color: "#000",pr:0 }} key={index}>
                            {text}
                        </ListItem>
                    ))}
                </List>
                <Typography>
                    HealthStack cuts through the noise with science-backed clarity.
                </Typography>
            </Box>

            <Box mb={4}>
                <Typography sx={{fontSize:"20px",color:"#000",fontWeight:"600"}}>
                    HealthStack is Different
                </Typography>
                <Typography sx={{fontSize:"16px",color:"#000",}}>
                    Your easy-to-use health companion, offering:
                </Typography>
                <List>
                    {[
                        "✅ Trusted, evidence-based guidance.",
                        "✅ A searchable catalogue to stay organized.",
                        "✅ Clear insights on time, cost, and impact.",
                    ].map((text, index) => (
                        <ListItem sx={{ fontSize: "16px", color: "#000",pr:0 }} key={index}>
                            {text}
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box mb={4}>
                <Typography sx={{fontSize:"20px",color:"#000",fontWeight:"600"}}>
                    Why Early Access?
                </Typography>
                <Typography sx={{fontSize:"16px",color:"#000"}}>
                    This is just the beginning! Your feedback will help us improve
                    HealthStack for everyone.
                </Typography>
                <Typography>Planned Features:</Typography>
                <List>
                    {[
                        "📚 More Protocols and Benefits",
                        "🎯 Tailored recommendations and progress tracking",
                        "🏆 Achievements to keep you motivated",
                        "💡 Habit-forming tools and notifications",
                        "🧭 Native apps for optimised navigation on Android and iPhone",
                    ].map((text, index) => (
                        <ListItem sx={{ fontSize: "16px", color: "#000",pr:0 }} key={index}>
                            {text}
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box>
                <Typography sx={{fontSize:"20px",color:"#000",fontWeight:"600"}}>
                    Help us Improve!
                </Typography>
                <Typography sx={{fontSize:"16px",color:"#000"}}>
                    Help us shape the future of HealthStack! Share your feedback, ideas,
                    and suggestions.
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 4 }}>
                <Button
                    onClick={() => navigate("/dashboard/feedback")}
                    sx={{
                        // mt: 2,
                        bgcolor: "#D4C89E",
                        border: "1px solid #212121",
                        color: "#212121",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        width: "219px",
                        height: "40px",
                        "&:hover": {
                            backgroundColor: "#000",
                            color: "#fff",
                        },
                    }}
                >
                    Feedback Page
                </Button>
            </Box>
            {/* <ClaimPage/> */}
        </Box>
    );
};

export default About;
