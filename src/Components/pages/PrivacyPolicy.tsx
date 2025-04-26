import { Box, Typography } from '@mui/material';

function PrivacyPolicy() {
  return (
    <Box p={4} sx={{ maxWidth: 600, margin: "auto", py: 2, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{color:"#333333"}}>
        Privacy Policy
      </Typography>
      <Typography variant="body1" sx={{color:"#333333"}}>
        Google Analytics tracks anonymous page views and form submissions. Optional name/email only for replies.
      </Typography>
    </Box>
  );
}

export default PrivacyPolicy;
