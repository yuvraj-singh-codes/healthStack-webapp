import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    Grid,
    Button,
} from '@mui/material';
import ProtocolBenefitCard from '../ProtocolBenefitCard';
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import jsonData from '../../healthstack_data_example.json'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import { setBenefit } from '../../features/allStateSlice';
import SearchComponent from '../utils/Search';
import { MdKeyboardArrowLeft } from "react-icons/md";
import StatusIndicator from '../utils/StatusIndicator';
import ProtocolBenefitModal from '../utils/ProtocolBenefitModal';
import { setValue } from '../../features/tabSlice';
import { colorBoxes } from '../utils/StatusColor';
import timerIcon from "../../assets/images/timer.svg";
import dollarIcon from "../../assets/images/dollar.svg"

const ProtocolBenefitPage: React.FC = () => {
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const benefit = useSelector((state: RootState) => state.app.benefit);
    // const [searchTerm, setSearchTerm] = useState<string>("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const protocolID = queryParams.get('id');
    const { protocols, benefits, claims } = jsonData;
    const protocolsData = protocols.find((val) => val.protocolID === protocolID);
    const linkedBenefitIds = protocolsData?.protocolLinkedBenefits || [];
    const option = benefits
        .filter((benefit) => linkedBenefitIds.includes(benefit.benefitID));
    const uniqueBenefitCategories = Array.from(
        new Set(
            option.flatMap(item => item.benefitCategories)
        )
    );
    const filterOptionsData = uniqueBenefitCategories;
    const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>(() =>
        filterOptionsData.reduce((acc, option) => {
            acc[option] = true;
            return acc;
        }, {} as Record<string, boolean>)
    );
    const benefitFilterOption = ["Evidence Rating", "Name (A-Z)", "Name (Z-A)"]
    const [selectedSortValue, setSelectedSortValue] = useState<Record<string, boolean>>(
        () => benefitFilterOption.reduce((acc, option, index) => {
            acc[option] = index === 0;
            return acc;
        }, {} as Record<string, boolean>)
    );

    const handleSortChange = (label: string) => {
        setSelectedSortValue((prev) => {
            const updated = { ...prev };
            for (const key in updated) {
                if (updated[key]) {
                    updated[key] = false;
                }
            }
            updated[label] = !prev[label];
            return updated;
        });
    };


    useEffect(() => {
        const filteredBenefits = benefits
            .filter((benefit) => linkedBenefitIds.includes(benefit.benefitID));
        dispatch(setBenefit(filteredBenefits));
    }, [benefits, linkedBenefitIds])
    const handleFilterChange = (label: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };
    const handleSelectAll = () => {
        const options = filterOptionsData;
        const allSelected = options.every((option) => selectedFilters[option]);
        const newState = options.reduce((acc, option) => {
            acc[option] = !allSelected;
            return acc;
        }, {} as Record<string, boolean>);
        setSelectedFilters(newState);
    };

    useEffect(() => {
        const filteredBenefits = benefits
            .filter((benefit) => linkedBenefitIds.includes(benefit.benefitID))
            .map((benefit) => ({
                ...benefit,
                benefitCategories: benefit.benefitCategories.filter((category) =>
                    Object.keys(selectedFilters).some(
                        (key) => selectedFilters[key] && category.includes(key)
                    )
                ),
            }))
            .filter((benefit) => benefit.benefitCategories.length > 0);
        dispatch(setBenefit(filteredBenefits));
    }, [benefits, linkedBenefitIds, selectedFilters, selectedSortValue, claims])

    useEffect(() => {
        const filteredBenefits = benefits
            .filter((benefit) => linkedBenefitIds.includes(benefit.benefitID));
        dispatch(setBenefit(filteredBenefits));
        const sortedBenefits = [...filteredBenefits].sort((a, b) => {
            if (selectedSortValue["Evidence Rating"]) {
                const claimA = claims.find(claim =>
                    claim.claimBenefitID === a.benefitID && claim.claimProtocolID === protocolID
                );
                const claimB = claims.find(claim =>
                    claim.claimBenefitID === b.benefitID && claim.claimProtocolID === protocolID
                );
                const evidenceRatingA = claimA ? claimA.claimOverallEvidenceRating : 0;
                const evidenceRatingB = claimB ? claimB.claimOverallEvidenceRating : 0;
                return evidenceRatingB - evidenceRatingA;
            }
            if (selectedSortValue["Name (A-Z)"]) {
                return a.benefitName.localeCompare(b.benefitName);
            }
            if (selectedSortValue["Name (Z-A)"]) {
                return b.benefitName.localeCompare(a.benefitName);
            }
            return 0;
        });
        dispatch(setBenefit(sortedBenefits));
    }, [selectedSortValue, claims, protocolID, benefits]);
    // const handleSearch = (term: string) => {
    //     setSearchTerm(term);
    // };
    // useEffect(() => {
    //     if (searchTerm.trim() === "") {
    //         const filteredBenefits = benefits
    //             .filter((benefit) => linkedBenefitIds.includes(benefit.benefitID));
    //         // dispatch(setBenefit(filteredBenefits));
    //     } else {
    //         const lowerCaseTerm = searchTerm.toLowerCase();
    //         const filtered = benefits.filter((item) =>
    //             item.benefitSearchTerms.some((search) =>
    //                 search.toLowerCase().includes(lowerCaseTerm)
    //             )
    //         );
    //         // dispatch(setBenefit(filtered));
    //     }
    // }, [searchTerm, dispatch]);
    // const getRatingLabel = (rating?: number): string => {
    //     switch (rating) {
    //         case 1:
    //             return 'Low';
    //         case 2:
    //             return 'Low/Moderate';
    //         case 3:
    //             return 'Moderate';
    //         case 4:
    //             return 'Moderate/High';
    //         case 5:
    //             return 'High';
    //         default:
    //             return '';
    //     }
    // };

    return (
        <>
            <SearchComponent />
            <ProtocolBenefitModal isOpen={isOpen} onClose={setIsOpen} />
            <Box sx={{ maxWidth: 600, margin: "auto", p: 1, paddingLeft:'16px', paddingRight:'16px' }}>
                <Card sx={{ boxShadow: "none", py: "2px", bgcolor: "#ffffff" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} >
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                                <img
                                    src={protocolsData?.protocolImageID}
                                    alt={protocolsData?.protocolName}
                                    style={{
                                        borderRadius: "10px",
                                        objectFit: "cover",
                                        width: "100%",

                                    }}
                                />
                                <Button fullWidth onClick={() => {
                                    dispatch(setValue(1));
                                    nevigate("/dashboard/home");
                                }} size='small' sx={{ textTransform: "capitalize", bgcolor: "#226296", color: "#ffffff", ":hover": { bgcolor: "#226296" }, fontSize: "12px", borderRadius: "50px" }} > <MdKeyboardArrowLeft size={20} /> All Protocols</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={8} >
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    color: '#226296',
                                    fontSize: '24px',
                                    mt: "-6px",
                                    lineHeight: "1.1"
                                }}
                            >
                                {protocolsData?.protocolName}
                            </Typography>
                            <Typography
                                sx={{ fontWeight: 'bold', color: '#A8A8A8',marginLeft:"1px", fontSize: "14px", wordBreak: "break-word",mb:"2px", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                            >
                                {protocolsData?.protocolCategories[0]}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#333333",marginLeft:"1px", fontSize: '12px', wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}>
                                {protocolsData?.protocolDescription}
                            </Typography>

                            <Grid item xs={12}>
                            <Box sx={{ display: "flex", alignItems: "start", justifyContent: "start", gap: "10px", py: "2px" }}>
                                <Typography sx={{ fontSize: 10, display: "flex", alignItems: 'center', justifyContent: "center", fontWeight: "bold",gap:"6px", marginTop:"8px"}}>
                                    <img src={timerIcon} alt='' height={'13px'} width={'14px'} />  <StatusIndicator size={13} value={protocolsData?.protocolRelativeTimeRating} colorBoxes={colorBoxes} />
                                    {/* {getRatingLabel(protocolsData?.protocolRelativeTimeRating)} */}
                                </Typography>
                                <Typography sx={{ fontSize: 10, display: "flex", alignItems: 'start', justifyContent: "start", fontWeight: "bold",gap:"6px", marginTop:"8px" }}>
                                    <img src={dollarIcon} alt='' height={'13px'} width={'14px'} />  <StatusIndicator size={13} value={protocolsData?.protocolRelativeCostRating} colorBoxes={colorBoxes} />
                                    {/* {getRatingLabel(protocolsData?.protocolRelativeCostRating)} */}
                                </Typography>
                            </Box>
                        </Grid>

                        </Grid>
                    </Grid>
                    <Grid container mt={"5px"}>

                    </Grid>
                </Card>
                <Box sx={{ borderTop: '1px solid #E0E0E0', marginTop:'10px' }} />
                {/* Filter Section */}
                <Box
                    sx={{
                        bgcolor: "#ffffff",
                        gap: 2,
                        position: "sticky", top: "57px", zIndex: 100,
                        px: 0,
                        pt: 1,
                        pb:1
                    }}
                >
                    <Typography sx={{ fontSize: "20px", color: "#333333",fontWeight:"bold",lineHeight: "1.1", }}>
                        <span style={{ fontWeight: "bold" }}>Health Benefits</span> of {protocolsData?.protocolName}:
                    </Typography>
                    <Box marginLeft="auto" display="flex" alignItems="center" gap={2} mt={1}>
                        <SortMenu onChange={handleSortChange} selectedSortValue={selectedSortValue} options={benefitFilterOption} />
                        <FilterMenu
                            options={filterOptionsData}
                            onChange={handleFilterChange}
                            selectedFilters={selectedFilters}
                            onSelectAll={handleSelectAll}
                        />
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <ProtocolBenefitCard protocolID={protocolID} data={benefit} />
                </Box>
            </Box>
        </>
    );
};

export default ProtocolBenefitPage;
