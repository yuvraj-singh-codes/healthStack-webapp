import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import BenefitProtocolCard from '../BenefitProtocolCard';
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
import jsonData from '../../healthstack_data_example.json'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import { setProtocol } from '../../features/allStateSlice';
// import { CommonSearch } from '../utils/CommonSearch';
import SearchComponent from '../utils/Search';
// import { Protocol } from '../Interface/Interface';

const BenefitProtocolPage: React.FC = () => {
    const dispatch = useDispatch();
    const protocol = useSelector((state: RootState) => state.app.protocol);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // const [searchTerm, setSearchTerm] = useState<string>("");
    const benefitId = queryParams.get('id');
    const { benefits, protocols, claims } = jsonData;
    const benefitData = benefits.find((val) => val.benefitID === benefitId);
    const protocolFilterOption = ["Easy Wins", "Evidence Rating", "Time", "Cost", "Name (A-Z)", "Name (Z-A)"]
    const [selectedSortValue, setSelectedSortValue] = useState<Record<string, boolean>>(
        () => protocolFilterOption.reduce((acc, option) => {
            acc[option] = option === "Easy Wins";
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
    const linkedProtocolIds = benefitData?.benefitLinkedProtocols || [];

    useEffect(() => {
        const filteredProtocols = protocols
            .filter((item) => linkedProtocolIds.includes(item.protocolID));
        dispatch(setProtocol(filteredProtocols));
    }, [protocols, linkedProtocolIds])
    const option = protocols
            .filter((item) => linkedProtocolIds.includes(item.protocolID));
    const uniqueProtocolCategories = Array.from(
        new Set(
            option.flatMap(item => item.protocolCategories)
        )
    );

    const filterOptionsData = uniqueProtocolCategories;
    const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>(() =>
        filterOptionsData.reduce((acc, option) => {
            acc[option] = true;
            return acc;
        }, {} as Record<string, boolean>)
    );
    const handleFilterChange = (label: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    useEffect(() => {
        const filteredProtocols = protocols
            .filter((protocol) => linkedProtocolIds.includes(protocol.protocolID))
            .map((protocol) => ({
                ...protocol,
                benefitCategories: protocol.protocolCategories.filter((category) =>
                    Object.keys(selectedFilters).some(
                        (key) => selectedFilters[key] && category.includes(key)
                    )
                ),
            }))
            .filter((protocol) => protocol.benefitCategories.length > 0);
        dispatch(setProtocol(filteredProtocols));
    }, [protocols, linkedProtocolIds, selectedFilters, selectedSortValue, claims]);

    useEffect(() => {
        const filteredProtocols = protocols
            .filter((protocol) => linkedProtocolIds.includes(protocol.protocolID))
        // dispatch(setProtocol(filteredProtocols));
        const sortedProtocols = [...filteredProtocols].sort((a, b) => {
            // Sorting by Easy Wins
            if (selectedSortValue["Easy Wins"]) {
                const claimA = claims.find(claim =>
                    claim.claimProtocolID === a.protocolID && claim.claimBenefitID === benefitId
                );
                const claimB = claims.find(claim =>
                    claim.claimProtocolID === b.protocolID && claim.claimBenefitID === benefitId
                );
                const easyWinRatingA = claimA ? claimA.claimEasyWinRating : 0;
                const easyWinRatingB = claimB ? claimB.claimEasyWinRating : 0;
                return easyWinRatingB - easyWinRatingA; // descending order
            }
            // Sorting by Time and Cost
            if (selectedSortValue["Time"] && selectedSortValue["Cost"]) {
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
            // Sorting by Name (A-Z / Z-A)
            if (selectedSortValue["Name (A-Z)"]) {
                return a.protocolName.localeCompare(b.protocolName);
            }
            if (selectedSortValue["Name (Z-A)"]) {
                return b.protocolName.localeCompare(a.protocolName);
            }
            // Sorting by Evidence Rating
            if (selectedSortValue["Evidence Rating"]) {
                const claimA = claims.find(claim =>
                    claim.claimProtocolID === a.protocolID && claim.claimBenefitID === benefitId
                );
                const claimB = claims.find(claim =>
                    claim.claimProtocolID === b.protocolID && claim.claimBenefitID === benefitId
                );
                const evidenceRatingA = claimA ? claimA.claimOverallEvidenceRating : 0;
                const evidenceRatingB = claimB ? claimB.claimOverallEvidenceRating : 0;
                return evidenceRatingB - evidenceRatingA; 
            }

            return 0; 
        });
        dispatch(setProtocol(sortedProtocols));
    }, [selectedSortValue, claims, benefitId,protocols]);
   

    // const handleSearch = (term: string) => {
    //     setSearchTerm(term);
    // };

    // useEffect(() => {
    //     if (searchTerm.trim() !== "") {
    //         const lowerCaseTerm = searchTerm.toLowerCase();
    //         const filtered = protocols.filter((item) =>
    //             item.protocolSearchTerms.some((search) =>
    //                 search.toLowerCase().includes(lowerCaseTerm)
    //             )
    //         );
    //         //  dispatch(setProtocol(filtered));
    //     } else {
    //         const filteredBenefits = protocols
    //             .filter((item) => linkedProtocolIds.includes(item.protocolID));
    //         // dispatch(setProtocol(filteredBenefits));
    //     }
    // }, [searchTerm, dispatch]);
    return (
        <>
            {/* <CommonSearch onChange={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
            <SearchComponent />
            <Box sx={{ maxWidth: 600, margin: 'auto', py: 2 }}>
                <Card sx={{ boxShadow: 'none', px: 1, py: "2px" }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box
                            sx={{
                                background: 'radial-gradient(circle, #ABD8DB 20%, #FFFFFF 70%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '120px',
                                height: '120px',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={benefitData?.benefitImageID}
                                alt=""
                                sx={{
                                    width: '120px',
                                    height: '120px',
                                }}
                            />

                        </Box>
                        <Box sx={{pr: 0, pl: 1 }}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#212121',
                                    fontSize: '18px',
                                    mt:"-6px"
                                }}
                            >
                                {benefitData?.benefitName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: '14px', wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                            >
                                {benefitData?.benefitDescription}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        position: "sticky", top: "57px", zIndex: 100, bgcolor: "#fff",
                        px: 2,
                        pt:1
                    }}
                >
                    <Typography sx={{ fontSize: 18 }}>
                        <span style={{ fontWeight: 700 }}>Protocols</span> for this Benefit:
                    </Typography>
                    <Box marginLeft="auto" display="flex" alignItems="center">
                        <SortMenu onChange={handleSortChange} selectedSortValue={selectedSortValue} options={protocolFilterOption} />
                        <FilterMenu
                            options={filterOptionsData}
                            onChange={handleFilterChange}
                            selectedFilters={selectedFilters}
                        />
                    </Box>
                </Box>
                <Box sx={{ mt: 2, px: 2 }}>
                    <BenefitProtocolCard benefitId={benefitId} data={protocol} />
                </Box>
            </Box>
        </>
    );
};

export default BenefitProtocolPage;
