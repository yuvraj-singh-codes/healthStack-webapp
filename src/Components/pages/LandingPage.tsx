import { Typography, Button, Grid, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import logo from '../../assets/Group _70.svg'
interface dataTypes {
    icon: string;
    text: string;
    color: string;
    linkTo: string
}
const data: dataTypes[] = [
    {
        icon: "💤",
        text: "Improve Your Sleep",
        color: "#D6F4E6",
        linkTo: "benefit_005"
    },
    {
        icon: "🛡️",
        text: "Boost Your Immune System",
        color: "#E5F0F7",
        linkTo: "benefit_002"
    },
    {
        icon: "🔥",
        text: "Burn Fat",
        color: "#EAFBF6",
        linkTo: "benefit_006"
    },
    {
        icon: "💪",
        text: "Build Strength",
        color: "#F6E7FB",
        linkTo: ""
    },
    {
        icon: "🧘‍♂️",
        text: "Manage Stress",
        color: "#CDEFFB",
        linkTo: "benefit_004"
    },
    {
        icon: "🔍",
        text: "Explore All...",
        color: "#F4F1E6",
        linkTo: "/dashboard/home"
    },
]
const LandingPage = () => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate("/dashboard/home")
    }

    return (
        <Box className="bg_landingpage family" sx={{ maxWidth: 600, margin: "auto", py: 4, textAlign: 'center' }}>
            {/* <p className='logoLandingPage' style={{ color: "#FFFFFF", textAlign: "center", position: "relative" }}>
                HealthStack <sup style={{ color: "#FFDD5C", fontSize: "14px", fontWeight: 700, position: "absolute", top: "-10px", marginLeft: "5px" }}>Beta</sup>
            </p> */}
            <Box>
                <img
                    onClick={() => navigate("/dashboard/home")}
                    src={logo}
                    alt="HealthStack Logo"
                    style={{ height: "35px", cursor: "pointer", marginLeft: "30px" }}
                />
            </Box>
            <Typography className='landing_heading2' textAlign={'center'}>
                Science-Backed Health Made Simple.
            </Typography>
            <Box>
                <img className='logo_img_landing' src='/images/heading.png' alt='' />
            </Box>

            <Button onClick={handleRedirect} sx={{ color: "#000", border: "1px solid #212121", width: "286px", borderRadius: "30px", bgcolor: "#F4F1E6", textTransform: "capitalize", fontWeight: 600, mt: 2 }}>
                Get Started
            </Button>
            <Typography mt={2} sx={{ color: "#ffffff", fontSize: "14px", fontWeight: 400 }}>
                Discover health habits that work for you.
            </Typography>
            <Typography sx={{ color: "#ffffff", fontSize: "14px", fontWeight: 400 }}>
                Backed by over <strong>200 million research publications</strong>.
            </Typography>
            <Box sx={{ width: '100%', p: 1, bgcolor: "#fff", mt: 2 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        data.map((item, index) => (
                            <Grid item xs={6} key={index} >
                                <Button onClick={() => {
                                    if (index === 5) {
                                        navigate(item.linkTo);
                                    } else {
                                        if (index !== 3) {
                                            navigate(`/dashboard/benefit-protocol?id=${item.linkTo}`);
                                        }
                                    }
                                }}
                                    sx={{ bgcolor: item.color, height: "50px", border: "1px solid #212121", borderRadius: "50px", color: "#212121", display: "flex", alignItems: "center", justifyContent: "space-between" }} size='small' fullWidth
                                >
                                    <Typography fontSize={14} ml={'5px'}>
                                        {item.icon}
                                    </Typography>
                                    <Typography sx={{ textTransform: "capitalize", fontWeight: 700, fontSize: 12, wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}>
                                        {item.text}
                                    </Typography>
                                    <IconButton size='small' sx={{ color: "black" }}>
                                        <IoIosArrowForward size={18} />
                                    </IconButton>
                                </Button>
                                {/* <Box onClick={() => {
                                    if (index === 5) {
                                        handleRedirect();
                                    }
                                }} bgcolor={item.color} sx={{ border: "1px solid #212121", borderRadius: "100px", display: "flex", justifyContent: "space-between", alignItems: "center", py: 1,px:"2px",height:"50px" }}>
                                    <Typography fontSize={14} ml={'5px'}>
                                        {item.icon}
                                    </Typography>
                                    <Typography sx={{ textTransform: "capitalize", fontWeight: 700, fontSize: 12, wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal'}}>
                                        {item.text}
                                    </Typography>
                                    <IconButton size='small' sx={{color:"black"}}>
                                    <IoIosArrowForward size={18} />
                                    </IconButton>
                                </Box> */}
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
            <Typography sx={{ marginTop: '1rem', color: "#fff", fontSize: "20px" }}>
                Finally, Health Advice You Can Trust
            </Typography>
            <Typography sx={{ mt: 1, color: "#fff", fontSize: "28px" }}>
                COMPLETELY FREE.
            </Typography>
            <Button onClick={handleRedirect} sx={{ color: "#000", border: "1px solid #212121", width: "286px", borderRadius: "30px", bgcolor: "#F4F1E6", textTransform: "capitalize", fontWeight: 600, mt: 2 }}>
                Try it for yourself
            </Button>
            <Typography sx={{ mt: 1, color: "#fff", fontSize: "14px" }}>
                No Sign-up. No Sponsors. No Fads.
            </Typography>
            <Box sx={{ textAlign: "justify", p: 2 }}>
                <Typography sx={{ color: "#000", fontSize: "16px", fontWeight: "bold" }}>
                    We’re testing things out.
                </Typography>
                <Typography sx={{ color: "#000", fontSize: "12px" }}>
                    HealthStack is in Beta and may not always provide fully accurate or comprehensive information. Please consult a qualified health professional before making any lifestyle changes.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
