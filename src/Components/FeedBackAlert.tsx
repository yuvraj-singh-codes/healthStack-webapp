import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoIosStarOutline, IoIosStar,IoMdClose } from "react-icons/io";

interface FormData {
  rating: number;
}

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  handleRatingClick?: (e: number) => void;
  formData: FormData;
}

const FeedBackAlert: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  handleRatingClick,
  formData,
}) => {
  const navigate = useNavigate()
  const handleFeedback = () => {
    onClose();
    navigate("/dashboard/feedback");
  };
  return (
    <Dialog open={open}
      sx={{ maxWidth: 600, margin: "auto" }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <Box sx={{ display: "flex", justifyContent: "end" }}><IoMdClose onClick={onClose} style={{ marginTop: "10px", marginRight: "10px", cursor: "pointer" }} size={30} /></Box>
      <DialogTitle id="alert-dialog-title" sx={{ fontSize: "20px", color: "#333333", fontWeight: 700, py: 0 }}>How’s your experience using HealthStack Early Access so far?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            {[...Array(5)].map((_, index) => (
              <Box
                key={index}
                sx={{ cursor: "pointer", mx: 0.5 }}
                onClick={() => handleRatingClick && handleRatingClick(index)}
              >
                {index < formData.rating ? (
                  <IoIosStar style={{ color: "#00C853", fontSize: "40px" }} />
                ) : (
                  <IoIosStarOutline style={{ color: "#A8A8A8", fontSize: "40px" }} />
                )}
              </Box>
            ))}
          </Box>
          {
            formData.rating > 0 && <Box>
              <Typography sx={{ textAlign: "center", fontSize: "20px", color: "#333333" }}>
                Thanks! Can you tell us more?
              </Typography>
              <Typography sx={{ textAlign: "center", fontSize: "12px", color: "#333333" }}>
                (we’d be really grateful if you did!)
              </Typography>
            </Box>
          }
        </DialogContentText>
        {
          formData.rating > 0 && <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
            <Button
              onClick={handleFeedback}
              sx={{
                color: "#fff",
                borderRadius: "30px",
                bgcolor: "#00C853",
                textTransform: "capitalize",
                fontWeight: 600,
                ":hover": { bgcolor: "#00B44A" },
                width: "219px",
                height: "40px",
              }}
            >
              Give feedback
            </Button>
          </Box>
        }

      </DialogContent>
    </Dialog>
  );
};

export default FeedBackAlert;
