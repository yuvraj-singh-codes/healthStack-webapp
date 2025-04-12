import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Typography } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setIsTourOpen } from '../../features/allStateSlice';

interface AlertDialogProps {
    isOpen: boolean;
    onClose: (e: boolean) => void;
}

const ProtocolBenefitModal: React.FC<AlertDialogProps> = ({
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
                        <Typography sx={{ mt: 2, color: "#333333", fontSize: "16px", }}>
                            Here you’ll see the Protocols linked to the Health Benefit you selected.
                        </Typography>
                        <Typography sx={{ mt: 2, color: "#333333", fontSize: "16px", }}>
                            Each one includes time and cost estimates, plus the strength of the scientific evidence behind it.
                        </Typography>
                        <Typography sx={{ mt: 2, color: "#333333", fontSize: "16px", }}>
                            <strong>Tap a Protocol</strong>  to explore how it supports your health, what the research says, and how to follow it.
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
                            Got it!
                        </Button>
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default ProtocolBenefitModal;
