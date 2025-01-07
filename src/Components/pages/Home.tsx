import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardMedia, Button } from '@mui/material';
import mainImg from '../../assets/mainUIImage.svg'
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
// import jsonData from '../../JSON_Example/JSON_example_vShort.json'
import jsonData from '../../JSON_Example/healthstack_data_example.json'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../../features/tabSlice';
import { RootState } from '../../Store/Store';
import { Benefit, Protocol } from '../Interface/Interface';

const HomePage: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [benefit, setBenefit] = useState<Benefit[]>([])
    const [protocol, setProtocol] = useState<Protocol[]>([])
    const { protocols, benefits } = jsonData;
    const activeTab = useSelector((state: RootState) => state.tabvalue.tab)
    const handleTabChange = (value: number) => {
        dispatch(setValue(value))
    };
    // const claimFilterOption = ["Easy Wins", "Overall Evidence Rating"]
    const benefitFilterOption = ["Name"]
    const protocolFilterOption = ["Time", "Cost"]
    const [selectedSortValue, setSelectedSortValue] = useState<Record<string, boolean>>(
        () => benefitFilterOption.reduce((acc, option) => {
            acc[option] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );
    useEffect(() => {
        if (activeTab === 1) {
            setSelectedSortValue(
                protocolFilterOption.reduce((acc, option) => {
                    acc[option] = false;
                    return acc;
                }, {} as Record<string, boolean>)
            );
        } else if (activeTab === 0) {
            setSelectedSortValue(
                benefitFilterOption.reduce((acc, option) => {
                    acc[option] = false;
                    return acc;
                }, {} as Record<string, boolean>)
            );
        }
    }, [activeTab]);

    const filterOptionsProtocol = ["Behaviour", "Food", "Supplements", "Dietary"];
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
    const handleSortChange = (label: string) => {
        setSelectedSortValue((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    useEffect(() => {
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
        setProtocol(filterProtocols);
    }, [protocols, selectedFilters])

    useEffect(() => {
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
        setBenefit(filteredBenefits)
    }, [benefits, selectedFilters])

    useEffect(() => {
        if (selectedSortValue.Name) {
            const sortedBenefits = [...benefits].sort((a, b) => a.benefitName.localeCompare(b.benefitName));
            setBenefit(sortedBenefits);
        } else {
            setBenefit(benefits);
        }
    }, [benefits, selectedSortValue]);

    useEffect(() => {
        const sorted = [...protocols].sort((a, b) => {
            if (selectedSortValue.Time && selectedSortValue.Cost) {
                // First, sort by Time, then by Cost if Time is the same
                const timeComparison = a.protocolRelativeTimeRating - b.protocolRelativeTimeRating;
                if (timeComparison !== 0) return timeComparison;
                return a.protocolRelativeCostRating - b.protocolRelativeCostRating;
            }
            if (selectedSortValue.Time) {
                return a.protocolRelativeTimeRating - b.protocolRelativeTimeRating;
            } else if (selectedSortValue.Cost) {
                return a.protocolRelativeCostRating - b.protocolRelativeCostRating;
            }
            return 0;
        });
        setProtocol(sorted);
    }, [protocols, selectedSortValue]);

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
                    px: 4,
                    // position: "sticky",
                    // top: "58px",
                    // zIndex: 10000,
                }}
            >
                {/* <img src='/images/mainUIImage.svg' alt='' height={'auto'} width={'auto'} style={{zIndex:1000}} /> */}
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "#212121",
                        position: "absolute",

                    }}
                >
                    Empower your health journey with science-backed protocols.
                </Typography>
            </Box>

            {/* Tabs */}
            <Box display="flex" alignItems="center" p={1} sx={{ position: "sticky", top: "57px", zIndex: 100,bgcolor:"#fff" }}>
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
                    <SortMenu onChange={handleSortChange} selectedSortValue={selectedSortValue} options={activeTab === 1 ? protocolFilterOption : benefitFilterOption} />
                    <FilterMenu
                        options={activeTab === 1 ? filterOptionsProtocol : filterOptionsBenefit}
                        onChange={handleFilterChange}
                        selectedFilters={selectedFilters}
                    />
                </Box>
            </Box>

            {/* Cards Display */}
            {activeTab === 0 ? (
                <Box sx={{ padding: 2, bgcolor: '#F4F1E6' }}>
                    <Grid container spacing={2}>
                        {benefit?.length > 0 ? (benefit?.map((item, index) => (
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
                                            // backdropFilter: 'blur(0.1px)',
                                            padding: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: { xs: "60px", sm: "70px", md: "100px", lg: "120px" },
                                            textOverflow: "ellipsis",
                                            whiteSpace: "wrap",
                                            overflow: "auto",
                                            color: "#000"
                                        }}
                                    >
                                        <Typography
                                            sx={{ fontWeight: 'bold', color: '#212121', textAlign: 'center', fontSize: "12px" }}
                                        >
                                            {item.benefitName}
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
                        {protocol?.length > 0 ? (protocol?.map((item, index) => (
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
                                            // backdropFilter: 'blur(0.1px)',
                                            padding: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: { xs: "60px", sm: "70px", md: "100px", lg: "120px" },
                                            textOverflow: "ellipsis",
                                            whiteSpace: "wrap",
                                            overflow: "auto",
                                            color: "#000"
                                        }}
                                    >
                                        <Typography
                                            sx={{ fontWeight: 'bold', color: '#212121', textAlign: 'center', fontSize: "12px" }}
                                        >
                                            {item.protocolName}
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
