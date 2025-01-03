import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardMedia, Button } from '@mui/material';
import mainImg from '../../assets/mainUIImage.svg'
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
import jsonData from '../../JSON_Example/JSON_example_vShort.json'
import { Benefit, Protocol } from '../Interface/Interface';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [protocolData, setprotocolData] = useState<Protocol[]>([]);
    const [benifitData, setbenifitData] = useState<Benefit[]>([]);
    const nevigate = useNavigate();
    useEffect(() => {
        setbenifitData(jsonData.benefits as unknown as Benefit[])
    }, [jsonData, activeTab])
    const handleTabChange = (value: number) => {
        setActiveTab(value);

        // Set data based on the active tab
        if (value === 0) {
            setbenifitData(jsonData.benefits as unknown as Benefit[]);
        } else {
            setprotocolData(jsonData.protocols as unknown as Protocol[]);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "auto" }}>
            {/* Banner */}
            <Box
                sx={{
                    backgroundImage: `url(${mainImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "168px",
                    display: "flex",
                    alignItems: "center",
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
                    }}
                >
                    Empower your health journey with science-backed protocols.
                </Typography>
            </Box>

            {/* Tabs */}
            <Box display="flex" alignItems="center" p={1}>
                <Box sx={{ border: '1px solid #94a5bd', borderRadius: "50px" }}>
                    <Button
                        onClick={() => handleTabChange(0)}
                        sx={{
                            bgcolor: activeTab === 0 ? "#49454F" : "#fff",
                            borderRadius: "50px",
                            color: activeTab === 0 ? "#fff" : "#212121",
                            fontWeight: activeTab === 0 ? "bold" : "",
                            textTransform: "capitalize",
                            px: 2,
                            "&:hover": { bgcolor: activeTab === 0 ? "#3d3a42" : "#f0f0f0" }, // Hover effect fix
                        }}
                    >
                        Benefits
                    </Button>
                    <Button
                        onClick={() => handleTabChange(1)}
                        sx={{
                            bgcolor: activeTab === 1 ? "#49454F" : "#fff",
                            borderRadius: "50px",
                            color: activeTab === 1 ? "#fff" : "#212121",
                            fontWeight: activeTab === 1 ? "bold" : "",
                            textTransform: "capitalize",
                            px: 2,
                            "&:hover": { bgcolor: activeTab === 1 ? "#3d3a42" : "#f0f0f0" }, // Hover effect fix
                        }}
                    >
                        Protocols
                    </Button>
                </Box>

                <Box marginLeft="auto" display="flex" alignItems="center">
                    <SortMenu />
                    <FilterMenu />
                </Box>
            </Box>
            {/* Benifit cards */}
            {
                activeTab === 0 ? (
                    <Box sx={{ padding: 2, bgcolor: '#EAF5F6' }}>
                        <Grid container spacing={2}>
                            {benifitData.map((item, index) => (
                                <Grid item xs={4} sm={4} key={index}>
                                    <Card
                                        onClick={() => { nevigate(`/dashboard/benefit-protocol?id=${item.benefitID}`) }}
                                        sx={{
                                            position: 'relative',
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={item.benefitImageID}
                                            alt={item.benefitName}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '100%',
                                                bgcolor: 'rgba(255, 255, 255, 0.5)',
                                                backdropFilter: 'blur(0.1px)',
                                                padding: 1,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: "auto"
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontWeight: 'bold', color: '#212121', textAlign: 'center', fontSize: "12px" }}
                                            >
                                                {`<${item.benefitName}>`}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    <Box sx={{ padding: 2, bgcolor: '#EAF5F6' }}>
                        {/* Protocol cards */}
                        <Grid container spacing={2}>
                            {protocolData.map((item, index) => (
                                <Grid item xs={4} sm={4} key={index}>
                                    <Card
                                        onClick={() => {nevigate(`/dashboard/protocol-benefit?id=${item.protocolID}`) }}
                                        sx={{
                                            position: 'relative',
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={item.protocolImageID}
                                            alt={item.protocolName}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '100%',
                                                bgcolor: 'rgba(255, 255, 255, 0.5)',
                                                backdropFilter: 'blur(0.1px)',
                                                padding: 1,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: "auto"
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontWeight: 'bold', color: '#212121', textAlign: 'center', fontSize: "12px" }}
                                            >
                                                {`<${item.protocolName}>`}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )
            }
        </Box>
    );
};

export default HomePage;
