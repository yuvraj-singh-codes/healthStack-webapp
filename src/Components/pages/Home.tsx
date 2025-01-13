import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardMedia, Button } from '@mui/material';
import mainImg from '../../assets/mainUIImage.svg'
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
import jsonData from '../../healthstack_data_example.json'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../../features/tabSlice';
import { RootState } from '../../Store/Store';
import { setBenefit, setProtocol } from '../../features/allStateSlice';
import { CommonSearch } from '../utils/CommonSearch';
import SkeletonLoader from '../utils/Skeleton';

const HomePage: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const benefit = useSelector((state: RootState) => state.app.benefit);
    const benefitLoading = useSelector((state: RootState) => state.app.benefitLoading);
    const protocol = useSelector((state: RootState) => state.app.protocol);
    const protocolLoading = useSelector((state: RootState) => state.app.protocolLoading);
    const activeTab = useSelector((state: RootState) => state.tabvalue.tab)
    const search = useSelector((state: RootState) => state.search.search);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { protocols, benefits } = jsonData;
    const handleTabChange = (value: number) => {
        dispatch(setValue(value))
    };
    useEffect(() => {
        setSearchTerm(search)
    }, [search])
    useEffect(() => {
        setSearchTerm(search)
        dispatch(setBenefit(benefits));
        dispatch(setProtocol(protocols));
    }, [dispatch])
    const benefitFilterOption = ["Name (A-Z)", "Name (Z-A)"]
    const protocolFilterOption = ["Time", "Cost", "Name (A-Z)", "Name (Z-A)"]
    const [selectedSortValue, setSelectedSortValue] = useState<Record<string, boolean>>(
        () => benefitFilterOption.reduce((acc, option) => {
            acc[option] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );
    const uniqueProtocolCategories = Array.from(
        new Set(
            protocols.flatMap(item => item.protocolCategories)
        )
    );
    const uniqueBenefitCategories = Array.from(
        new Set(
            benefits.flatMap(item => item.benefitCategories)
        )
    );
    const filterOptionsProtocol = uniqueProtocolCategories;
    const filterOptionsBenefit = uniqueBenefitCategories;

    const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>(
        () => filterOptionsBenefit.reduce((acc, option) => {
            acc[option] = true;
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
        if (activeTab === 0) {
            // setSelectedSortValue((prev) => ({
            //     ...Object.keys(prev).reduce((acc, key) => {
            //         acc[key] = false;
            //         return acc;
            //     }, {} as Record<string, boolean>),
            //     [label]: true,
            // }));
            setSelectedSortValue((prev) => {
                const isSelected = prev[label];
                return {
                    ...Object.keys(prev).reduce((acc, key) => {
                        acc[key] = false; 
                        return acc;
                    }, {} as Record<string, boolean>),
                    [label]: !isSelected, 
                };
            });
        } else if (activeTab === 1) {
            setSelectedSortValue((prev) => {
                const updated = { ...prev };
                if (label === "Name (A-Z)") {
                    updated["Name (Z-A)"] = false;
                } else if (label === "Name (Z-A)") {
                    updated["Name (A-Z)"] = false;
                }
                updated[label] = !prev[label];
                return updated;
            });
        }
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
        dispatch(setProtocol(filterProtocols));
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
        dispatch(setBenefit(filteredBenefits));
    }, [benefits, selectedFilters])

    useEffect(() => {
        if (selectedSortValue["Name (A-Z)"]) {
            const sortedBenefits = [...benefits].sort((a, b) => a.benefitName.localeCompare(b.benefitName));
            dispatch(setBenefit(sortedBenefits));
        } else if (selectedSortValue["Name (Z-A)"]) {
            const sortedBenefits = [...benefits].sort((a, b) => b.benefitName.localeCompare(a.benefitName));
            dispatch(setBenefit(sortedBenefits));
        } else {
            dispatch(setBenefit(benefits));
        }
    }, [benefits, selectedSortValue]);

    useEffect(() => {
        const sorted = [...protocols].sort((a, b) => {
            if (selectedSortValue["Time"] && selectedSortValue["Cost"]) {
                // First, sort by Time, then by Cost if Time is the same
                const timeComparison = a.protocolRelativeTimeRating - b.protocolRelativeTimeRating;
                if (timeComparison !== 0) return timeComparison;
                return a.protocolRelativeCostRating - b.protocolRelativeCostRating;
            }
            if (selectedSortValue["Time"]) {
                return a.protocolRelativeTimeRating - b.protocolRelativeTimeRating;
            }
            if (selectedSortValue["Cost"]) {
                return a.protocolRelativeCostRating - b.protocolRelativeCostRating;
            }
            if (selectedSortValue["Name (A-Z)"]) {
                return a.protocolName.localeCompare(b.protocolName); // Sort alphabetically
            }
            if (selectedSortValue["Name (Z-A)"]) {
                return b.protocolName.localeCompare(a.protocolName); // Sort in reverse alphabetical order
            }
            return 0;
        });
        dispatch(setProtocol(sorted));
    }, [protocols, selectedSortValue]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        if (searchTerm.trim() === "") {
            dispatch(setBenefit(benefits));
            dispatch(setProtocol(protocols));
        } else {
            const lowerCaseTerm = searchTerm.toLowerCase();
            if (activeTab === 0) {
                const filtered = benefit.filter((item) =>
                    item.benefitSearchTerms.some((search) =>
                        search.toLowerCase().includes(lowerCaseTerm)
                    )
                );
                dispatch(setBenefit(filtered));
            } else {
                const filtered = protocol.filter((item) =>
                    item.protocolSearchTerms.some((search) =>
                        search.toLowerCase().includes(lowerCaseTerm)
                    )
                );
                dispatch(setProtocol(filtered));
            }
        }
    }, [activeTab, searchTerm, dispatch]);

    // useEffect(() => {
    //     setSearchTerm("")
    // }, [activeTab])

    return (
        <Box sx={{ maxWidth: 600, margin: "auto" }}>
            {/* Banner */}
            <CommonSearch onChange={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Box
                sx={{
                    backgroundImage: `url(${mainImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "168px",
                    display: "flex",
                    justifyContent: "center",
                    color: "#ffffff",
                    textAlign: "center",
                    px: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "#212121",
                        position: "absolute",
                        mt: 6
                    }}
                >
                    Empower your health journey with science-backed protocols.
                </Typography>
            </Box>

            {/* Tabs */}
            <Box display="flex" alignItems="center" p={1} sx={{ position: "sticky", top: "57px", zIndex: 100, bgcolor: "#fff" }}>
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
                <Box sx={{ padding: 2, bgcolor: '#EAF5F6' }}>
                    {
                        benefitLoading ? <SkeletonLoader /> : (
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
                                                className="scrollbar"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                                                    p: 1,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: { xs: "70px", sm: "70px", md: "100px", lg: "120px" },
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "wrap",
                                                    overflow: "auto",
                                                    color: "#000"
                                                }}
                                            >
                                                <Typography
                                                    sx={{ fontWeight: 'bold', color: '#212121', textAlign: "center", fontSize: "12px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                                                >
                                                    {item.benefitName}
                                                </Typography>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))) : (
                                    <Grid item xs={12}>
                                        <Typography textAlign={'center'}>No Benefit data found</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        )
                    }
                </Box>
            ) : (
                <Box sx={{ padding: 2, bgcolor: '#F4F1E6' }}>
                    {
                        protocolLoading ? <SkeletonLoader /> : (
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
                                                className="scrollbar"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                                                    // backdropFilter: 'blur(0.1px)',
                                                    p: 1,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: { xs: "70px", sm: "70px", md: "100px", lg: "120px" },
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "wrap",
                                                    overflow: "auto",
                                                    color: "#000"
                                                }}
                                            >
                                                <Typography
                                                    sx={{ fontWeight: 'bold', color: '#212121', textAlign: "center", fontSize: "12px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                                                >
                                                    {item.protocolName}
                                                </Typography>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))) : (
                                    <Grid item xs={12}>
                                        <Typography textAlign={'center'}>No Protocol data found</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        )
                    }
                </Box>
            )}
        </Box>
    );
};

export default HomePage;
