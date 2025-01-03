import React from 'react';
import { FaAward } from 'react-icons/fa';
import { BiTimer } from 'react-icons/bi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Card, CardContent, CardMedia, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jsonData from "../JSON_Example/JSON_example_vShort.json"
interface BenefitProtocolCardProps {
  benefitId: string | null;
}

const BenefitProtocolCard: React.FC<BenefitProtocolCardProps> = ({ benefitId }) => {
  const navigate = useNavigate();
  const {protocols}=jsonData;

  return (
    <Grid container spacing={1}>
      {protocols.map((item) => (
        <Grid item xs={4} sm={4} md={4} key={item.protocolID}>
          <Card
            onClick={() => navigate(`/dashboard/claim?protocolId=${item.protocolID}&&benefitId=${benefitId}`)}
            sx={{
              borderRadius: '10px',
              border: '1px solid #e0e0e0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              cursor:"pointer"
            }}
          >
            {/* Top Section with Background */}
            <Box
              sx={{
                width: '100%',
                backgroundColor: '#F4F1E6',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                py: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Centered Image */}
              <CardMedia
                component="img"
                src={item.protocolImageID}
                alt={item.protocolName}
                sx={{
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
              {/* Title */}
              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 500,
                  mt: 1,
                  px: 1,
                }}
              >
                {item.protocolName}
              </Typography>
            </Box>

            {/* Icons Section */}
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              {/* Icon 1 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FaAward size={16} />
                <Typography variant="caption" sx={{ fontSize: '10px' }}>
                  &lt;X/X&gt;
                </Typography>
              </Box>
              {/* Icon 2 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BiTimer size={16} />
                <Typography variant="caption" sx={{ fontSize: '10px' }}>
                  &lt;X/X&gt;
                </Typography>
              </Box>
              {/* Icon 3 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BsCurrencyDollar size={16} />
                <Typography variant="caption" sx={{ fontSize: '10px' }}>
                  &lt;X/X&gt;
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BenefitProtocolCard;
