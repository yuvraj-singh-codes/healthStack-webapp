import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Typography } from '@mui/material';

interface AlertDialogProps {
    isOpen: boolean;
    onClose: (e: boolean) => void;
}

const LandingPageModal: React.FC<AlertDialogProps> = ({
    isOpen,
    onClose,
}) => {
    const handleFeedback = () => {
        onClose(false);
    };
    return (
        <Dialog open={isOpen}
            sx={{ maxWidth: 600, margin: "auto" }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title" sx={{ fontSize: "20px", color: "#333333", fontWeight: 700, mt: 2 }}>Welcome to HealthStack (Early Access)
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box>
                        <Typography sx={{ color: "#333333", fontSize: "16px", }}>
                            This is an early version of HealthStack. Some info may be incomplete or inaccurate. Please verify key details and consult a health professional before making any lifestyle changes.
                        </Typography>
                        <Typography sx={{ color: "#333333", fontSize: "16px",mt:2 }}>
                        We hope you enjoy your experience. We’d love to hear your feedback!
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
                            Agree and Proceed
                        </Button>
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default LandingPageModal;
