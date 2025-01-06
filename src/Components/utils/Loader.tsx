import { Box, CircularProgress } from "@mui/material"

export const Loader = () => {
    return (
        <Box sx={{display:"flex",justifyContent:"center",maxWidth:600,py:4,bgcolor:"#fff"}}>
            <CircularProgress color="secondary" size={'24px'} />
        </Box>
    )
}