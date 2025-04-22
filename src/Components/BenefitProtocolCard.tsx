import React from 'react';
import { Card, Typography, Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Protocol } from './Interface/Interface';
import jsonData from "../healthstack_data_example.json";
import medalIcon from "../assets/images/medal.svg";
import dollerIcon from "../assets/images/dollar.svg";
import timerIcon from "../assets/images/timer.svg";
import StatusIndicator from './utils/StatusIndicator';
import { colorBoxes, EvidenceColorBoxes } from './utils/StatusColor';
interface BenefitProtocolCardProps {
  benefitId: string | null;
  data: Protocol[];
}

const BenefitProtocolCard: React.FC<BenefitProtocolCardProps> = ({ benefitId, data }) => {
  const navigate = useNavigate();
  const { claims } = jsonData;
  return (
    <Grid container spacing={"5px"}>
      {data.length > 0 ? (
        data.map((item) => {
          const matchedClaim = claims.find(
            (claim) =>
              claim.claimProtocolID === item.protocolID &&
              claim.claimBenefitID === benefitId
          );
          const overallEvidenceRating = matchedClaim
            ? matchedClaim.claimOverallEvidenceRating
            : 0;
          return (
            <Grid item xs={4} sm={4} md={4} key={item?.protocolID}>
              <Card
                onClick={() =>
                  navigate(`/dashboard/claim?protocolId=${item?.protocolID}&&benefitId=${benefitId}`)
                }
                sx={{
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  border: "1.6px solid #e5e5e5",
                  backgroundColor:'#f9f9f9',
                  p: "5px",
                  boxShadow: "none"
                }}
              >
                {/* Top Section with Background */}
                <Box
                  sx={{
                    width: "100%",
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
                    sx={{ fontWeight: 'bold', color: '#333333', fontSize: "14px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                  >
                    {item.protocolName}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 'bold', color: '#A8A8A8', fontSize: "12px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                  >
                    {item?.protocolCategories[0]}
                  </Typography>
                </Box>

                {/* Icons Section */}
                <Box
                  sx={{ py: 1, width: "100%" }}
                >
                  <Box sx={{
                    display: 'flex',
                    flexDirection:"column",

                    gap: '5px',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center',gap: "2px" }}>
                      <img src={timerIcon} alt='' height={'10px'} width={'10px'} />
                      <StatusIndicator size={8} value={item?.protocolRelativeTimeRating} colorBoxes={colorBoxes} gap={"3px"} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center',gap: "2px" }}>
                      <img src={dollerIcon} alt='' height={'10px'} width={'10px'} />
                      <StatusIndicator size={8} value= {item?.protocolRelativeCostRating} colorBoxes={colorBoxes} gap={"3px"} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "5px",mt:"2px" }}>
                      <img src={medalIcon} alt='' height={'13px'} width={'11px'} />
                      <StatusIndicator size={13} value={overallEvidenceRating} colorBoxes={EvidenceColorBoxes} />
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
