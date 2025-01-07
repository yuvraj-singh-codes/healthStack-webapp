import React, { useEffect, useState } from 'react';
import { FaDollarSign } from "react-icons/fa6";
import {
    Box,
    Typography,
    CardMedia,
    Card,
    CardContent,
} from '@mui/material';
import ProtocolBenefitCard from '../ProtocolBenefitCard';
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
import { Hourglass } from 'lucide-react';
import { useLocation } from 'react-router-dom';
// import jsonData from '../../JSON_Example/JSON_example_vShort.json'
import jsonData from '../../JSON_Example/healthstack_data_example.json'
import { Benefit } from '../Interface/Interface';

const ProtocolBenefitPage: React.FC = () => {
    const [benefit, setBenefit] = useState<Benefit[]>([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const protocolID = queryParams.get('id');
    const { protocols, benefits } = jsonData;
    const protocolsData = protocols.find((val) => val.protocolID === protocolID);
    const filterOptionsData = ["Physical Health", "Mental Health"];
    const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>(() =>
        filterOptionsData.reduce((acc, option) => {
            acc[option] = true;
            return acc;
        }, {} as Record<string, boolean>)
    );
    const benefitFilterOption = ["Name"]
    const [selectedSortValue, setSelectedSortValue] = useState<Record<string, boolean>>(
        () => benefitFilterOption.reduce((acc, option) => {
            acc[option] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );
    const handleSortChange = (label: string) => {
        setSelectedSortValue((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };
    const linkedBenefitIds = protocolsData?.protocolLinkedBenefits || [];
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
        setBenefit(filteredBenefits)
    }, [benefits, linkedBenefitIds, selectedFilters])
    useEffect(() => {
        if (selectedSortValue.Name) {
            const sortedBenefits = [...benefits].sort((a, b) => a.benefitName.localeCompare(b.benefitName));
            setBenefit(sortedBenefits);
        } else {
            setBenefit(benefits);
        }
    }, [benefits, selectedSortValue]);
    return (
        <Box sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
            <Card sx={{ boxShadow: "none" }}>
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                    <Box
                        sx={{
                            background: 'radial-gradient(circle, #D4C89E 20%, #FFFFFF 70%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: "120px",
                            height: '120px',
                            position: 'relative'
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
                                height: { xs: "70px", sm: "80px", md: "80px", lg: "80px" },
                            }}
                        >
                            <Typography
                                sx={{ fontWeight: 'bold', color: '#212121', textAlign: 'center', fontSize: "12px" }}
                            >
                                {protocolsData?.protocolName}
                            </Typography>
                        </Box>
                    </Box>
                    <CardContent>
                        <Typography variant="body2" sx={{ fontSize: '14px', lineHeight: 'normal' }}>
                            {protocolsData?.protocolDescription}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, justifyContent: "space-around" }}>
                            <Typography variant="caption" sx={{ fontSize: 14, display: "flex", alignItems: 'center', justifyContent: "center" }}>
                                <Hourglass style={{ height: "14px" }} /> {protocolsData?.protocolRelativeTimeRating}
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: 14, display: "flex", alignItems: 'center', justifyContent: "center" }}>
                                <FaDollarSign style={{ fontSize: "14px" }} /> {protocolsData?.protocolRelativeCostRating}
                            </Typography>
                        </Box>
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
    );
};

export default ProtocolBenefitPage;
