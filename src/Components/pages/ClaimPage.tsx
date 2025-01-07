import { useState } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import jsonData from "../../JSON_Example/JSON_example_vShort.json"
import jsonData from '../../JSON_Example/healthstack_data_example.json'
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";

interface textType {
  text_1: boolean;
  text_2: boolean;
  text_3: boolean;
  text_4: boolean;
}

const ClaimPage = () => {
  const navigate = useNavigate();
  const { claims, protocols, benefits } = jsonData;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const benefitId = queryParams.get('benefitId');
  const protocolId = queryParams.get('protocolId');
  const singleProtocol = protocols.find(protocol =>
    (protocol.protocolID === protocolId)
  );
  const singleBenefit = benefits.find(benefit =>
    (benefit.benefitID === benefitId)
  );
  const newClaim = claims.filter(claim =>
    (benefitId && claim.claimBenefitID === benefitId) &&
    (protocolId && claim.claimProtocolID === protocolId)
  );
  const [showText, setShowText] = useState<textType>({
    text_1: false,
    text_2: false,
    text_3: true,
    text_4: true,
  });

  const toggleText1 = () => {
    setShowText((prevState) => ({ ...prevState, text_1: !prevState.text_1 }));
  };

  const toggleText3 = () => {
    setShowText((prevState) => ({ ...prevState, text_3: !prevState.text_3 }));
  };
  const toggleText4 = () => {
    setShowText((prevState) => ({ ...prevState, text_4: !prevState.text_4 }));
  };
  // const instructionPoints = newClaim[0]?.claimProtocolInstructions?.split("\n");

  return (
    <>
      {
        newClaim.length !== 0 ? (
          <Box sx={{ padding: 2, maxWidth: 600, margin: "auto" }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {/* Left side div - Sauna Therapy */}
              <Box
                sx={{
                  width: '120px',
                  height: '120px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'radial-gradient(circle, #D4C89E 20%, #FFFFFF 70%)',
                }}
              >
                <Box onClick={() => navigate(`/dashboard/protocol-benefit?id=${protocolId}`)} sx={{ width: '88px', height: '88px', position: 'relative', zIndex: 10 }}>
                  <img
                    src={singleProtocol?.protocolImageID}
                    alt={singleProtocol?.protocolName}
                    width={88}
                    height={88}
                    style={{ objectFit: 'cover', boxShadow: "1px 4px 5px gray", borderRadius: "5px" }}
                  />

                  <Box
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      padding: '8px',
                      position: 'absolute',
                      bottom: 0,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body2" fontWeight="600" fontSize="12px">
                      {singleProtocol?.protocolName}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Connection Line (Oval Shape) */}
              <Box
                sx={{
                  width: '195px',
                  height: '110px',
                  borderRadius: '70%',
                  position: 'absolute',
                  border: '2px solid #666666',
                }}
              />

              {/* Right side div - Heart Health */}
              <Box
                sx={{
                  width: '120px',
                  height: '120px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'radial-gradient(circle, #ABD8DB 20%, #FFFFFF 70%)',
                  borderRadius: '50%',
                }}
              >
                <Box onClick={() => { navigate(`/dashboard/benefit-protocol?id=${benefitId}`) }} sx={{ width: '88px', height: '88px', position: 'relative', zIndex: 10 }}>
                  <img
                    src={singleBenefit?.benefitImageID}
                    alt={singleBenefit?.benefitName}
                    width={88}
                    height={88}
                    style={{ objectFit: 'cover', boxShadow: "1px 4px 5px gray", borderRadius: "5px" }}
                  />
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      padding: '8px',
                      position: 'absolute',
                      bottom: 0,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body2" fontWeight="600" fontSize="12px">
                      {singleBenefit?.benefitName}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Typography variant="body2" gutterBottom>
              {newClaim[0].claimDescription}
            </Typography>

            <Box sx={{ marginBottom: 2 }}>
              <Typography
                sx={{ fontSize: "24px", color: "#000", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
                onClick={toggleText1}
              >
                Mechanisms of Action{" "}
                {showText.text_1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </Typography>
              {showText.text_1 && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {newClaim[0]?.claimMechanisms}
                </Typography>
              )}
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography
                sx={{ fontSize: "24px", color: "#000", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
                onClick={toggleText3}
              >
                Insights Summary{" "}
                <span style={{ marginTop: "5px" }}> {showText.text_3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </Typography>
              {showText.text_3 && (
                <>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    These insights summarize the evidence on how sauna use impacts the risk of heart disease.
                  </Typography>
                  <Grid container spacing={2}>
                    {newClaim[0]?.claimImpactRatingDescription && <Grid item xs={12} sm={6} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          // px: 1,
                          border: "2px solid #F0EFEF",
                          borderRadius: "5px",
                          bgcolor: "#F7F7F7",
                        }}
                      >
                        <Box sx={{ mr: 2, color: "#000", mt: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", pl: 1 }}>
                          <AiOutlineLike size={24} />
                          <p style={{ fontSize: "12px" }}>{`${newClaim[0]?.claimImpactRating}/5`}</p>
                        </Box>
                        <Box sx={{ p: 0 }} >
                          <Typography variant="subtitle1" fontWeight="normal">
                            Impact :
                            <Typography
                              component="span"
                              color="#000"
                              fontWeight="bold"
                            >
                              {" "} High
                            </Typography>
                            <Divider />
                          </Typography>
                          <Typography variant="body2" color="#000">
                            {newClaim[0]?.claimImpactRatingDescription}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>}
                    {newClaim[0]?.claimMaturityRatingDescription && <Grid item xs={12} sm={6} md={6} >
                      <Box
                        sx={{
                          display: "flex",
                          // px: 1,
                          border: "2px solid #F0EFEF",
                          borderRadius: "5px",
                          bgcolor: "#F7F7F7",
                        }}
                      >
                        <Box sx={{ mr: 2, color: "#000", mt: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", pl: 1 }}>
                          <img src='/images/Potted_Flower_Tulip.svg' alt='' height={'auto'} width={'auto'} />
                          <p style={{ fontSize: "12px" }}>{`${newClaim[0]?.claimMaturityRating}/5`}</p>
                        </Box>
                        <Box sx={{ p: 0 }}>
                          <Typography variant="subtitle1" fontWeight="normal">
                            Maturity :
                            <Typography
                              component="span"
                              color="#000"
                              fontWeight="bold"
                            >
                              {" "}High
                            </Typography>
                            <Divider />
                          </Typography>
                          <Typography variant="body2" color="#000" >
                            {newClaim[0]?.claimMaturityRatingDescription}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>}
                    {newClaim[0]?.claimConsensusRatingDescription && <Grid item xs={12} sm={6} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          // px: 1,
                          border: "2px solid #F0EFEF",
                          borderRadius: "5px",
                          bgcolor: "#F7F7F7",
                        }}
                      >
                        <Box sx={{ mr: 2, color: "#000", mt: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", pl: 1 }}>
                          <img src='/images/gmail_groups.svg' alt='' height={'auto'} width={'auto'} />
                          <p style={{ fontSize: "12px" }}>{`${newClaim[0]?.claimConsensusRating}/5`}</p>
                        </Box>
                        <Box sx={{ p: 0 }}>
                          <Typography variant="subtitle1" fontWeight="normal">
                            Consensus :
                            <Typography
                              component="span"
                              color="#000"
                              fontWeight="bold"
                            >
                              {" "} Moderate
                            </Typography>
                            <Divider />
                          </Typography>
                          <Typography variant="body2" color="#000">
                            {newClaim[0]?.claimConsensusRatingDescription}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>}
                    {newClaim[0]?.claimOverallEvidenceRatingDescription && <Grid item xs={12} sm={6} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          // px: 1,
                          border: "2px solid #ABD8DB",
                          borderRadius: "5px",
                          bgcolor: "#EAF5F6",
                        }}
                      >
                        <Box sx={{ mr: 2, color: "#000", mt: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", pl: 1 }}>
                          <img src='/images/Star_Badge.svg' alt='' height={'auto'} width={'auto'} />
                          <p style={{ fontSize: "12px" }}>{`${newClaim[0]?.claimOverallEvidenceRating}/5`}</p>
                        </Box>
                        <Box sx={{ p: 0 }}>
                          <Typography variant="subtitle1" fontWeight="normal">
                            Overall Evidence Rating :
                            <Typography
                              component="span"
                              color="#000"
                              fontWeight="bold"
                            >
                              {" "} Strong
                            </Typography>
                          </Typography>
                          <Divider />
                          <Typography variant="body2" color="#000">
                            {newClaim[0]?.claimOverallEvidenceRatingDescription}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>}
                  </Grid>
                </>
              )}
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                sx={{ fontSize: "24px", color: "#000", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
                onClick={toggleText4}
              >
                Publications consulted
                {showText.text_4 ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </Typography>
              {showText.text_4 && (
                <Box sx={{ marginTop: 1 }}>
                  {newClaim[0]?.claimSources.map((item, index) => (
                    <Grid container key={index}>
                      <Grid item xs={1}>
                        <Typography sx={{ fontSize: "16px", color: "#000", fontWeight: 700 }}>{index + 1}.</Typography>
                      </Grid>
                      <Grid item xs={11}>
                        <Typography sx={{ fontSize: "16px", color: "#000", fontWeight: 700 }}>{item?.title}</Typography>
                        <Box>
                          <Typography sx={{ fontSize: "14px", color: "gray", }}>{item?.authors}{" "}{item?.publisher}</Typography>
                          <Typography sx={{ fontSize: "14px", color: "gray", fontWeight: "normal" }}>{item?.summary}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4, maxWidth: 600, margin: "auto" }}>
            <Typography sx={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}>No claim found</Typography>
          </Box>
        )
      }
    </>
  );
};

export default ClaimPage;
