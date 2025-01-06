import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import BenefitProtocolCard from '../BenifitProtocolCard';
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
// import jsonData from '../../JSON_Example/JSON_example_vShort.json'
import jsonData from '../../JSON_Example/healthstack_data_example.json'
import { useLocation } from 'react-router-dom';

const BenefitProtocolPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const benefitId = queryParams.get('id');
    const { benefits, protocols } = jsonData;
    const benefitdata = benefits.find((val) => val.benefitID === benefitId)
    const filterOptionsData = ["Behaviour", "Food", "Supplements","Dietary"];
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
    const filterProtocols = protocols.map((protocol) => ({
        ...protocol,
        protocolCategories: protocol.protocolCategories.filter((category) =>
            Object.keys(selectedFilters).some(
                (key) => selectedFilters[key] && category.includes(key)
            )
        ),
    })).filter((protocol) => protocol.protocolCategories.length > 0);
    return (
        <Box sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
            <Card sx={{ boxShadow: "none" }}>
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                    <Box
                        sx={{
                            background: 'radial-gradient(circle, #ABD8DB 20%, #FFFFFF 70%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: "120px",
                            height: '120px',
                            position: "relative"
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={benefitdata?.benefitImageID}
                            alt=""
                            sx={{
                                width: "80px",
                                height: '80px',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                bgcolor: 'rgba(255, 255, 255, 0.5)',
                                backdropFilter: 'blur(0.1px)',
                                padding: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: "auto"
                            }}
                        >
                            <Typography
                                sx={{ fontWeight: 'bold', color: '#212121', textAlign: 'center', fontSize: "12px" }}
                            >
                                {`<${benefitdata?.benefitName}>`}
                            </Typography>
                        </Box>
                    </Box>
                    <CardContent>
                        <Typography variant="body2" sx={{ fontSize: '12px', lineHeight: 'normal' }}>
                            &lt;{benefitdata?.benefitDescription}&gt;
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
                <Typography sx={{ fontSize: "16px", }}>
                    <span style={{ fontWeight: 700 }}>Protocols</span> to achieve this Benefit:
                </Typography>
                <Box marginLeft="auto" display="flex" alignItems="center">
                    <SortMenu />
                    <FilterMenu
                        options={filterOptionsData}
                        onChange={handleFilterChange}
                        selectedFilters={selectedFilters}
                    />
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                <BenefitProtocolCard benefitId={benefitId} data={filterProtocols} />
            </Box>
        </Box>
    );
};

export default BenefitProtocolPage;
