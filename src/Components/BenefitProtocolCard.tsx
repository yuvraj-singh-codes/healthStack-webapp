import React from 'react';
import { Card, CardMedia, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Protocol } from './Interface/Interface';
import { Hourglass } from 'lucide-react';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import jsonData from "../healthstack_data_example.json";
interface BenefitProtocolCardProps {
  benefitId: string | null;
  data: Protocol[];
}

const BenefitProtocolCard: React.FC<BenefitProtocolCardProps> = ({ benefitId, data }) => {
  const navigate = useNavigate();
const {claims}=jsonData;
  return (
    <Grid container spacing={1}>
      {data.length > 0 ? (
        data.map((item) =>{
          const matchedClaim = claims.find(
            (claim) =>
              claim.claimProtocolID === item.protocolID &&
              claim.claimBenefitID === benefitId
          );
          const overallEvidenceRating = matchedClaim
            ? matchedClaim.claimOverallEvidenceRating
            : "0";
            const ezywins = matchedClaim
            ? matchedClaim.claimEasyWinRating
            : "0";
          return (
          <Grid item xs={4} sm={4} md={4} key={item?.protocolID}>
            <Card
              onClick={() =>
                navigate(`/dashboard/claim?protocolId=${item?.protocolID}&&benefitId=${benefitId}`)
              }
              sx={{
                borderRadius: '10px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                height: "auto"
              }}
            >
              {/* Top Section with Background */}
              <Box
                sx={{
                  width: '100%',
                  backgroundColor: '#F4F1E6',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  pt: 1,
                  px: 1,
                  pb:1,
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
                  className='scrollbar'
                  sx={{
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    mt: "2px",
                    px: 0,
                    height: "50px",
                    overflow: 'auto',
                    wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal'
                  }}
                >
                  {item.protocolName}
                </Typography>
              </Box>

              {/* Icons Section */}
              <Box
                sx={{py:1,px:2,width:"100%" }}
              >
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '15px',
                }}>
                  {/* Icon 1 */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src='/images/Star_Badge.svg' alt='' height={'auto'} width={'auto'} />
                    <Typography variant="caption" sx={{ fontSize: '12px' }}>
                      {item?.protocolOverallImpactRating}
                    </Typography>
                  </Box>
                  {/* Icon 2 */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* <img src='/images/Timer.svg' alt='' height={'auto'} width={'auto'} /> */}
                    <Hourglass size={16}/>
                    <Typography variant="caption" sx={{ fontSize: '12px' }}>
                      {item?.protocolRelativeTimeRating}
                    </Typography>
                  </Box>
                  {/* Icon 3 */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* <img src='/images/Currency_Dollar.svg' alt='' height={'auto'} width={'auto'} /> */}
                    <PiCurrencyDollarSimpleBold size={18} />
                    <Typography variant="caption" sx={{ fontSize: '12px' }}>
                      {item?.protocolRelativeCostRating}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        )})
      ) : (
        <Grid item xs={12}>
          <Typography textAlign={'center'}>No Protocol data found</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default BenefitProtocolCard;
