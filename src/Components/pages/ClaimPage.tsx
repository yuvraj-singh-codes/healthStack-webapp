import { useEffect, useState } from "react";
import { Box, Typography, Grid, IconButton, Button, Divider, Stack } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp, } from "react-icons/io";
import jsonData from '../../healthstack_data_example.json'
import { useLocation, useNavigate } from "react-router-dom";
import SearchComponent from "../utils/Search";
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
import LaunchIcon from '@mui/icons-material/Launch';
import bgGradImage from '../../assets/images/bgGrad.png'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";

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
  const [expanded, setExpanded] = useState<boolean>(false);
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


  const toggleExpand = () => setExpanded((prev) => !prev);

  const paragraphs = newClaim[0]?.claimDescription
    ?.split("\n")
    .filter(Boolean) || [];

  return (
    <>
      <SearchComponent />
      <ClaimModal isOpen={isOpen} onClose={setIsOpen} />
      <ConfirmTourModal onClose={setIsOpen} />
      {
        newClaim.length !== 0 ? (
          <Box sx={{ padding: 1.5, maxWidth: 600, margin: "auto", bgcolor: "#ffffff" }}>
            <Typography
              sx={{ fontSize: "26px", color: "#333333", fontWeight: "bold", pb: 2, lineHeight: "1.1" }}
            >
              {singleProtocol?.protocolName} for {singleBenefit?.benefitName}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: 4, justifyContent: "space-evenly" }}>

                  {/* Yellow background image */}
                  <Box
                    component="img"
                    src={bgGradImage}
                    alt="background"
                    sx={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "202px",
                      height: "80px",
                      zIndex: 1,
                    }}
                  />
                  {/* First Image */}
                  <Box
                    sx={{
                      width: "130px",
                      height: "80px",
                      zIndex: 2,
                      borderRadius: "10px",

                    }}
                  >
                    <img
                      onClick={()=>{
                        dispatch(setValue(1));
                        navigate("/dashboard/home");
                        }}
                      src={singleProtocol?.protocolImageID}
                      alt={singleProtocol?.protocolName}
                      style={{
                        borderRadius: "10px",
                        objectFit: "cover",
                        width: "100%",



                      }}
                    />
                  </Box>


                  {/* Second Image */}
                  <Box sx={{ width: "130px", height: "80px", position: "relative", zIndex: 2, borderRadius: "10px", }}>
                    <img
                      onClick={()=>{
                      dispatch(setValue(0));
                      navigate("/dashboard/home");
                      }}
                      src={singleBenefit?.benefitImageID}
                      alt={singleBenefit?.benefitName}
                      style={{
                        borderRadius: "10px",
                        objectFit: "cover",
                        width: "100%",

                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto", fontSize: "14px", lineHeight: "1.3" }}>
                {newClaim[0]?.claimMechanisms}
              </Typography>
              <Divider sx={{ bgcolor: "#E8E5E5", mt: 1 }} />
              <Box sx={{ mt: 1 }}>
                <Typography
                  onClick={toggleText3}
                  sx={{ fontSize: "18px", color: "#333333", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, justifyContent: "space-between" }}
                >
                  What the Science Says{" "}
                  <IconButton size="small" sx={{ color: "#000", fontSize: "24px", mt: "3px" }}> {showText.text_3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
                </Typography>

                {showText.text_3 && (
                  <>
                    <Grid container spacing={1}>
                      {newClaim[0]?.claimOverallEvidenceRating && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              border: "3px solid #00C853",
                              borderRadius: "10px",
                              bgcolor: "#f9f9f9",
                            }}
                          >
                            <Box p={1}>
                              <Grid container>
                                <Grid item xs={7}>
                                  <Typography sx={{ color: "#333333", fontSize: "16px" }}>
                                    Overall Evidence :
                                    <Typography component="span" sx={{ color: "#333333", fontSize: "16px", fontWeight: 700 }}>
                                      {" "}
                                      {getTextualDescription(newClaim[0]?.claimOverallEvidenceRating)}
                                    </Typography>
                                  </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                  <Box
                                    sx={{
                                      color: "#333333",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "end",
                                      gap: "5px",
                                      width: "100%",
                                      // mt:"5px",
                                      pt: "3px"
                                    }}
                                  >
                                    <StatusIndicator size={16} value={newClaim[0]?.claimOverallEvidenceRating} colorBoxes={EvidenceColorBoxes} />
                                    <img src={medalIcon} alt="" height={"17px"} width={"16px"} style={{ marginLeft: "5px" }} />
                                  </Box>
                                </Grid>

                              </Grid>
                              <Typography sx={{ color: "#333333", fontSize: "13px", mt: 1 }}>
                                {newClaim[0]?.claimOverallEvidenceRatingDescription}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Box sx={{ position: "relative" }}>
                          <Box
                            sx={{
                              maxHeight: expanded ? "none" : "125px",
                              overflow: "hidden",
                              color: "#333333",
                              fontSize: "13px",
                              wordBreak: "break-word",
                              hyphens: "auto",
                              overflowWrap: "break-word",
                            }}
                          >
                            {paragraphs.map((para, index) => (
                              <Typography
                                key={index}
                                paragraph
                                sx={{
                                  color: "#333333",
                                  fontSize: "14px",
                                  wordBreak: "break-word",
                                  hyphens: "auto",
                                  overflowWrap: "break-word",
                                  lineHeight: index === paragraphs.length - 1 ? "normal" : "1.3",
                                  marginBottom: index === paragraphs.length - 1 ? 0 : undefined,
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                                }}
                              />
                            ))}
                          </Box>
                          <Box sx={{ textAlign: "center", display: "flex", justifyContent: "center", mt: 0.5 }}>
                            <Button size="small" onClick={toggleExpand} sx={{ color: "#333333", textTransform: "capitalize", display: "flex", alignItems: 'center', gap: 1, p: "1px" }}>
                              {expanded ? "Read less" : "Read more"}
                              {expanded ? <MdOutlineKeyboardArrowUp size={20} /> : <MdOutlineKeyboardArrowDown size={20} />}
                            </Button>
                          </Box>
                        </Box>

                      </Grid>
                      {newClaim[0]?.claimImpactRating && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              border: "2px solid #A8A8A8",
                              borderRadius: "10px",
                              bgcolor: "#f9f9f9",
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
                                  <img src={targetIcon} alt="" height={"20px"} width={"20px"} style={{ marginLeft: "5px", marginBottom: "4px" }} />
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
                              border: "2px solid #A8A8A8",
                              borderRadius: "10px",
                              bgcolor: "#f9f9f9",
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
                                  <img src={booksIcon} alt="" height={"17px"} width={"16px"} style={{ marginLeft: "5px" }} />

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
                              border: "2px solid #A8A8A8",
                              borderRadius: "10px",
                              bgcolor: "#f9f9f9",
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
                                  <img src={handShakeIcon} alt="" height={"19px"} width={"20px"} style={{ marginLeft: "5px" }} />
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
                        onClick={toggleText4}
                        sx={{ fontSize: "20px", color: "#333333", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 600, justifyContent: "space-between" }}
                      >
                        Sources
                        <IconButton size="small" sx={{ color: "#333333", fontSize: "24px", mt: "3px" }}>{showText.text_4 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
                      </Typography>
                      {showText.text_4 && (
                        <Box sx={{ marginTop: 0 }}>
                          <Grid container >
                            {newClaim[0]?.claimSources.map((item, index) => (
                              <Grid item xs={12} mt={1} key={index}>
                                <Box sx={{ display: "flex", gap: "5px" ,mb:1}}>
                                  <Typography sx={{ fontSize: "16px", color: "#333333", fontWeight: 700 }}>[{index + 1}]</Typography>
                                  <Box>
                                    <Grid container>
                                      <Grid item xs={10}>
                                        <Typography sx={{ fontSize: "14px", color: "#333333", fontWeight: 700 }}>{item?.title} </Typography>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center"}}>
                                        <IconButton component="a"
                                          href={item?.url}
                                          target="_blank"
                                          rel="noopener noreferrer" sx={{ color: "#333333", ":hover": { color: "#226296" },mt:-.5 }}><LaunchIcon sx={{ fontSize: "16px" }} /></IconButton>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                    <Typography sx={{ fontSize: "14px", color: "gray",mt:.5 }}>{item?.authors}{" "}{`(${item?.year})`}</Typography>
                                    <Typography sx={{ fontSize: "14px", color: "#616161", fontWeight: 600, fontStyle: "italic",mt:.5 }}>{item?.publisher}</Typography>
                                    <Typography sx={{ fontSize: "14px", color: "gray", fontWeight: "normal", py: "1px",mt:1 }}><span style={{ color: "#333333" }}>Summary: </span>{item?.summary}</Typography>
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
              <Divider sx={{ bgcolor: "#E8E5E5", mt: 1 }} />
              <Box mt={1}>
                <Typography
                  onClick={toggleText2}
                  sx={{ fontSize: "18px", color: "#333333", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: 600, width: "auto", justifyContent: "space-between" }}
                >
                  How to do it
                  <IconButton size="small" sx={{ color: "#333333", fontSize: "24px", mt: "3px" }}>{showText.text_2 ? <IoIosArrowUp /> : <IoIosArrowDown />}</IconButton>
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
              </Box>
              <Divider sx={{ bgcolor: "#E8E5E5", mt: 1 }} />
              <Stack spacing={2} mt={6}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Button onClick={() => {
                    dispatch(setValue(0));
                    navigate("/dashboard/home");
                  }} sx={{ textTransform: "capitalize", bgcolor: "#00C853", color: "#ffffff", ":hover": { bgcolor: "#00B44A" }, fontSize: "20px", borderRadius: "50px", width: "256px" }} >  All Health Goals </Button>
                  <Button onClick={() => {
                    dispatch(setValue(1));
                    navigate("/dashboard/home");
                  }} sx={{ textTransform: "capitalize", bgcolor: "#226296", color: "#ffffff", ":hover": { bgcolor: "#226296" }, fontSize: "20px", borderRadius: "50px", width: "256px", }} >  All Protocols </Button>
                </Box>
              </Stack>
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
