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

const ProtocolBenefitPage: React.FC = () => {
    const dispatch = useDispatch();
    const benefit = useSelector((state: RootState) => state.app.benefit);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const protocolID = queryParams.get('id');
    const { protocols, benefits } = jsonData;
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
    const benefitFilterOption = ["Name (A-Z)", "Name (Z-A)"]
    const [selectedSortValue, setSelectedSortValue] = useState<Record<string, boolean>>(
        () => benefitFilterOption.reduce((acc, option) => {
            acc[option] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );
    const handleSortChange = (label: string) => {
        setSelectedSortValue((prev) => ({
            ...Object.keys(prev).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {} as Record<string, boolean>),
            [label]: true,
        }));
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

        if (selectedSortValue["Name (A-Z)"]) {
            const sortedBenefits = [...filteredBenefits].sort((a, b) =>
                a.benefitName.localeCompare(b.benefitName)
            );
            dispatch(setBenefit(sortedBenefits));
        } else if (selectedSortValue["Name (Z-A)"]) {
            const sortedBenefits = [...filteredBenefits].sort((a, b) =>
                b.benefitName.localeCompare(a.benefitName)
            );
            dispatch(setBenefit(sortedBenefits));
        } else {
            dispatch(setBenefit(filteredBenefits));
        }
    }, [benefits, linkedBenefitIds, selectedFilters, selectedSortValue]);
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
            const filtered = benefit.filter((item) =>
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
            <CommonSearch onChange={handleSearch} searchTerm={searchTerm} />
            <Box sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
                <Card sx={{ boxShadow: "none" }}>
                    <Box sx={{ display: 'flex' }}>
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
                        <CardContent sx={{ pt: "2px" }}>
                            <Typography
                                sx={{ fontWeight: 'bold', color: '#212121', fontSize: "14px" }}
                            >
                                {protocolsData?.protocolName}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '14px', lineHeight: 'normal' }}>
                                {protocolsData?.protocolDescription}
                            </Typography>
                            <Grid container spacing={1} sx={{marginTop:"5px"}}>
                                <Grid item>
                                    <Typography sx={{ fontSize: 14, display: "flex", alignItems: 'center',justifyContent: "center" }}>
                                    <img src='/images/Timer.svg' alt='' height={'auto'} width={'auto'} /> {getRatingLabel(protocolsData?.protocolRelativeTimeRating)}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ fontSize: 14, display: "flex", alignItems: 'center', justifyContent: "center" }}>
                                    <img src='/images/Currency_Dollar.svg' alt='' height={'auto'} width={'auto'} /> {getRatingLabel(protocolsData?.protocolRelativeCostRating)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Box>
                </Card>
                {/* Filter Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontSize: 16 }}>
                        <span style={{ fontWeight: 'bold' }}> Health Benefits</span> of this protocol :
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
                <Box>
                    <ProtocolBenefitCard protocolID={protocolID} data={benefit} />
                </Box>
            </Box>
        </>
    );
};

export default ProtocolBenefitPage;
