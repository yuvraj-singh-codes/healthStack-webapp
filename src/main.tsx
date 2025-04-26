import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material';
import { initGA } from './analytics.tsx';
// import {initializeGA4} from './analytics.tsx';
const theme = createTheme({
    typography: {
      fontFamily:'Open Sans',
    },
    // You can customize other theme properties here if needed
  });
  initGA();
createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
)
