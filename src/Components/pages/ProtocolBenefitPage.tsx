import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CardMedia,
    Card,
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
import SearchComponent from '../utils/Search';

const ProtocolBenefitPage: React.FC = () => {
    const dispatch = useDispatch();
    const benefit = useSelector((state: RootState) => state.app.benefit);
    const [searchTerm, setSearchTerm] = useState<string>("");
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
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };
    useEffect(() => {
        if (searchTerm.trim() === "") {
            const filteredBenefits = benefits
                .filter((benefit) => linkedBenefitIds.includes(benefit.benefitID));
            // dispatch(setBenefit(filteredBenefits));
        } else {
            const lowerCaseTerm = searchTerm.toLowerCase();
            const filtered = benefits.filter((item) =>
                item.benefitSearchTerms.some((search) =>
                    search.toLowerCase().includes(lowerCaseTerm)
                )
            );
            // dispatch(setBenefit(filtered));
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
            {/* <CommonSearch onChange={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
            <SearchComponent />
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
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap", py: "2px" }}>
                                        <Typography sx={{ fontSize: 12, display: "flex", alignItems: 'center', justifyContent: "center", fontWeight: "bold" }}>
                                            <Hourglass size={14} />
                                            {getRatingLabel(protocolsData?.protocolRelativeTimeRating)}
                                        </Typography>
                                        <Typography sx={{ fontSize: 12, display: "flex", alignItems: 'center', justifyContent: "center", fontWeight: "bold" }}>
                                            <PiCurrencyDollarSimpleBold size={16} />
                                            {getRatingLabel(protocolsData?.protocolRelativeCostRating)}
                                        </Typography>
                                    </Box>
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
                        pt: 1
                    }}
                >
                    <Typography variant="h6" sx={{ fontSize: 18 }}>
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
