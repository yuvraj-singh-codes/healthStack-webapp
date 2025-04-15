import React from "react";
import { Box, Card, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Benefit } from "./Interface/Interface";
import jsonData from "../healthstack_data_example.json";
import StatusIndicator from "./utils/StatusIndicator";
import { EvidenceColorBoxes } from "./utils/StatusColor";
import medalIcon from "../assets/images/medal.svg";

interface BenefitProtocolCardProps {
  protocolID: string | null;
  data: Benefit[];
}

const BenefitProtocolCard: React.FC<BenefitProtocolCardProps> = ({
  protocolID,
  data,
}) => {
  const navigate = useNavigate();
  const { claims } = jsonData;

  return (
    <Grid container spacing={1} mt={2}>
      {data.length > 0 ? (
        data.map((item) => {
          const matchedClaim = claims.find(
            (claim) =>
              claim.claimProtocolID === protocolID &&
              claim.claimBenefitID === item.benefitID
          );
          const overallEvidenceRating = matchedClaim
            ? matchedClaim.claimOverallEvidenceRating
            : 0;
          return (
            <Grid item key={item.benefitID} xs={4}>
              <Card
                onClick={() =>
                  navigate(
                    `/dashboard/claim?benefitId=${item.benefitID}&&protocolId=${protocolID}`
                  )
                }
                sx={{
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  border: "1.6px solid #A8A8A8",
                  backgroundColor:'#E8E5E5',
                  p: 1,
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
                  {/* Image */}
                  <Box sx={{ width: "100%", height: "65px" }}>
                    <img
                      src={item.benefitImageID}
                      alt={item.benefitName}
                      style={{
                        borderRadius: "10px",
                        objectFit: "fill",
                        width: "100%",
                        height: "100%"
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{ fontWeight: 'bold', color: '#333333', fontSize: "14px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                  >
                    {item.benefitName}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 'bold', color: '#A8A8A8', fontSize: "12px", wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal' }}
                  >
                    {item?.benefitCategory?item?.benefitCategory:"Supplements"}
                  </Typography>
                </Box>
                {/* Icons Section */}
                <Box sx={{ py: "8px", width: "100%" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: "2px",mt:"2px" }}>
                      <img src={medalIcon} alt='' height={'14px'} width={'12px'} />
                      <StatusIndicator size={12} value={overallEvidenceRating} colorBoxes={EvidenceColorBoxes} />
                    </Box>
                </Box>
                <Button fullWidth onClick={() =>
                  navigate(
                    `/dashboard/claim?benefitId=${item.benefitID}&&protocolId=${protocolID}`
                  )
                } size='small' sx={{ textTransform: "capitalize", bgcolor: "#00C853", color: "#ffffff", ":hover": { bgcolor: "#00B44A" }, fontSize: "12px",borderRadius:"50px" }} >View</Button>
              </Card>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <Typography textAlign={"center"}>
            No Benefit data found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default BenefitProtocolCard;
