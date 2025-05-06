import { Box, Typography } from '@mui/material';

function PrivacyPolicy() {
  return (
    <Box p={4} sx={{ maxWidth: 600, margin: "auto", py: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" gutterBottom sx={{color:"#333333"}}>
      Cookies and Analytics
      </Typography>
      <Typography variant="body1" sx={{color:"#333333"}}>
      We use cookies and similar technologies to understand how users interact with HealthStack and to improve the platform.
      </Typography>
      <Typography variant="body1" sx={{color:"#333333"}}>
      These analytics cookies collect non-identifiable information such as page visits, usage patterns, and device/browser type.
      </Typography>
      <Typography variant="body1" sx={{color:"#333333"}}>
      We do not collect personal information through analytics cookies.
You can control or disable cookies in your browser settings. Some site features may be limited as a result.
      </Typography>
    </Box>
  );
}

export default PrivacyPolicy;
