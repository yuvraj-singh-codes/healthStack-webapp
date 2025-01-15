import { useState } from "react";
import { Box, Typography, Grid, Divider, IconButton } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp, } from "react-icons/io";
import jsonData from '../../healthstack_data_example.json'
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import SearchComponent from "../utils/Search";
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
    text_1: true,
    text_2: false,
    text_3: false,
    text_4: false,
  });

  const toggleText2 = () => {
    setShowText((prevState) => ({ ...prevState, text_2: !prevState.text_2 }));
  };

  const toggleText3 = () => {
    setShowText((prevState) => ({ ...prevState, text_3: !prevState.text_3 }));
  };
  const toggleText4 = () => {
    setShowText((prevState) => ({ ...prevState, text_4: !prevState.text_4 }));
  };
  // const instructionPoints = newClaim[0]?.claimProtocolInstructions?.split("\n");
  const instructionPoints = newClaim[0]?.claimProtocolInstructions
    ?.split("\n")
    ?.map((item) => item.replace(/^\d+\.\s*/, ""));

  const getTextualDescription = (rating: number) => {
    const roundedRating = Math.round(rating);
    switch (roundedRating) {
      case 1:
        return "Low";
      case 2:
        return "Low-Moderate";
      case 3:
        return "Moderate";
      case 4:
        return "Moderate-High";
      case 5:
        return "High";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <SearchComponent />
      {
        newClaim.length !== 0 ? (
          <Box sx={{ padding: 2, maxWidth: 600, margin: "auto" }}>
            <Typography
              sx={{ fontSize: "20px", color: "#000", fontWeight: "600", pb: 2 }}
            >
              What does the Research Say?{" "}
            </Typography>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 10, sm: 15, md: 20, lg: 20 },
                mt: { xs: 0, sm: 1, md: 2, lg: 2 },
              }}
            >
              {/* Left side div - Sauna Therapy */}
              <Box
                sx={{
                  width: '150px',
                  height: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'radial-gradient(circle, #D4C89E 20%, #FFFFFF 70%)',
                  borderRadius: '50%',
                }}
              >
                <Box onClick={() => navigate(`/dashboard/protocol-benefit?id=${protocolId}`)} sx={{ width: '120px', height: '120px', position: 'relative', zIndex: 10 }}>
                  <img
                    src={singleProtocol?.protocolImageID}
                    alt={singleProtocol?.protocolName}
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover', boxShadow: "1px 4px 5px gray", borderRadius: "5px" }}
                  />
                  <Typography className="scrollbar" variant="body2" fontWeight="600" fontSize="12px" sx={{
                    wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal', overflow: "auto", bgcolor: "red",
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '8px',
                    position: 'absolute',
                    bottom: 0,
                    textAlign: 'center',
                    width: "100%",
                    px: "1px",
                    // height:"65px",
                    borderBottomRightRadius:"5px",
                    borderBottomLeftRadius:"5px"
                  }}>
                    {singleProtocol?.protocolName}
                  </Typography>
                </Box>
              </Box>

              {/* Connection Line (Oval Shape) */}
              <Box
                sx={{
                  width: { xs: '310px', sm: '350px', md: '370px', lg: '370px' },
                  height: { xs: '170px', sm: "180px", md: "200px", lg: "200px" },
                  borderRadius: '70%',
                  position: 'absolute',
                  // top: "2px",
                  border: '2px solid #666666',
                }}
              />

              {/* Right side div - Heart Health */}
              <Box
                sx={{
                  width: '150px',
                  height: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'radial-gradient(circle, #ABD8DB 20%, #FFFFFF 70%)',
                  borderRadius: '50%',
                }}
              >
                <Box onClick={() => { navigate(`/dashboard/benefit-protocol?id=${benefitId}`) }} sx={{ width: '120px', height: '120px', position: 'relative', zIndex: 10 }}>
                  <img
                    src={singleBenefit?.benefitImageID}
                    alt={singleBenefit?.benefitName}
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover', boxShadow: "1px 4px 5px gray", borderRadius: "5px" }}
                  />
                  <Typography className="scrollbar" variant="body2" fontWeight="600" fontSize="12px" sx={{
                    wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", lineHeight: 'normal', overflow: "auto", bgcolor: "red",
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '8px',
                    position: 'absolute',
                    bottom: 0,
                    textAlign: 'center',
                    width: "100%",
                    px: "1px",
                    // height:"65px",
                    borderBottomRightRadius:"5px",
                    borderBottomLeftRadius:"5px"
                  }}>
                    {singleBenefit?.benefitName}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: { xs: 4, md: 6 } }}>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                {newClaim[0]?.claimMechanisms}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 600 }}

                >
                  Research Insights{" "}
                  <IconButton onClick={toggleText3} size="small" sx={{ color: "#000", fontSize: "24px", mt: "5px" }}> {showText.text_3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
                </Typography>
                {showText.text_3 && (
                  <>
                    <Grid container spacing={2}>
                      {newClaim[0]?.claimOverallEvidenceRating && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              border: "2px solid #ABD8DB",
                              borderRadius: "5px",
                              bgcolor: "#EAF5F6",
                            }}
                          >
                            <Box
                              sx={{
                                mr: 2,
                                color: "#000",
                                mt: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "5px",
                                pl: 1,
                              }}
                            >
                              <img src="/images/Star_Badge.svg" alt="" height={"20px"} width={"auto"} />
                              <p style={{ fontSize: "12px" }}>{`${newClaim[0]?.claimOverallEvidenceRating}/5`}</p>
                            </Box>
                            <Box sx={{ p: 0 }}>
                              <Typography variant="subtitle1" fontWeight="normal">
                                Overall Evidence Rating:
                                <Typography component="span" color="#000" fontWeight="bold">
                                  {" "}
                                  {getTextualDescription(newClaim[0]?.claimOverallEvidenceRating)}
                                </Typography>
                              </Typography>
                              <Divider />
                              <Typography variant="body2" color="#000">
                                {newClaim[0]?.claimOverallEvidenceRatingDescription}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                          This is based on these research-derived metrics
                        </Typography>
                      </Grid>
                      {newClaim[0]?.claimImpactRating && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              border: "2px solid #F0EFEF",
                              borderRadius: "5px",
                              bgcolor: "#F7F7F7",
                            }}
                          >
                            <Box
                              sx={{
                                mr: 2,
                                color: "#000",
                                mt: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "5px",
                                pl: 1,
                              }}
                            >
                              <AiOutlineLike size={24} />
                              <p style={{ fontSize: "12px" }}>{`${newClaim[0]?.claimImpactRating}/5`}</p>
                            </Box>
                            <Box sx={{ p: 0 }}>
                              <Typography variant="subtitle1" fontWeight="normal">
                                Impact:
                                <Typography component="span" color="#000" fontWeight="bold">
                                  {" "}
                                  {getTextualDescription(newClaim[0]?.claimImpactRating)}
                                </Typography>
                              </Typography>
                              <Divider />
                              <Typography variant="body2" color="#000">
                                {newClaim[0]?.claimImpactRatingDescription}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                      {newClaim[0]?.claimMaturityRating && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              border: "2px solid #F0EFEF",
                              borderRadius: "5px",
                              bgcolor: "#F7F7F7",
                            }}
                          >
                            <Box
                              sx={{
                                mr: 2,
                                color: "#000",
                                mt: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "5px",
                                pl: 1,
                              }}
                            >
                              <img src="/images/Potted_Flower_Tulip.svg" alt="" height={"auto"} width={"auto"} />
                              <p style={{ fontSize: "12px" }}>{`${newClaim[0]?.claimMaturityRating}/5`}</p>
                            </Box>
                            <Box sx={{ p: 0 }}>
                              <Typography variant="subtitle1" fontWeight="normal">
                                Maturity:
                                <Typography component="span" color="#000" fontWeight="bold">
                                  {" "}
                                  {getTextualDescription(newClaim[0]?.claimMaturityRating)}
                                </Typography>
                              </Typography>
                              <Divider />
                              <Typography variant="body2" color="#000">
                                {newClaim[0]?.claimMaturityRatingDescription}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                      {newClaim[0]?.claimConsensusRating && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              border: "2px solid #F0EFEF",
                              borderRadius: "5px",
                              bgcolor: "#F7F7F7",
                            }}
                          >
                            <Box
                              sx={{
                                mr: 2,
                                color: "#000",
                                mt: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "5px",
                                pl: 1,
                              }}
                            >
                              <img src="/images/gmail_groups.svg" alt="" height={"auto"} width={"auto"} />
                              <p style={{ fontSize: "12px" }}>{`${newClaim[0]?.claimConsensusRating}/5`}</p>
                            </Box>
                            <Box sx={{ p: 0 }}>
                              <Typography variant="subtitle1" fontWeight="normal">
                                Consensus:
                                <Typography component="span" color="#000" fontWeight="bold">
                                  {" "}
                                  {getTextualDescription(newClaim[0]?.claimConsensusRating)}
                                </Typography>
                              </Typography>
                              <Divider />
                              <Typography variant="body2" color="#000">
                                {newClaim[0]?.claimConsensusRatingDescription}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </>
                )}
              </Box>
              <Box>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 600 }}

                >
                  Instructions
                  <IconButton onClick={toggleText2} size="small" sx={{ color: "#000", fontSize: "24px", mt: "5px" }}>{showText.text_2 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
                </Typography>
                {
                  showText.text_2 && (
                    <Grid container>
                      {
                        instructionPoints?.map((item, index) => (
                          <Grid item xs={12} key={index} >
                            <Box sx={{ display: "flex", gap: "5px" }}>
                              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{index + 1}.</Typography>
                              <Typography sx={{ fontSize: "14px" }}>{item}</Typography>
                            </Box>
                          </Grid>
                        ))
                      }
                    </Grid>
                  )
                }
                <Box sx={{ marginBottom: 2 }}>
                  <Typography
                    sx={{ fontSize: "16px", color: "#000", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 600 }}

                  >
                    Publications Consulted
                    <IconButton onClick={toggleText4} size="small" sx={{ color: "#000", fontSize: "24px", mt: "5px" }}>{showText.text_4 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
                  </Typography>
                  {showText.text_4 && (
                    <Box sx={{ marginTop: 1 }}>
                      <Grid container >
                        {newClaim[0]?.claimSources.map((item, index) => (
                          <Grid item xs={12} mt={1} key={index}>
                            <Box sx={{ display: "flex", gap: "5px" }}>
                              <Typography sx={{ fontSize: "16px", color: "#000", fontWeight: 700 }}>{index + 1}.</Typography>
                              <Box>
                                <Typography sx={{ fontSize: "16px", color: "#000", fontWeight: 700, fontStyle: "italic" }}>{item?.title}</Typography>
                                <Typography sx={{ fontSize: "14px", color: "gray", }}>{item?.authors}{" "}{`(${item?.year})`}</Typography>
                                <Typography sx={{ fontSize: "15px", color: "#616161", fontWeight: 600 }}>{item?.publisher}</Typography>
                                <Typography sx={{ fontSize: "15px", color: "gray", fontWeight: "normal", py: "1px", }}><span style={{ color: "#000", fontWeight: "600" }}>Summary : </span>{item?.summary}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Box>
              </Box>
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
