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
            <DialogTitle id="alert-dialog-title" sx={{ fontSize: "20px", color: "#333333", fontWeight: 700, mt: 2 }}>This is an Early Access version of HealthStack
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box>
                        <Typography sx={{  color: "#333333", fontSize: "16px", }}>
                            Information may not be complete or accurate. Please consult a qualified health professional before making any lifestyle changes to ensure they’re right for you.
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
