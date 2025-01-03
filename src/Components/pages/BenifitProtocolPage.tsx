import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import BenefitProtocolCard from '../BenifitProtocolCard';
import { SortMenu } from '../utils/SortMenu';
import { FilterMenu } from '../utils/FilterMenu';
import jsonData from '../../JSON_Example/JSON_example_vShort.json'
import { useLocation } from 'react-router-dom';

const BenefitProtocolPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const benefitId = queryParams.get('id');
    const { benefits } = jsonData;
    const benefitdata = benefits.find((val) => val.benefitID === benefitId)

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
                            position:"relative"
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
                    <FilterMenu />
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                <BenefitProtocolCard benefitId={benefitId} />
            </Box>
        </Box>
    );
};

export default BenefitProtocolPage;
