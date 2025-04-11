import React from 'react';
import { Card, Typography, Box, Grid, Button } from '@mui/material';
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
  const { claims } = jsonData;
  return (
    <Grid container spacing={1}>
      {data.length > 0 ? (
        data.map((item) => {
          const matchedClaim = claims.find(
            (claim) =>
              claim.claimProtocolID === item.protocolID &&
              claim.claimBenefitID === benefitId
          );
          const overallEvidenceRating = matchedClaim
            ? matchedClaim.claimOverallEvidenceRating
            : "0";
          return (
            <Grid item xs={4} sm={4} md={4} key={item?.protocolID}>
              <Card
                sx={{
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #E8E5E5",
                  p: 1,
                  boxShadow: "none"
                }}
              >
                {/* Top Section with Background */}
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  {/* Centered Image */}
                  <Box sx={{ width: "100%", height: "65px" }}>
                    <img
                      src={item.protocolImageID}
                      alt={item.protocolName}
                      style={{
                        borderRadius: "10px",
                        objectFit: "fill",
                        width: "100%",
                        height: "100%"
                      }}
                    />
                  </Box>
                  {/* Title */}
                  {/* Title */}
                  <Typography
                    sx={{ fontWeight: 'bold', color: '#333333', fontSize: "12px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                  >
                    {item.protocolName}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 'bold', color: '#A8A8A8', fontSize: "10px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                  >
                    {""}
                  </Typography>
                </Box>

                {/* Icons Section */}
                <Box
                  sx={{ py: 1, px: 2, width: "100%" }}
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
                        {/* {item?.protocolOverallImpactRating} */}
                        {overallEvidenceRating}
                      </Typography>
                    </Box>
                    {/* Icon 2 */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* <img src='/images/Timer.svg' alt='' height={'auto'} width={'auto'} /> */}
                      <Hourglass size={16} />
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
                <Button fullWidth onClick={() =>
                  navigate(`/dashboard/claim?protocolId=${item?.protocolID}&&benefitId=${benefitId}`)
                } size='small' sx={{ textTransform: "capitalize", bgcolor: "#226296", color: "#ffffff", ":hover": { bgcolor: "#226285" }, fontSize: "12px", borderRadius: "50px" }} >View</Button>
              </Card>
            </Grid>
          )
        })
      ) : (
        <Grid item xs={12}>
          <Typography textAlign={'center'}>No Protocol data found</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default BenefitProtocolCard;
