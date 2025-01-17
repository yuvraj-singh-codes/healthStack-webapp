import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
interface dataTypes {
    icon: string;
    text: string;
    color: string
}
const data: dataTypes[] = [
    {
        icon: "💤",
        text: "Improve Your Sleep",
        color: "#D6F4E6"
    },
    {
        icon: "🛡️",
        text: "Boost Your Immune System",
        color: "#E5F0F7"
    },
    {
        icon: "🔥",
        text: "Burn Fat",
        color: "#EAFBF6"
    },
    {
        icon: "💪",
        text: "Build Strength",
        color: "#F6E7FB"
    },
    {
        icon: "🧘‍♂️",
        text: "Manage Anxiety",
        color: "#CDEFFB"
    },
    {
        icon: "🔍",
        text: "Explore All...",
        color: "#F4F1E6"
    },
]
export default function CommonGrid() {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    data.map((item, index) => (
                        <Grid item xs={6} key={index}>
                            <Item>{item.text}</Item>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}
