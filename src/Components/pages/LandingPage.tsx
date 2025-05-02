import { Typography, Button, Grid, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import Logo from "../../assets/images/HealthStack_updated_logo.svg"
import energyIcon from "../../assets/images/energy.svg";
import sleepIcon from "../../assets/images/sleep.svg";
import browsAll from "../../assets/images/browsAll.svg";
import immunityIcon from "../../assets/images/immunity.svg";
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
        icon: energyIcon,
        text: "Boost Your Energy",
        color: "#226296",
        // linkTo: "benefit_019",
        linkTo: "benefit_018",
    },
    {
        icon: sleepIcon,
        text: "Improve Your Sleep",
        color: "#226296",
        //  linkTo: "benefit_002"
        linkTo: "benefit_008"
    },
    {
        icon: immunityIcon,
        text: "Strengthen Your Immunity",
        color: "#226296",
        // linkTo: "benefit_005"
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
        const hasOpened = sessionStorage.getItem('hasOpened');

        if (!hasOpened) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('hasOpened', 'true');
            }, 1000); // 1 second delay

            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, []);
    return (
        <Box className="bg-[#FFFFFF] family" sx={{ maxWidth: 600, margin: "auto", py: 2, textAlign: 'center' }}>
            <LandingPageModal isOpen={isOpen} onClose={setIsOpen} />
            <Box>
                <img
                    onClick={() => navigate("/dashboard/home")}
                    src={Logo}
                    alt="HealthStack Logo"
                    style={{ height: "90px", width: "auto", cursor: "pointer" }}
                />
            </Box>
            <Typography sx={{ color: "#333333", fontSize: "24px", fontWeight: 600 }}>
                Discover <strong style={{ color: "#00C853" }}>health habits</strong> <br /> that work for <strong style={{color:"#226296"}} >you.</strong>
            </Typography>
            <Button size='small' onClick={handleRedirect} sx={{ color: "#fff", my: 1, width: "256px", borderRadius: "30px", bgcolor: "#00C853", textTransform: "capitalize", fontWeight: 700, fontSize: "20px", ":hover": { bgcolor: "#00C865" } }}>
                Get Started
            </Button>
            <Typography sx={{ color: "#333333", fontSize: "14px", fontWeight: 400 }}>
                Backed by over  <strong>200 million research publications.</strong>
            </Typography>
            <Box sx={{ width: '100%', px: 3, py: 1.5, bgcolor: "#F0EFEF", my: 1 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        data.map((item, index) => (
                            <Grid item xs={12} key={index} >
                                <Button
                                 onClick={() => {
                                    if (index === 3) {
                                        navigate(item.linkTo);
                                    } else {
                                        navigate(`/dashboard/benefit-protocol?id=${item.linkTo}`);
                                    }
                                }}
                                    size='small' fullWidth
                                    sx={{ bgcolor: item.text === "Browse All" ? "#226296" : "#ffffff", height: "51px", border: item.text === "Browse All" ? "1px solid #226296" : "1px solid #A8A8A8", borderRadius: "100px", color: "#212121", display: "flex", alignItems: "center", justifyContent: "space-between", pr: 0, pl: 2, mt: 0, ":hover": { bgcolor: item.text === "Browse All" ? "#226296" : "#ffffff", color: "#212121" } }}
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.text}
                                        style={{ height: "36px", width: "36px" }}
                                    />
                                    <Typography sx={{ textTransform: "capitalize", fontWeight: 700, fontSize: 14, wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal', color: item.text === "Browse All" ? "#ffffff" : item.color }}>
                                        {item.text}
                                    </Typography>
                                    <IconButton size='small' sx={{ color: item.text === "Browse All" ? "#226296" : "#fff", bgcolor: item.text === "Browse All" ? "#ffffff" : "#226296", height: "49px", width: "49px", ":hover": { color: item.text === "Browse All" ? "#226296" : "#fff", bgcolor: item.text === "Browse All" ? "#ffffff" : "#226296" } }}>
                                        <IoIosArrowForward size={40} />
                                    </IconButton>
                                </Button>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
            <Typography sx={{ marginTop: 1, color: "#333333", fontSize: "18px", fontWeight: 700, px: 8 }}>
                Finally, Health Advice You Can Trust.
            </Typography>
            <Button size='small' onClick={handleRedirect} sx={{ color: "#fff", width: "256px", borderRadius: "30px", bgcolor: "#00C853", textTransform: "capitalize", fontWeight: 700, my: 1, fontSize: "20px", ":hover": { bgcolor: "#00C865" } }}>
                Try it for yourself
            </Button>
            <Typography sx={{ color: "#333333", fontSize: "14px" }}>
                No sponsors. No fads. Just science.
            </Typography>
        </Box>
    );
};

export default LandingPage;
