import React, { useState } from 'react';
import { TextField, Snackbar, Alert, InputAdornment, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowBack } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { setValue } from '../../features/tabSlice';
import { setSearch } from '../../features/SearchSlice';


const SearchComponent: React.FC = () => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search.search);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const benefit = useSelector((state: RootState) => state.app.benefit);
    const protocol = useSelector((state: RootState) => state.app.protocol);

    const handleSearch = () => {
        const matchedProtocol = protocol.filter(item =>
            item.protocolSearchTerms.includes(search.toLowerCase())
        );

        const matchedBenefit = benefit.filter(item =>
            item.benefitSearchTerms.includes(search.toLowerCase())
        );
        if (matchedProtocol.length > 0) {
            dispatch(setValue(1));
            navigate(`/dashboard/home`);
        } else if (matchedBenefit.length > 0) {
            dispatch(setValue(0));
            navigate(`/dashboard/home`);
        } else {
            setOpenSnackbar(true);
        }
    };

    // const handleEmpty = () => {
    //     setSearchTerm("")
    // }
    const handleBack = () => {
        window.history.back();
    };
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                px: 2,
                pb: 1,
                position: "sticky",
                top: 0,
                bgcolor: "#fff",
                py: 1,
                zIndex: 100,
                borderBottom: "2px solid lightgray",
                maxWidth: 600,
                margin: "auto",
            }}
        >
            <IoMdArrowBack onClick={handleBack} size={24} style={{ cursor: "pointer" }} />
            <TextField
                size="small"
                fullWidth
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                sx={{
                    color: "#212121",
                    borderRadius: "50px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "50px",
                        borderColor: "#212121",
                    },
                    "::placeholder": {
                        fontStyle: "italic",
                    },
                }}
                type="text"
                placeholder="Search HealthStack"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <FiSearch onClick={handleSearch} size={20} style={{ color: search ? "#000" : "#888" }} />
                            {/* {
                                searchTerm ? <IoMdClose onClick={handleEmpty} size={20} color="#000" cursor={'pointer'} /> : <FiSearch onClick={handleSearch} size={20} style={{color:searchTerm?"#000":"#888"}} />
                            } */}
                        </InputAdornment>
                    ),
                }}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                    No items found matching your search
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SearchComponent;
