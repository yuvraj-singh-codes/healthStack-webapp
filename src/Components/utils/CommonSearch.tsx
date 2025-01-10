import React, { FC } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSearch } from "../../features/SearchSlice";
interface CommonSearchProps {
    onChange: (value: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const CommonSearch: FC<CommonSearchProps> = ({ onChange, searchTerm, setSearchTerm }) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(value);
    };
    const dispatch = useDispatch();

    const handleBack = () => {
        window.history.back();
    };
    const handleEmpty = () => {
        setSearchTerm("")
        dispatch(setSearch(""))
    }
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
                value={searchTerm}
                onChange={handleSearchChange}
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
                            {
                                searchTerm ? <IoMdClose onClick={handleEmpty} size={20} color="#000" cursor={'pointer'} /> : <FiSearch size={20} color="#888" />
                            }
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

