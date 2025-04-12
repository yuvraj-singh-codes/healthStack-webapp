import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsTourOpen } from '../../features/allStateSlice';
import { RootState } from '../../Store/Store';

interface AlertDialogProps {
    onClose: (e: boolean) => void;
}

const ConfirmTourModal: React.FC<AlertDialogProps> = ({ onClose }) => {
    const isTourOpen = useSelector((state: RootState) => state.app.isTourOpen);
    const dispatch = useDispatch();
    const handleExit = () => {
        dispatch(setIsTourOpen(false))
    }

    return (
        <Dialog open={isTourOpen}
            sx={{ maxWidth: 600, margin: "auto" }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title" sx={{ fontSize: "20px", color: "#333333", fontWeight: 700, pt: 1 }}>Exit the tour?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box>
                        <Typography sx={{ mt: 1 }}>
                            Are you sure you want to leave the guided tour?
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Button
                            onClick={handleExit}
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
                            Continue tour
                        </Button>
                        <Button
                            onClick={() => {
                                onClose(false)
                                handleExit();
                            }}
                            fullWidth
                            sx={{
                                color: "#333333",
                                borderRadius: "30px",
                                border: "1px solid #A8A8A8",
                                bgcolor: "#E8E5E5",
                                textTransform: "capitalize",
                                fontWeight: 600,
                                ":hover": { bgcolor: "#E8E5f5" },
                                width: "219px",
                                height: "40px",
                                mt: 2
                            }}
                        >
                            Exit tour
                        </Button>
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmTourModal;
