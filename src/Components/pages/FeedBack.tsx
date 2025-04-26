import { Alert, Box, Button, Dialog, DialogContent, Snackbar, Typography } from "@mui/material";
import CommonSelect from "../utils/CommonSelect";
import CommonTextField from "../utils/CommonTextField";
import { useState } from "react";
import SearchComponent from "../utils/Search";
import emailjs from 'emailjs-com'
import { IoIosStarOutline,IoIosStar } from "react-icons/io";
import ReactGA from 'react-ga4';
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
            name: formData.name,
            email: formData.email,
            rating: formData.rating,
            feedbacktype: formData.feedbackType,
            feedbackText: formData.feedbackText,
        };
    
        setLoading(true);
        emailjs
            .send(
                "service_n6grtv5", 
                "template_healthstack", 
                templateParams,
                "tJi_u4CerqirAz-N9" 
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
    
                    // 👉 ADD THIS TRACKING HERE AFTER SUCCESS
                    ReactGA.event({
                        category: 'Feedback',
                        action: 'feedback_submitted',
                        label: 'Submit Button'
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
    };
    
    // const handleSubmit = () => {
    //     if (validation()) return;

    //     const templateParams = {
    //         name: formData.name,           // Maps to {{name}}
    //         email: formData.email,         // Maps to {{email}}
    //         rating: formData.rating,       // Maps to {{rating}}
    //         feedbacktype: formData.feedbackType, // Maps to {{feedbacktype}}
    //         feedbackText: formData.feedbackText, // Maps to {{feedbackText}}
    //     };
    //     setLoading(true);
    //     emailjs
    //         .send(
    //             "service_n6grtv5", // Replace with your EmailJS Service ID
    //             "template_healthstack", // Replace with your EmailJS Template ID
    //             templateParams,
    //             "tJi_u4CerqirAz-N9" // Replace with your EmailJS Public Key/User ID
    //         )
    //         .then(
    //             (response: { status: number; text: string; }) => {
    //                 console.log("Email sent successfully!", response.status, response.text);
    //                 setPopup(true);
    //                 setFormData({
    //                     rating: 0,
    //                     feedbackType: "",
    //                     feedbackText: "",
    //                     name: "",
    //                     email: "",
    //                 });
    //             },
    //             (error: { text: string }) => {
    //                 console.error("Failed to send email.", error);
    //                 setOpenSnackbar({ open: true, message: "Failed to send email. Please try again later." });
    //             }
    //         ).finally(() => {
    //             setLoading(false);
    //             setOpen(false);
    //         });
    //     setOpen(false);
    // };

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
                <Typography sx={{ fontSize: "20px", color: "#333333", fontWeight: "700" }}>
                    Help Us Improve HealthStack!
                </Typography>
                <Typography sx={{ mt:1, color: "#333333", fontSize: "14px" }}>
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
                                <IoIosStar style={{ color: "#00C853", fontSize: "48px" }} />
                            ) : (
                                <IoIosStarOutline style={{ color: "#333333", fontSize: "48px" }} />
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
                    placeholder="First Name (Optional)"
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
                            color: "#fff",
                            width: "286px",
                            borderRadius: "30px",
                            bgcolor: "#00C853",
                            textTransform: "capitalize",
                            fontWeight: 600,
                            mt: 2,
                            ":hover": { bgcolor: "#00B44A" }
                        }}
                    >
                        {loading ? "Sending..." : "Send"}
                    </Button>
                </Box>

                {/* Disclaimer */}
                <Typography sx={{ textAlign: "center", color: "#333333", fontSize: "12px" }}>
                    Your information is kept strictly confidential and will never be shared with third parties.
                </Typography>
                <Dialog sx={{ maxWidth: 600, margin: "auto" }} open={popup} onClose={() => setPopup(false)}>
                    <DialogContent>
                        <Typography sx={{ p: 2, fontWeight: "bold",color:"#333333" }}>Thank you, your feedback was submitted</Typography>
                    </DialogContent>
                    <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
                        <Button sx={{
                            color: "#fff",
                            borderRadius: "30px",
                            bgcolor: "#00C853",
                            textTransform: "capitalize",
                            fontWeight: 600,
                            ":hover": { bgcolor: "#00B44A" },
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
