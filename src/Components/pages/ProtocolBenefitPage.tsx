import React from 'react';
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
import jsonData from '../../JSON_Example/JSON_example_vShort.json'

const ProtocolBenefitPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const protocolID = queryParams.get('id');
    const { protocols } = jsonData;
    const protocolsData = protocols.find((val) => val.protocolID === protocolID)
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
                                {`<${protocolsData?.protocolName}>`}
                            </Typography>
                        </Box>
                    </Box>
                    <CardContent>
                        <Typography variant="body2" sx={{ fontSize: '12px', lineHeight: 'normal' }}>
                            &lt; {protocolsData?.protocolDescription}&gt;
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography variant="caption" sx={{ fontSize: 10, display: "flex", alignItems: 'center', }}>
                                <Hourglass style={{ height: "14px" }} /> &lt;MODERATE&gt;
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: 10, display: "flex", alignItems: 'center', }}>
                                <FaDollarSign style={{ fontSize: "14px" }} /> &lt;MODERATE&gt;
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
                    <span style={{ fontWeight: 'bold' }}> Health Benefits</span> of this protocol:
                </Typography>
                <Box marginLeft="auto" display="flex" alignItems="center">
                    <SortMenu />
                    <FilterMenu />
                </Box>
            </Box>
            <Box>
                <ProtocolBenefitCard protocolID={protocolID} />
            </Box>
        </Box>
    );
};

export default ProtocolBenefitPage;
