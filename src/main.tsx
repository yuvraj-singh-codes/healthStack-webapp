import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme({
    typography: {
      fontFamily:'Open Sans',
    },
    // You can customize other theme properties here if needed
  });
  
createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
)
