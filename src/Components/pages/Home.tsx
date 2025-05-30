import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, Button } from '@mui/material';
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
import HomePageModal from '../utils/HomePageModal';
import ConfirmTourModal from '../utils/ConfirmTourModal';
import timerIcon from "../../assets/images/timer.svg";
import dollarIcon from "../../assets/images/dollar.svg"
import StatusIndicator from '../utils/StatusIndicator';
import { colorBoxes } from '../utils/StatusColor';


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
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { protocols, benefits } = jsonData;
    const handleTabChange = (value: number) => {
        dispatch(setValue(value))
    };
    useEffect(() => {
        setSearchTerm(search)
    }, [search])
    useEffect(() => {
        setSearchTerm(search)
        // dispatch(setBenefit(benefits));
        // dispatch(setProtocol(protocols));
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
        setSearchTerm("");
        setSelectedFilters((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };
    const handleSelectAll = () => {
        const options = activeTab === 1 ? filterOptionsProtocol : filterOptionsBenefit;
        const allSelected = options.every((option) => selectedFilters[option]);
        const newState = options.reduce((acc, option) => {
            acc[option] = !allSelected;
            return acc;
        }, {} as Record<string, boolean>);
        setSelectedFilters(newState);
    };
    const handleSortChange = (label: string) => {
        setSearchTerm("");
        if (activeTab === 0) {
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
        if (searchTerm.trim() !== "") {
            searchItems();
        }
    }, [selectedFilters])

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
        if (searchTerm.trim() !== "") {
            searchItems();
        }
    }, [selectedFilters])

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
        if (searchTerm.trim() !== "") {
            searchItems();
        }
    }, [selectedSortValue]);

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
        if (searchTerm.trim() !== "") {
            searchItems();
        }
    }, [selectedSortValue]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };
    const searchItems = () => {
        if (searchTerm.trim() === "") {
            dispatch(setBenefit(benefits));
            dispatch(setProtocol(protocols));
        } else {
            const lowerCaseTerm = searchTerm.toLowerCase();
            if (activeTab === 0) {
                const filtered = benefits.filter((item) =>
                    item.benefitSearchTerms.some((search) =>
                        search.toLowerCase().includes(lowerCaseTerm)
                    )
                );
                dispatch(setBenefit(filtered));
            } else {
                const filtered = protocols.filter((item) =>
                    item.protocolSearchTerms.some((search) =>
                        search.toLowerCase().includes(lowerCaseTerm)
                    )
                );
                dispatch(setProtocol(filtered));
            }
        }
    }
    useEffect(() => {
        searchItems();
    }, [activeTab, searchTerm, dispatch]);

    useEffect(() => {
        const hasHomeTour = localStorage.getItem('isHomeModalTour');
        if (!hasHomeTour) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                localStorage.setItem('isHomeModalTour', 'true');
            }, 1000); // 1 second delay

            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, []);

    return (
        <Box sx={{ maxWidth: 600, margin: "auto" }}>
            {/* Banner */}
            <CommonSearch onChange={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <HomePageModal isOpen={isOpen} onClose={setIsOpen} />
            <ConfirmTourModal onClose={setIsOpen} />
            {/* Tabs */}
            <Box sx={{ position: "sticky", top: "57px", zIndex: 100, bgcolor: "#ffffff" }}>
                <Box p={1} sx={{ display: "flex", justifyContent: "start" }}>
                    <Box sx={{ border: '1px solid #A8A8A8', borderRadius: "50px" }}>
                        <Button
                            onClick={() => handleTabChange(0)}
                            sx={{
                                bgcolor: activeTab === 0 ? "#00C853" : "",
                                border: activeTab === 0 ? "1px solid #333333" : "",
                                borderRadius: "50px",
                                color: activeTab === 0 ? "#fff" : "#A8A8A8",
                                fontWeight: activeTab === 0 ? "bold" : "",
                                textTransform: "capitalize",
                                width:"84px",
                                px: 4,
                                "&:hover": { bgcolor: activeTab === 0 ? "#00B44A" : "#f0f0f0" },
                            }}
                        >
                            Goals
                        </Button>
                        <Button
                            onClick={() => handleTabChange(1)}
                            sx={{
                                bgcolor: activeTab === 1 ? "#226296" : "",
                                border: activeTab === 1 ? "1px solid #226296" : "",
                                borderRadius: "50px",
                                color: activeTab === 1 ? "#fff" : "#A8A8A8",
                                fontWeight: activeTab === 1 ? "bold" : "",
                                textTransform: "capitalize",
                                width:"84px",
                                px: 4,
                                "&:hover": { bgcolor: activeTab === 1 ? "#347AB5" : "#f0f0f0" },
                            }}
                        >
                            Protocols
                        </Button>
                    </Box>
                </Box>
                <Box marginLeft="auto" pl={2} py={1}>
                    <Typography sx={{ fontSize: "20px", color: "#333333", fontFamily: "Open Sans" }}>Select a <span style={{ color: "#333333", fontWeight: '700' }}>{activeTab === 0 ? "Health Goal:" : "Protocol:"}</span></Typography>
                    <Box sx={{ display: "flex", mt: 1, gap: 2 }}>
                        <SortMenu onChange={handleSortChange} selectedSortValue={selectedSortValue} options={activeTab === 1 ? protocolFilterOption : benefitFilterOption} />
                        <FilterMenu
                            options={activeTab === 1 ? filterOptionsProtocol : filterOptionsBenefit}
                            onChange={handleFilterChange}
                            selectedFilters={selectedFilters}
                            onSelectAll={handleSelectAll}
                        />
                    </Box>

                </Box>
            </Box>

            {/* Cards Display */}
            {activeTab === 0 ? (
                <Box sx={{ padding: 2 }}>
                    {
                        benefitLoading ? <SkeletonLoader /> : (
                            <Grid container spacing={1.5}>
                                {benefit?.length > 0 ? (benefit?.map((item, index) => (
                                    <Grid item xs={4} sm={4} key={index}>
                                        <Card
                                            onClick={() => { navigate(`/dashboard/benefit-protocol?id=${item.benefitID}`) }}
                                            sx={{
                                                position: 'relative',
                                                borderRadius: "10px",
                                                overflow: 'hidden',
                                                border: "1.6px solid #e5e5e5",
                                                backgroundColor: '#f9f9f9',
                                                p: "5px",
                                                boxShadow: "none",
                                            }}
                                        >
                                            <Box sx={{ width: "100%", height: "auto" }}>
                                                <img
                                                    src={item.benefitImageID}
                                                    alt={item.benefitName}
                                                    style={{
                                                        borderRadius: "5px",
                                                        objectFit: "fill",
                                                        width: "100%",
                                                        height: "100%"
                                                    }}
                                                />
                                            </Box>
                                            <Typography
                                                sx={{paddingLeft:"2px", fontWeight: 'bold', color: '#333333', fontSize: "14px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: '1.1' }}
                                            >
                                                {item.benefitName}
                                            </Typography>
                                            <Typography
                                                sx={{ paddingLeft:"2px", fontWeight: 'bold', color: '#A8A8A8', fontSize: "12px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: '1.1', mt: '3px' }}
                                            >
                                                {item?.benefitCategories[0]}
                                            </Typography>
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
                <Box sx={{ padding: 2 }}>
                    {
                        protocolLoading ? <SkeletonLoader /> : (
                            <Grid container spacing={1.5}>
                                {protocol?.length > 0 ? (protocol?.map((item, index) => (
                                    <Grid item xs={4} sm={4} key={index}>
                                        <Card
                                            onClick={() => { navigate(`/dashboard/protocol-benefit?id=${item.protocolID}`) }}
                                            sx={{
                                                position: 'relative',
                                                borderRadius: "10px",
                                                overflow: 'hidden',
                                                border: "1.6px solid #e5e5e5",
                                                backgroundColor: '#f9f9f9',
                                                p: "5px",
                                                boxShadow: "none",

                                            }}
                                        >
                                            <Box sx={{ width: "100%", height: "auto" }}>
                                                <img
                                                    src={item.protocolImageID}
                                                    alt={item.protocolName}
                                                    style={{
                                                        borderRadius: "5px",
                                                        objectFit: "fill",
                                                        width: "100%",
                                                        height: "100%"
                                                    }}
                                                />
                                            </Box>
                                            <Typography
                                                sx={{ paddingLeft:"2px",fontWeight: 'bold', color: '#333333', fontSize: "14px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: '.9', }}
                                            >
                                                {item.protocolName}
                                            </Typography>
                                            <Typography
                                                sx={{paddingLeft:"2px", fontWeight: 'bold', color: '#A8A8A8', fontSize: "12px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: '1.1', mt: '3px' }}
                                            >
                                                {item?.protocolCategories[0]}
                                            </Typography>
                                            <Typography sx={{paddingLeft:"2px", fontSize: 12, display: "flex", alignItems: 'center', fontWeight: "bold", gap: "5px",mt:1 }}>
                                                <img src={timerIcon} alt='' height={'14px'} width={'12px'}  />  <StatusIndicator value={item?.protocolRelativeTimeRating} colorBoxes={colorBoxes} />
                                                {/* {getRatingLabel(protocolsData?.protocolRelativeTimeRating)} */}
                                            </Typography>
                                            <Typography sx={{paddingLeft:"2px", fontSize: 12, display: "flex", alignItems: 'center',  fontWeight: "bold", gap: "5px",mt:"5px" }}>
                                                <img src={dollarIcon} alt='' height={'14px'} width={'12px'}  />  <StatusIndicator value={item?.protocolRelativeCostRating} colorBoxes={colorBoxes} />
                                                {/* {getRatingLabel(protocolsData?.protocolRelativeCostRating)} */}
                                            </Typography>
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
