import React from "react";
import { Box, Card, CardMedia, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Benefit } from "./Interface/Interface";
import jsonData from "../healthstack_data_example.json";

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
            : "0";
          return (
            <Grid item key={item.benefitID} xs={4} sm={4} md={4} lg={4}>
              <Card
                onClick={() =>
                  navigate(
                    `/dashboard/claim?benefitId=${item.benefitID}&&protocolId=${protocolID}`
                  )
                }
                sx={{
                  borderRadius: "10px",
                  border: "1px solid #e0e0e0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {/* Top Section with Background */}
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#EAF5F6",
                    borderRadius: "10px 10px 0 0",
                    pt: 1,
                    px: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* Image */}
                  <CardMedia
                    component="img"
                    image={item.benefitImageID}
                    alt={item.benefitName}
                    sx={{
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                  {/* Title */}
                  <Typography
                    variant="subtitle2"
                    className="scrollbar"
                    sx={{
                      textAlign: "center",
                      fontSize: "12px",
                      mt: "2px",
                      height: "50px",
                      overflow: "auto",
                      fontWeight:600,
                      wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal'
                    }}
                  >
                    {item.benefitName}
                  </Typography>
                </Box>
                {/* Icons Section */}
                <Box sx={{ py: 1, px: 2, width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/images/Star_Badge.svg"
                      alt=""
                      height={"auto"}
                      width={"auto"}
                    />
                    {/* Display Evidence Rating */}
                    <Typography variant="caption" sx={{ fontSize: "14px" }}>
                      {overallEvidenceRating}/5
                    </Typography>
                  </Box>
                </Box>
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
