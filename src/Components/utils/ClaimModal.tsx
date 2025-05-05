import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Typography } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { setIsTourOpen } from '../../features/allStateSlice';
import { useDispatch } from 'react-redux';

interface AlertDialogProps {
    isOpen: boolean;
    onClose: (e: boolean) => void;
}

const ClaimModal: React.FC<AlertDialogProps> = ({
    isOpen,
    onClose,
}) => {
    const dispatch = useDispatch();
    const handleFeedback = () => {
        onClose(false);
    };
    return (
        <Dialog open={isOpen}
            sx={{ maxWidth: 600, margin: "auto" }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <Box sx={{ display: "flex", justifyContent: "end" }}><IoMdClose onClick={() => dispatch(setIsTourOpen(true))} style={{ marginTop: "10px", marginRight: "10px", cursor: "pointer" }} size={30} /></Box>
            <DialogTitle id="alert-dialog-title" sx={{ fontSize: "20px", color: "#333333", fontWeight: 700, py: 0 }}>Welcome to HealthStack!
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box>
                        <Typography sx={{ mt: 1, color: "#333333" }}>
                            This page gives you a <strong style={{ color: "#333333" }}>summary of the research</strong> linking the <strong style={{ color: "#00C853" }}>Health Goal</strong> and <strong style={{ color: "#226296" }}>Protocol</strong> you selected.
                        </Typography>
                        <Typography sx={{ mt: 1, color: "#333333", fontSize: "16px", }}>
                            <strong>Overall Evidence</strong> {" "} (
                            <span style={{ display: "inline-flex", alignItems: "center" }}><img src="/images/book.png" alt="" style={{
                                height: "19px",
                                width: "18px",
                                verticalAlign: "middle",
                            }} /></span>
                            ) combines.
                        </Typography>
                        <Typography sx={{ mt: 1, color: "#333333", fontSize: "16px", }}>
                            <strong><span><img src="/images/arrow.png" alt="arrow" /></span>Impact:</strong> how strongly the protocol influences this benefit
                        </Typography>
                        <Typography sx={{ mt: 1, color: "#333333", fontSize: "16px", }}>
                            <strong><span><img src="/images/books.png" alt="books" /></span>{" "}Maturity:</strong> how well-established the research is.
                        </Typography>
                        <Typography sx={{ mt: 1, color: "#333333", fontSize: "16px", }}>
                            <strong><span><img src="/images/hands.png" alt="books" /></span>{" "}Consensus:</strong> how much agreement there is among experts
                        </Typography>
                        <Typography sx={{ mt: 1, color: "#333333", fontSize: "16px", }}>
                        Tap on any <strong>Source</strong> if you’d like to read the research yourself.
                        </Typography>
                        <Typography sx={{ mt: 1, color: "#333333", fontSize: "16px", }} >
                        Last but not least: <strong>instructions</strong> for how to do the Protocol correctly.
                        </Typography>
                        <Typography sx={{ mt: 1, color: "#333333", fontSize: "16px", }} >
                        That’s it - we hope you enjoy using HealthstStack Early Access!
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            onClick={handleFeedback}
                            fullWidth
                            sx={{
                                color: "#fff",
                                borderRadius: "30px",
                                bgcolor: "#00C853",
                                textTransform: "capitalize",
                                fontWeight: 600,
                                ":hover": { bgcolor: "#00B44A" },
                                width: "219px",
                                height: "40px",
                                mt: 2
                            }}
                        >
                            Let's go!
                        </Button>
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default ClaimModal;
