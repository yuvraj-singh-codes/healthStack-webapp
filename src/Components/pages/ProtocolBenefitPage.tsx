import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CardMedia,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import ProtocolBenefitCard from '../ProtocolBenefitCard';
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
import { useLocation } from 'react-router-dom';
import jsonData from '../../healthstack_data_example.json'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import { setBenefit } from '../../features/allStateSlice';
import { CommonSearch } from '../utils/CommonSearch';
import { Hourglass } from 'lucide-react';
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

const ProtocolBenefitPage: React.FC = () => {
    const dispatch = useDispatch();
    const benefit = useSelector((state: RootState) => state.app.benefit);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const protocolID = queryParams.get('id');
    const { protocols, benefits, claims } = jsonData;
    const protocolsData = protocols.find((val) => val.protocolID === protocolID);
    const uniqueBenefitCategories = Array.from(
        new Set(
            benefits.flatMap(item => item.benefitCategories)
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
        () => benefitFilterOption.reduce((acc, option) => {
            acc[option] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );
    // const handleSortChange = (label: string) => {
    //     setSelectedSortValue((prev) => {
    //         const updated = { ...prev };
    //         if (label === "Name (A-Z)") {
    //             updated["Name (Z-A)"] = false;
    //         } else if (label === "Name (Z-A)") {
    //             updated["Name (A-Z)"] = false;
    //         }
    //         updated[label] = !prev[label];
    //         return updated;
    //     });
    // };
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
    
  
    const linkedBenefitIds = protocolsData?.protocolLinkedBenefits || [];
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
    }, [benefits, linkedBenefitIds, selectedFilters])

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
    }, [benefits, linkedBenefitIds, selectedFilters, selectedSortValue, claims]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };
    useEffect(() => {
        if (searchTerm.trim() === "") {
            const filteredBenefits = benefits
                .filter((benefit) => linkedBenefitIds.includes(benefit.benefitID));
            dispatch(setBenefit(filteredBenefits));
        } else {
            const lowerCaseTerm = searchTerm.toLowerCase();
            const filtered = benefits.filter((item) =>
                item.benefitSearchTerms.some((search) =>
                    search.toLowerCase().includes(lowerCaseTerm)
                )
            );
            dispatch(setBenefit(filtered));
        }
    }, [searchTerm, dispatch]);
    const getRatingLabel = (rating?: number): string => {
        switch (rating) {
            case 1:
                return 'Low';
            case 2:
                return 'Low/Moderate';
            case 3:
                return 'Moderate';
            case 4:
                return 'Moderate/High';
            case 5:
                return 'High';
            default:
                return '';
        }
    };

    return (
        <>
            <CommonSearch onChange={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Box sx={{ maxWidth: 600, margin: "auto", py: 2 }}>
                <Card sx={{ boxShadow: "none", px: 1, py: "2px" }}>
                    <Box sx={{ display: 'flex', }}>
                        <Box
                            sx={{
                                background: 'radial-gradient(circle, #D4C89E 20%, #FFFFFF 70%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: "120px",
                                height: '120px',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={protocolsData?.protocolImageID}
                                alt=""
                                sx={{
                                    width: "120px",
                                    height: '120px',
                                }}
                            />
                        </Box>
                        <Box sx={{ pb: 0, pr: 0, pl: 1 }}>
                            <Typography
                                sx={{ fontWeight: 'bold', color: '#212121', fontSize: "14px" }}
                            >
                                {protocolsData?.protocolName}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '14px', wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}>
                                {protocolsData?.protocolDescription}
                            </Typography>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography sx={{ fontSize: 14, display: "flex", alignItems: 'center', justifyContent: "center" }}>
                                        <Hourglass size={18} />
                                        {getRatingLabel(protocolsData?.protocolRelativeTimeRating)}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ fontSize: 14, display: "flex", alignItems: 'center', justifyContent: "center" }}>
                                        <PiCurrencyDollarSimpleBold size={20} />
                                        {getRatingLabel(protocolsData?.protocolRelativeCostRating)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card>
                {/* Filter Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        position: "sticky", top: "57px", zIndex: 100, bgcolor: "#fff",
                        px: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontSize: 16 }}>
                        <span style={{ fontWeight: 'bold' }}> Health Benefits</span> of this Protocol:
                    </Typography>
                    <Box marginLeft="auto" display="flex" alignItems="center">
                        <SortMenu onChange={handleSortChange} selectedSortValue={selectedSortValue} options={benefitFilterOption} />
                        <FilterMenu
                            options={filterOptionsData}
                            onChange={handleFilterChange}
                            selectedFilters={selectedFilters}
                        />
                    </Box>
                </Box>
                <Box sx={{ mt: 2, px: 2 }}>
                    <ProtocolBenefitCard protocolID={protocolID} data={benefit} />
                </Box>
            </Box>
        </>
    );
};

export default ProtocolBenefitPage;
