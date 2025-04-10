import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import BenefitProtocolCard from '../BenefitProtocolCard';
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
import jsonData from '../../healthstack_data_example.json'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import { setProtocol } from '../../features/allStateSlice';
import SearchComponent from '../utils/Search';
import { MdKeyboardArrowRight } from "react-icons/md";
// import { Protocol } from '../Interface/Interface';

const BenefitProtocolPage: React.FC = () => {
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const protocol = useSelector((state: RootState) => state.app.protocol);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
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
    }, [selectedSortValue, claims, benefitId, protocols]);


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
            <SearchComponent />
            <Box sx={{ maxWidth: 600, margin: 'auto', py: 2 }}>
                <Card sx={{ boxShadow: 'none', px: 1, py: "2px" }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ pr: 0, pl: 1 }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: '#00C853',
                                    fontSize: '24px',
                                    mt: "-6px",
                                }}
                            >
                                {benefitData?.benefitName}
                            </Typography>
                            <Typography
                                sx={{ fontWeight: 400, color: '#A8A8A8', fontSize: "14px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                            >
                                {""}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#333333", fontSize: '12px', wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                            >
                                {benefitData?.benefitDescription}
                            </Typography>
                        </Box>
                        <Box sx={{ width:{xs:"200px",sm:"150px",md:"120px"}, height: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                            <img
                                src={benefitData?.benefitImageID}
                                alt={benefitData?.benefitName}
                                style={{
                                    borderRadius: "10px",
                                    objectFit: "fill",
                                    width: "100%",
                                    height: "65px"
                                }}
                            />
                            <Button onClick={() => nevigate("/dashboard/home")} size='small' sx={{ textTransform: "capitalize", bgcolor: "#00C853", color: "#ffffff", ":hover": { bgcolor: "#00B44A" }, fontSize: "12px" }} >All Benefits <MdKeyboardArrowRight size={20} /></Button>
                        </Box>
                    </Box>
                </Card>
                <Box
                    sx={{
                        // display: 'flex',
                        // alignItems: 'center',
                        gap: 2,
                        position: "sticky", top: "57px", zIndex: 100, bgcolor: "#fff",
                        px: 2,
                        pt: 1
                    }}
                >
                    <Typography sx={{ fontSize: "20px", color: "#333333" }}>
                        <span style={{ fontWeight: 700 }}>Protocols</span> linked to Heart Health:
                    </Typography>
                    <Box marginLeft="auto" display="flex" alignItems="center" gap={1}>
                        <SortMenu onChange={handleSortChange} selectedSortValue={selectedSortValue} options={protocolFilterOption} />
                        <FilterMenu
                            options={filterOptionsData}
                            onChange={handleFilterChange}
                            selectedFilters={selectedFilters}
                            onSelectAll={handleSelectAll}
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
