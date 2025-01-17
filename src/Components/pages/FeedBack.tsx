import { Alert, Box, Button, Dialog, DialogContent, Snackbar, Typography } from "@mui/material";
import { FaStar, FaRegStar } from "react-icons/fa";
import CommonSelect from "../utils/CommonSelect";
import CommonTextField from "../utils/CommonTextField";
import { useState } from "react";
import SearchComponent from "../utils/Search";
import emailjs from 'emailjs-com'
interface formdata {
    rating: number;
    feedbackType: string;
    feedbackText: string;
    name: string;
    email: string;
}
interface errortype {
    feedbackType: boolean,
    rating: boolean,
}
interface FeedbackProps {
    setOpen: (value: boolean) => void;
    formData: formdata;
    setFormData: (data: formdata) => void;
    handleRatingClick: (rating: number) => void;
    handleSubmit?: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({
    setOpen,
    formData,
    setFormData,
    handleRatingClick,
}) => {
    const [popup, setPopup] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: "" });
    const [errors, setErrors] = useState<errortype>({
        feedbackType: false,
        rating: false,
    });
    const feedbackOptions = [
        { value: "bug", label: "Bug Report" },
        { value: "feature", label: "Feature Request" },
        { value: "general", label: "General Feedback" },
    ];
    const validation = () => {
        let hasError = false;

        if (!formData.feedbackType) {
            setErrors((prev) => ({ ...prev, feedbackType: true }));
            hasError = true;
        } else {
            setErrors((prev) => ({ ...prev, feedbackType: false }));
        }
        if (formData.rating === 0) {
            setErrors((prev) => ({ ...prev, rating: true }));
            hasError = true;
        } else {
            setErrors((prev) => ({ ...prev, rating: false }));
        }

        return hasError;
    };

    const handleSubmit = () => {
        if (validation()) return;

        const templateParams = {
            name: formData.name,           // Maps to {{name}}
            email: formData.email,         // Maps to {{email}}
            rating: formData.rating,       // Maps to {{rating}}
            feedbacktype: formData.feedbackType, // Maps to {{feedbacktype}}
            feedbackText: formData.feedbackText, // Maps to {{feedbackText}}
        };
        setLoading(true);
        emailjs
            .send(
                "service_n6grtv5", // Replace with your EmailJS Service ID
                "template_healthstack", // Replace with your EmailJS Template ID
                templateParams,
                "tJi_u4CerqirAz-N9" // Replace with your EmailJS Public Key/User ID
            )
            .then(
                (response: { status: number; text: string; }) => {
                    console.log("Email sent successfully!", response.status, response.text);
                    setPopup(true);
                    setFormData({
                        rating: 0,
                        feedbackType: "",
                        feedbackText: "",
                        name: "",
                        email: "",
                    });
                },
                (error: { text: string }) => {
                    console.error("Failed to send email.", error);
                    setOpenSnackbar({ open: true, message: "Failed to send email. Please try again later." });
                }
            ).finally(() => {
                setLoading(false);
                setOpen(false);
            });
        setOpen(false);
    };

    return (
        <>
            <SearchComponent />
            <Box
                sx={{
                    maxWidth: 600,
                    margin: "auto",
                    p: 2,
                }}
            >
                {/* Title */}
                <Typography sx={{ mb: 2, fontSize: "20px", color: "#000", fontWeight: "700" }}>
                    Help Us Improve HealthStack!
                </Typography>
                <Typography sx={{ mb: 3, color: "#000", fontSize: "14px" }}>
                    Thank you for trying out HealthStack Early Access! Your feedback will help us improve.
                </Typography>

                {/* Rating Stars */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                    {[...Array(5)].map((_, index) => (
                        <Box
                            key={index}
                            sx={{ cursor: "pointer", mx: 0.5 }}
                            onClick={() => handleRatingClick(index)}
                        >
                            {index < formData.rating ? (
                                <FaStar style={{ color: "#ABD8DB", fontSize: "48px" }} />
                            ) : (
                                <FaRegStar style={{ color: "#000", fontSize: "48px" }} />
                            )}
                        </Box>
                    ))}

                </Box>

                {/* Feedback Type */}
                <CommonSelect
                    name={"feedbackType"}
                    value={formData.feedbackType}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            feedbackType: e.target.value,
                        });
                    }
                    }
                    options={feedbackOptions}
                    placeholder="Feedback type (select one)"
                    error={errors.feedbackType}
                    helperText={errors.feedbackType ? "This field is required" : ""}
                />

                {/* Feedback Text */}
                <CommonTextField
                    name={"feedbackText"}
                    value={formData.feedbackText}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            feedbackText: e.target.value,
                        })
                    }
                    placeholder="Tell us what you love or what could be better!"
                    error={false}
                    helperText=""
                    multiline
                    rows={4}
                />

                {/* Name Field (Optional) */}
                <CommonTextField
                    name={"name"}
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                    placeholder="First Name (Optional) - How should we address you?"
                    error={false}
                    helperText=""
                />

                {/* Email Field (Optional) */}
                <CommonTextField
                    name={"email"}
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value,
                        })
                    }
                    placeholder="Email (Optional) - We'll reach out if needed."
                    error={false}
                    helperText=""
                />

                {/* Submit Button */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button
                        onClick={handleSubmit}
                        sx={{
                            mt: 2,
                            bgcolor: "#D4C89E",
                            border: "1px solid #212121",
                            color: "#212121",
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            width: "219px",
                            height: "40px",
                            "&:hover": {
                                backgroundColor: "#000",
                                color: "#fff",
                            },
                        }}
                    >
                        {loading ? "Send Feedback..." : "Send Feedback"}
                    </Button>
                </Box>

                {/* Disclaimer */}
                <Typography sx={{ textAlign: "center", color: "#000", fontSize: "12px" }}>
                    All feedback submitted is collected for testing purposes only and will not be shared with third parties.
                </Typography>
                <Dialog sx={{ maxWidth: 600, margin: "auto" }} open={popup} onClose={() => setPopup(false)}>
                    <DialogContent>
                        <Typography sx={{ p: 2, fontWeight: "bold" }}>Thank you, your feedback was submitted</Typography>
                    </DialogContent>
                    <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
                        <Button sx={{
                            bgcolor: "#D4C89E",
                            border: "1px solid #212121",
                            color: "#212121",
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            width: "219px",
                            height: "40px",
                        }} onClick={() => setPopup(false)}>
                            Ok
                        </Button>
                    </Box>
                </Dialog>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar.open}
                autoHideDuration={3000}
                onClose={() => { setOpenSnackbar({ open: false, message: "" }) }}
            >
                <Alert onClose={() => { setOpenSnackbar({ open: false, message: "" }) }} severity="error">
                    {openSnackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Feedback;
