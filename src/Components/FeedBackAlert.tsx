import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
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
      <DialogTitle id="alert-dialog-title" sx={{ fontSize: "18px", color: "#000", textAlign: "center" }}>How’s your experience using HealthStack Early Access so far?</DialogTitle>
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
                  <FaStar style={{ color: "#ABD8DB", fontSize: "40px" }} />
                ) : (
                  <FaRegStar style={{ color: "#000", fontSize: "40px" }} />
                )}
              </Box>
            ))}
          </Box>
          {
            formData.rating>0 &&<Typography sx={{ textAlign: "center", fontSize: "14px", color: "#000" }}>
            Thanks! Can you tell us more?
          </Typography>
          }
        </DialogContentText>
        {
          formData.rating>0 && <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
            <Button
              onClick={handleFeedback}
              sx={{
                bgcolor: "#D4C89E",
                border: "1px solid #212121",
                color: "#212121",
                textTransform: "capitalize",
                fontWeight: "bold",
                width: "219px",
                height: "40px",
              }}
            >
              Share My Toughts
            </Button>
          </Box>
        }

      </DialogContent>
    </Dialog>
  );
};

export default FeedBackAlert;
