import { Typography, Button, Grid, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
// import Logo from "../../assets/images/landingPageLogo.svg";
import Logo from "../../assets/images/HealthStack_updated_logo.svg"
// import buildStrenght from "../../assets/images/buildStrength.png";
// import boostImmunity from "../../assets/images/boostImmunity.png";
import buildStrenght from "../../assets/images/updated_buildStrength.svg";
import boostImmunity from "../../assets/images/updated_boostImmunity.svg";
import browsAll from "../../assets/images/browseAll.png";
// import improveSleep from "../../assets/images/improveSleep.png";
import improveSleep from "../../assets/images/updated_improveSleep.svg";
import LandingPageModal from '../utils/LandingPageModal';
import { useEffect, useState } from 'react';
interface dataTypes {
    icon: string;
    text: string;
    color: string;
    linkTo: string
}
const data: dataTypes[] = [
    {
        icon: buildStrenght,
        text: "Build Strength",
        color: "#226296",
        linkTo: "benefit_019"
    },
    {
        icon: boostImmunity,
        text: "Boost your immunity",
        color: "#226296",
        linkTo: "benefit_002"
    },
    {
        icon: improveSleep,
        text: "Improve Your Sleep",
        color: "#226296",
        linkTo: "benefit_005"
    },
    {
        icon: browsAll,
        text: "Browse All",
        color: "#226296",
        linkTo: "/dashboard/home"
    },
]
const LandingPage = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleRedirect = () => {
        navigate("/dashboard/home")
    }

    useEffect(() => {
        const hasLandingPageTour = localStorage.getItem('isLandingPageTour');
        if (!hasLandingPageTour) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                localStorage.setItem('isLandingPageTour', 'true');
            }, 1000); // 1 second delay

            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, []);
    return (
        <Box className="bg-[#FFFFFF] family" sx={{ maxWidth: 600, margin: "auto", py: 4, textAlign: 'center' }}>
            <LandingPageModal isOpen={isOpen} onClose={setIsOpen} />
            <Box>
                <img
                    onClick={() => navigate("/dashboard/home")}
                    src={Logo}
                    alt="HealthStack Logo"
                    style={{ height: "auto", width: "auto", cursor: "pointer" }}
                />
            </Box>
            <Typography sx={{ color: "#333333", fontSize: "14px", fontWeight: 400 }}>
                Discover <strong style={{color:"#00C853"}}>health habits</strong> <br/> that work for you.
            </Typography>
            <Button onClick={handleRedirect} sx={{ color: "#fff", my:1, width: "256px", borderRadius: "30px", bgcolor: "#00C853", textTransform: "capitalize", fontWeight: 700, fontSize: "22px",":hover":{bgcolor: "#00C865"} }}>
                Get Started
            </Button>
            <Typography sx={{ color: "#333333", fontSize: "14px", fontWeight: 400 }}>
                Backed by over  <strong>200 million research publications.</strong>
            </Typography>
            <Box sx={{ width: '100%', px: 4, py: 2, bgcolor: "#F0EFEF", my: 1 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        data.map((item, index) => (
                            <Grid item xs={12} key={index} >
                                <Button
                                    size='small' fullWidth
                                    sx={{ bgcolor: item.text === "Browse All" ? "#226296" : "#ffffff", height: "50px", border: item.text === "Browse All" ? "1px solid #226296" : "1px solid #A8A8A8", borderRadius: "50px", color: "#212121", display: "flex", alignItems: "center", justifyContent: "space-between", pr: 0, pl: 2, mt: 0, ":hover": {  bgcolor: item.text === "Browse All" ? "#226296" : "#ffffff", color: "#212121" } }}
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.text}
                                        style={{ height: "40px", width: "40px" }}
                                    />
                                    <Typography sx={{ textTransform: "capitalize", fontWeight: 700, fontSize: 16, wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal', color: item.text === "Browse All" ? "#ffffff" : item.color }}>
                                        {item.text}
                                    </Typography>
                                    <IconButton onClick={() => {
                                        if (index === 3) {
                                            navigate(item.linkTo);
                                        } else {
                                            navigate(`/dashboard/benefit-protocol?id=${item.linkTo}`);
                                        }
                                    }} size='small' sx={{color: item.text === "Browse All" ? "#226296" : "#fff", bgcolor: item.text === "Browse All" ? "#ffffff" : "#226296", height: "49px", width: "50px",":hover":{ color: item.text === "Browse All" ? "#226296" : "#fff", bgcolor: item.text === "Browse All" ? "#ffffff" : "#226296"} }}>
                                        <IoIosArrowForward size={40} />
                                    </IconButton>
                                </Button>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
            <Typography sx={{ marginTop: '1rem', color: "#333333", fontSize: "20px", fontWeight: 700, px: 8 }}>
                Finally, Health Advice You Can Trust.
            </Typography>
            <Button onClick={handleRedirect} sx={{ color: "#fff", width: "256px", borderRadius: "30px", bgcolor: "#00C853", textTransform: "capitalize", fontWeight: 700, my: 1, fontSize: "22px" ,":hover":{bgcolor: "#00C865"}}}>
                Try it for yourself
            </Button>
            <Typography sx={{ color: "#333333", fontSize: "14px" }}>
            No sponsors. No fads. Just science.
            </Typography>
        </Box>
    );
};

export default LandingPage;
