import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardMedia, Button } from '@mui/material';
import mainImg from '../../assets/mainUIImage.svg'
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
// import jsonData from '../../JSON_Example/JSON_example_vShort.json'
import jsonData from '../../JSON_Example/healthstack_data_example.json'
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    const { protocols, benefits } = jsonData;

    const handleTabChange = (value: number) => {
        setActiveTab(value);
    };
console.log(protocols.length,"=====protocols");

    const filterOptionsProtocol = ["Behaviour", "Food", "Supplements","Dietary"];
    const filterOptionsBenefit = ["Physical Health", "Mental Health"];

    const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>(
        () => filterOptionsBenefit.reduce((acc, option) => {
            acc[option] = true;
            return acc;
        }, {} as Record<string, boolean>)
    );

    useEffect(() => {
        if (activeTab === 1) {
            setSelectedFilters(
                filterOptionsProtocol.reduce((acc, option) => {
                    acc[option] = true;
                    return acc;
                }, {} as Record<string, boolean>)
            );
        } else if (activeTab === 0) {
            setSelectedFilters(
                filterOptionsBenefit.reduce((acc, option) => {
                    acc[option] = true;
                    return acc;
                }, {} as Record<string, boolean>)
            );
        }
    }, [activeTab]);

    const handleFilterChange = (label: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const filterProtocols = protocols
        .map((protocol) => ({
            ...protocol,
            protocolCategories: protocol.protocolCategories.filter((category) =>
                Object.keys(selectedFilters).some(
                    (key) => selectedFilters[key] && category.includes(key)
                )
            ),
        }))
        .filter((protocol) => protocol.protocolCategories?.length > 0);

    const filteredBenefits = benefits
        .map((benefit) => ({
            ...benefit,
            benefitCategories: benefit.benefitCategories.filter((category) =>
                Object.keys(selectedFilters).some(
                    (key) => selectedFilters[key] && category.includes(key)
                )
            ),
        }))
        .filter((benefit) => benefit.benefitCategories?.length > 0);

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
                            "&:hover": { bgcolor: activeTab === 0 ? "#3d3a42" : "#f0f0f0" },
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
                            "&:hover": { bgcolor: activeTab === 1 ? "#3d3a42" : "#f0f0f0" },
                        }}
                    >
                        Protocols
                    </Button>
                </Box>

                <Box marginLeft="auto" display="flex" alignItems="center">
                    <SortMenu />
                    <FilterMenu
                        options={activeTab === 1 ? filterOptionsProtocol : filterOptionsBenefit}
                        onChange={handleFilterChange}
                        selectedFilters={selectedFilters}
                    />
                </Box>
            </Box>

            {/* Cards Display */}
            {activeTab === 0 ? (
                <Box sx={{ padding: 2, bgcolor: '#EAF5F6' }}>
                    <Grid container spacing={2}>
                        {filteredBenefits?.length > 0 ? (filteredBenefits?.map((item, index) => (
                            <Grid item xs={4} sm={4} key={index}>
                                <Card
                                    onClick={() => { navigate(`/dashboard/benefit-protocol?id=${item.benefitID}`) }}
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
                        ))) : (
                            <Grid item xs={12}>
                                <Typography textAlign={'center'}>No Benefit data found!!</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            ) : (
                <Box sx={{ padding: 2, bgcolor: '#EAF5F6' }}>
                    <Grid container spacing={2}>
                        {filterProtocols?.length > 0 ? (filterProtocols?.map((item, index) => (
                            <Grid item xs={4} sm={4} key={index}>
                                <Card
                                    onClick={() => { navigate(`/dashboard/protocol-benefit?id=${item.protocolID}`) }}
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
                        ))) : (
                            <Grid item xs={12}>
                                <Typography textAlign={'center'}>No Protocol data found!!</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default HomePage;
