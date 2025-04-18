import { useEffect, useState } from "react";
import { Box, Typography, Grid, IconButton, Button } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp, } from "react-icons/io";
import jsonData from '../../healthstack_data_example.json'
import { useLocation, useNavigate } from "react-router-dom";
import SearchComponent from "../utils/Search";
import { FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import ClaimModal from "../utils/ClaimModal";
import ConfirmTourModal from "../utils/ConfirmTourModal";
import { setValue } from "../../features/tabSlice";
import { useDispatch } from "react-redux";
import StatusIndicator from "../utils/StatusIndicator";
import { EvidenceColorBoxes } from "../utils/StatusColor";
import medalIcon from "../../assets/images/medal.svg";
import targetIcon from "../../assets/images/target.svg";
import booksIcon from "../../assets/images/books.svg";
import handShakeIcon from "../../assets/images/handshake.svg";
interface textType {
  text_1: boolean;
  text_2: boolean;
  text_3: boolean;
  text_4: boolean;
}
interface FeedbackProps {
  setOpen: (value: boolean) => void;
}
const ClaimPage: React.FC<FeedbackProps> = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { claims, protocols, benefits } = jsonData;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const benefitId = queryParams.get('benefitId');
  const protocolId = queryParams.get('protocolId');
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  useEffect(() => {
    const visits = parseInt(localStorage.getItem("page_visits") || "0", 10);
    const modalShown = localStorage.getItem("getFeedBack") === "true";
    if (!modalShown) {
      const newVisits = visits + 1;
      localStorage.setItem("page_visits", newVisits.toString());
      if (newVisits >= 3) {
        setOpen(true);
        localStorage.setItem("getFeedBack", "true");
      }
    }
  }, []);

  useEffect(() => {
    const hasClaimTourModal = localStorage.getItem('isClaimTourModal');
    if (!hasClaimTourModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('isClaimTourModal', 'true');
      }, 1000); // 1 second delay

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, []);

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
      <ClaimModal isOpen={isOpen} onClose={setIsOpen} />
      <ConfirmTourModal onClose={setIsOpen} />
      {
        newClaim.length !== 0 ? (
          <Box sx={{ padding: 2, maxWidth: 600, margin: "auto" }}>
            <Typography
              sx={{ fontSize: "20px", color: "#333333", fontWeight: 700, pb: 2 }}
            >
              {singleProtocol?.protocolName} for {singleBenefit?.benefitName}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ width: "100%", height: "65px" }}>
                    <img
                      src={singleProtocol?.protocolImageID}
                      alt={singleProtocol?.protocolName}
                      style={{
                        borderRadius: "10px",
                        objectFit: "fill",
                        width: "100%",
                        height: "100%"
                      }}
                    />
                  </Box>
                  <FaArrowRight size={40} style={{ color: "#333333f" }} />
                  <Box sx={{ width: "100%", height: "65px" }}>
                    <img
                      src={singleBenefit?.benefitImageID}
                      alt={singleBenefit?.benefitName}
                      style={{
                        borderRadius: "10px",
                        objectFit: "fill",
                        width: "100%",
                        height: "100%"
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Button fullWidth onClick={() => {
                    dispatch(setValue(0));
                    navigate("/dashboard/home");
                  }} size='small' sx={{ textTransform: "capitalize", bgcolor: "#00C853", color: "#ffffff", ":hover": { bgcolor: "#00B44A" }, fontSize: "12px", borderRadius: "50px" }} >All Benefits <MdKeyboardArrowRight size={20} /></Button>
                  <Button fullWidth onClick={() => {
                    dispatch(setValue(1));
                    navigate("/dashboard/home");
                  }} size='small' sx={{ textTransform: "capitalize", bgcolor: "#226296", color: "#ffffff", ":hover": { bgcolor: "#226296" }, fontSize: "10px", borderRadius: "50px" }} >All Protocols <MdKeyboardArrowRight size={20} /></Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: { xs: 4, md: 6 } }}>
              <Typography sx={{ marginTop: 1, color: "#333333", fontSize: "13px" }}>
                {newClaim[0]?.claimMechanisms}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography
                  sx={{ fontSize: "18px", color: "#333333", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 700 }}
                >
                  What does the Research Say?{" "}
                  <IconButton onClick={toggleText3} size="small" sx={{ color: "#000", fontSize: "24px", mt: "5px" }}> {showText.text_3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
                </Typography>
                {showText.text_3 && (
                  <>
                    <Grid container spacing={2}>
                      {newClaim[0]?.claimOverallEvidenceRating && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              border: "3px solid #00C853",
                              borderRadius: "5px",
                              bgcolor: "transparent",
                            }}
                          >
                            <Box p={1}>
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ color: "#333333", fontSize: "16px" }}>
                                  Overall Evidence Rating:
                                  <Typography component="span" sx={{ color: "#333333", fontSize: "16px", fontWeight: 700 }}>
                                    {" "}
                                    {getTextualDescription(newClaim[0]?.claimOverallEvidenceRating)}
                                  </Typography>
                                </Typography>
                                <Box
                                  sx={{
                                    color: "#333333",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <StatusIndicator size={16} value={newClaim[0]?.claimOverallEvidenceRating} colorBoxes={EvidenceColorBoxes} />
                                  <img src={medalIcon} alt="" height={"17px"} width={"16px"} style={{marginLeft:"5px"}} />
                                </Box>
                              </Box>
                              <Typography sx={{ color: "#333333", fontSize: "13px", mt: 1 }}>
                                {newClaim[0]?.claimOverallEvidenceRatingDescription}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                          This Overall Evidence Rating is calculated from these research-derived metrics:
                        </Typography>
                      </Grid>
                      {newClaim[0]?.claimImpactRating && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              border: "1px solid #A8A8A8",
                              borderRadius: "10px",
                              bgcolor: "transparent"
                            }}
                          >
                            <Box p={1}>
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ color: "#333333", fontSize: "16px" }}>
                                  Impact:
                                  <Typography component="span" sx={{ color: "#333333", fontSize: "16px", fontWeight: 700 }}>
                                    {" "}
                                    {getTextualDescription(newClaim[0]?.claimImpactRating)}
                                  </Typography>
                                </Typography>
                                <Box
                                  sx={{
                                    color: "#333333",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <StatusIndicator size={16} value={newClaim[0]?.claimImpactRating} colorBoxes={EvidenceColorBoxes} />
                                  <img src={targetIcon} alt="" height={"17px"} width={"16px"} style={{marginLeft:"5px"}}/>
                                </Box>
                              </Box>
                              <Typography sx={{ color: "#333333", fontSize: "13px", mt: 1 }}>
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
                              border: "1px solid #A8A8A8",
                              borderRadius: "10px",
                              bgcolor: "transparent"
                            }}
                          >
                            <Box p={1} >
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ color: "#333333", fontSize: "16px" }}>
                                  Maturity:
                                  <Typography component="span" sx={{ color: "#333333", fontSize: "16px", fontWeight: 700 }}>
                                    {" "}
                                    {getTextualDescription(newClaim[0]?.claimMaturityRating)}
                                  </Typography>
                                </Typography>
                                <Box
                                  sx={{
                                    color: "#333333",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <StatusIndicator size={16} value={newClaim[0]?.claimMaturityRating} colorBoxes={EvidenceColorBoxes} />
                                  <img src={booksIcon} alt="" height={"17px"} width={"16px"} style={{marginLeft:"5px"}}/>

                                </Box>
                              </Box>
                              <Typography sx={{ color: "#333333", fontSize: "13px", mt: 1 }}>
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
                              border: "1px solid #A8A8A8",
                              borderRadius: "10px",
                              bgcolor: "transparent"
                            }}
                          >
                            <Box p={1} >
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ color: "#333333", fontSize: "16px" }}>
                                  Consensus:
                                  <Typography component="span" sx={{ color: "#333333", fontSize: "16px", fontWeight: 700 }}>
                                    {" "}
                                    {getTextualDescription(newClaim[0]?.claimConsensusRating)}
                                  </Typography>
                                </Typography>
                                <Box
                                  sx={{
                                    color: "#333333",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                  }}
                                >
                                  <StatusIndicator size={16} value={newClaim[0]?.claimConsensusRating} colorBoxes={EvidenceColorBoxes} />
                                  <img src={handShakeIcon} alt="" height={"17px"} width={"16px"} style={{marginLeft:"5px"}}/>
                                </Box>
                              </Box>
                              <Typography sx={{ color: "#333333", fontSize: "13px", mt: 1 }}>
                                {newClaim[0]?.claimConsensusRatingDescription}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                    <Box sx={{ marginY: 1 }}>
                  <Typography
                    sx={{ fontSize: "16px", color: "#333333", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 600 }}

                  >
                    References
                    <IconButton onClick={toggleText4} size="small" sx={{ color: "#333333", fontSize: "24px", mt: "5px" }}>{showText.text_4 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
                  </Typography>
                  {showText.text_4 && (
                    <Box sx={{ marginTop: 0 }}>
                      <Grid container >
                        {newClaim[0]?.claimSources.map((item, index) => (
                          <Grid item xs={12} mt={1} key={index}>
                            <Box sx={{ display: "flex", gap: "5px" }}>
                              <Typography sx={{ fontSize: "16px", color: "#333333", fontWeight: 700 }}>{index + 1}.</Typography>
                              <Box>
                                <Typography sx={{ fontSize: "16px", color: "#333333", fontWeight: 700, fontStyle: "italic" }}>{item?.title}</Typography>
                                <Typography sx={{ fontSize: "14px", color: "gray", }}>{item?.authors}{" "}{`(${item?.year})`}</Typography>
                                <Typography sx={{ fontSize: "15px", color: "#616161", fontWeight: 600 }}>{item?.publisher}</Typography>
                                <Typography sx={{ fontSize: "15px", color: "gray", fontWeight: "normal", py: "1px", }}><span style={{ color: "#333333", fontWeight: 600 }}>Summary : </span>{item?.summary}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Box>
                  </>
                )}

              </Box>
              {/* <Typography
                sx={{ fontSize: "16px", color: "#333333", fontWeight: 500 }}>
                References:
              </Typography> */}
              <Box>
                <Typography
                  sx={{ fontSize: "18px", color: "#333333", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 600 }}

                >
                  Instructions
                  <IconButton onClick={toggleText2} size="small" sx={{ color: "#333333", fontSize: "24px", mt: "5px" }}>{showText.text_2 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
                </Typography>
                {
                  showText.text_2 && (
                    <Grid container>
                      {
                        instructionPoints?.map((item, index) => (
                          <Grid item xs={12} key={index} >
                            <Box sx={{ display: "flex", gap: "5px" }}>
                              <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#333333" }}>{index + 1}.</Typography>
                              <Typography sx={{ fontSize: "14px", color: "#333333" }}>{item}</Typography>
                            </Box>
                          </Grid>
                        ))
                      }
                    </Grid>
                  )
                }
                {/* <Box sx={{ marginBottom: 2 }}>
                  <Typography
                    sx={{ fontSize: "16px", color: "#333333", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 600 }}

                  >
                    Publications Consulted
                    <IconButton onClick={toggleText4} size="small" sx={{ color: "#333333", fontSize: "24px", mt: "5px" }}>{showText.text_4 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
                  </Typography>
                  {showText.text_4 && (
                    <Box sx={{ marginTop: 1 }}>
                      <Grid container >
                        {newClaim[0]?.claimSources.map((item, index) => (
                          <Grid item xs={12} mt={1} key={index}>
                            <Box sx={{ display: "flex", gap: "5px" }}>
                              <Typography sx={{ fontSize: "16px", color: "#333333", fontWeight: 700 }}>{index + 1}.</Typography>
                              <Box>
                                <Typography sx={{ fontSize: "16px", color: "#333333", fontWeight: 700, fontStyle: "italic" }}>{item?.title}</Typography>
                                <Typography sx={{ fontSize: "14px", color: "gray", }}>{item?.authors}{" "}{`(${item?.year})`}</Typography>
                                <Typography sx={{ fontSize: "15px", color: "#616161", fontWeight: 600 }}>{item?.publisher}</Typography>
                                <Typography sx={{ fontSize: "15px", color: "gray", fontWeight: "normal", py: "1px", }}><span style={{ color: "#333333", fontWeight: 600 }}>Summary : </span>{item?.summary}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Box> */}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4, maxWidth: 600, margin: "auto" }}>
            <Typography sx={{ color: "#333333", fontSize: "20px", fontWeight: "bold" }}>No claim found</Typography>
          </Box>
        )
      }
    </>
  );
};

export default ClaimPage;
