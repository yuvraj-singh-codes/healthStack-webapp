import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import BenefitProtocolCard from '../BenefitProtocolCard';
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
// import jsonData from '../../JSON_Example/JSON_example_vShort.json'
import jsonData from '../../JSON_Example/healthstack_data_example.json';
import { useLocation } from 'react-router-dom';
import { Protocol } from '../Interface/Interface';

const BenefitProtocolPage: React.FC = () => {
    const [protocol, setProtocol] = useState<Protocol[]>([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const benefitId = queryParams.get('id');
    const { benefits, protocols } = jsonData;
    const benefitData = benefits.find((val) => val.benefitID === benefitId);
    const protocolFilterOption = ["Time", "Cost"]
    const [selectedSortValue, setSelectedSortValue] = useState<Record<string, boolean>>(
        () => protocolFilterOption.reduce((acc, option) => {
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

    const linkedProtocolIds = benefitData?.benefitLinkedProtocols || [];

    const filterOptionsData = ['Behaviour', 'Food', 'Supplements', 'Dietary'];
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
                protocolCategories: protocol.protocolCategories.filter((category) =>
                    Object.keys(selectedFilters).some(
                        (key) => selectedFilters[key] && category.includes(key)
                    )
                ),
            }))
            .filter((protocol) => protocol.protocolCategories.length > 0);
        setProtocol(filteredProtocols)
    }, [protocols, linkedProtocolIds, selectedFilters])

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
        <Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
            <Card sx={{ boxShadow: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            background: 'radial-gradient(circle, #ABD8DB 20%, #FFFFFF 70%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '120px',
                            height: '120px',
                            position: 'relative',
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
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#212121',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                }}
                            >
                                {benefitData?.benefitName}
                            </Typography>
                        </Box>
                    </Box>
                    <CardContent>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: '14px', lineHeight: 'normal' }}
                        >
                            {benefitData?.benefitDescription}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography sx={{ fontSize: '16px' }}>
                    <span style={{ fontWeight: 700 }}>Protocols</span> to achieve this Benefit:
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
            <Box sx={{ mt: 2 }}>
                <BenefitProtocolCard benefitId={benefitId} data={protocol} />
            </Box>
        </Box>
    );
};

export default BenefitProtocolPage;
