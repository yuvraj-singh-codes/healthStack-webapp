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

const HomePageModal: React.FC<AlertDialogProps> = ({
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
                            It’s your first time here—let’s give you a quick tour.
                        </Typography>
                        <Typography sx={{ mt: 2, color: "#333333", fontSize: "16px", }}>
                            On this page, you can browse:
                        </Typography>
                        
                        <Typography sx={{ mt: 2, color: "#333333", fontSize: "16px", }}>
                            <span style={{ color: "#00C853", fontWeight: 700,fontSize:"18px" }}>Health Goals:</span>  the outcomes you care about—like better sleep or heart health.
                        </Typography>
                        <Typography sx={{ mt: 2, color: "#333333", fontSize: "16px", }}>
                            <span style={{ color: "#226296", fontWeight: 700,fontSize:"18px" }}>Protocols</span> the actions that help you get there—like meditation or cardiovascular exercise.
                        </Typography>
                        <Typography sx={{ mt: 2, color: "#333333", fontSize: "16px", }}>
                            <span style={{ fontWeight: 700 }}>Ready to go?</span><br></br>Tap a Benefit to see the protocols that support it.
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
                            Continue
                        </Button>
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default HomePageModal;
