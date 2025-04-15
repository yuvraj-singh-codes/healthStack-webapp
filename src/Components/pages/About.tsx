import { Box, Button, Typography } from "@mui/material";
import SearchComponent from "../utils/Search";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/dashboard/home");
    };

    return (
        <Box>
            <SearchComponent />
            <Box
                sx={{
                    py: 1,
                    maxWidth: 600,
                    margin: "auto",
                }}
            >
                <Box px={1} pb={1}>
                    <Typography
                        sx={{
                            fontSize: "16px",
                            color: "#333333",
                            textAlign: "center",
                        }}
                    >
                        <Box component="span" sx={{ color: "#226296", fontWeight: 700 }}>
                            Today's world
                        </Box>{" "}
                        makes staying healthy complicated - we're here to change that.
                    </Typography>
                    <Typography
                        mt={2}
                        sx={{
                            fontSize: "16px",
                            color: "#333333",
                            textAlign: "center",
                        }}
                    >
                        <Box component="span" sx={{ color: "#00C853", fontWeight: 700 }}>
                            Our mission
                        </Box>{" "}
                        is to make reliable, unbiased, and actionable health knowledge accessible to everyone —{" "}
                        <Box component="span" sx={{ fontStyle: "italic" }}>
                            for free.
                        </Box>
                    </Typography>
                </Box>

                <Box sx={{ bgcolor: "#F0EFEF", textAlign: "center", p: 2 }}>
                    <Box>
                        <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: 700 }}>
                            📚 Powered by Science
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#333333" }}>
                            Our algorithms draw from over 200 million research publications to provide reliable, evidence-based information.
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: 700 }}>
                            ✍️ Simplified for You
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#333333" }}>
                            No need to sift through complex studies—we distill the science into actionable steps tailored to your health goals.
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: 700 }}>
                            🛡️ Transparent and Unbiased
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#333333" }}>
                            Every protocol includes a clear summary of the supporting evidence—free from sponsorships or hidden agendas.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ textAlign: "center", px: 2 }}>
                    <Typography sx={{ fontSize: "16px", color: "#333333", fontWeight: 500, mt: 1 }}>
                        This is just the beginning—there’s so much more coming to HealthStack. Stay tuned!
                    </Typography>
                    <Button
                        onClick={handleBack}
                        sx={{
                            color: "#fff",
                            width: "286px",
                            borderRadius: "30px",
                            bgcolor: "#00C853",
                            textTransform: "capitalize",
                            fontWeight: 600,
                            mt: 2,
                            ":hover":{bgcolor:"#00B44A"}
                        }}
                    >
                        Help us improve
                    </Button>

                </Box>
            </Box>
        </Box>
    );
};

export default About;
