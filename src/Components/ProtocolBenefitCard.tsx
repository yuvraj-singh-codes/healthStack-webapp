import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { FaAward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Benefit } from "./Interface/Interface";

interface BenefitProtocolCardProps {
  protocolID: string | null;
  data: Benefit[]
}

const BenefitProtocolCard: React.FC<BenefitProtocolCardProps> = ({ protocolID, data }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={1} mt={2}>
      {
        data.length > 0 ? (
          data?.map((item) => (
            <Grid item key={item.benefitID} xs={4} sm={4} md={4} lg={4}>
              <Card
                onClick={() => navigate(`/dashboard/claim?benefitId=${item.benefitID}&&protocolId=${protocolID}`)}
                sx={{
                  borderRadius: "10px",
                  border: "1px solid #e0e0e0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  cursor: "pointer"
                }}
              >
                {/* Top Section with Background */}
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#EAF5F6",
                    borderRadius: "10px 10px 0 0",
                    py: 1,
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
                      width: 87,
                      height: 87,
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  {/* Title */}
                  <Typography
                    variant="subtitle2"
                    sx={{ textAlign: "center", fontSize: "12px", mt: 1 }}
                  >
                    {`<${item.benefitName}>`}
                  </Typography>
                </Box>
                {/* Icons Section */}
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <FaAward size={20} />
                    <Typography variant="caption" sx={{ fontSize: "10px" }}>
                      X/X
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography textAlign={'center'}>No Benefit data found!!</Typography>
          </Grid>
        )
      }

    </Grid>
  );
};

export default BenefitProtocolCard;
