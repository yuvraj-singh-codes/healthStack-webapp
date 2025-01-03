import { useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
} from "@mui/material";
import { FaFilter } from "react-icons/fa";
interface Option {
    label: string;
    key: string; // Key for state management
  }
const filterOptionsData: Option[] = [
    { label: "Physical Health", key: "physicalHealth" },
    { label: "Mental Health", key: "mentalHealth" },
    { label: "Behaviours", key: "behaviours" },
    { label: "Food", key: "food" },
    { label: "Supplements", key: "supplements" },
  ];
export const FilterMenu = () => {
    const [anchorFilter, setAnchorFilter] = useState<null | HTMLElement>(null);
    const [filterOptions, setFilterOptions] = useState<Record<string, boolean>>({
      physicalHealth: true,
      mentalHealth: true,
      behaviours: true,
      food: true,
      supplements: true,
    });
  
    const handleFilterClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorFilter(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorFilter(null);
    };
  
    const handleOptionChange = (key: string) => {
      setFilterOptions((prev) => ({ ...prev, [key]: !prev[key] }));
    };
  
    return (
      <>
        <IconButton onClick={handleFilterClick} sx={{ color: "#212121" }}>
          <FaFilter />
        </IconButton>
        <Menu
          anchorEl={anchorFilter}
          open={Boolean(anchorFilter)}
          onClose={handleClose}
        >
          {filterOptionsData.map((option) => (
            <MenuItem key={option.key}>
              <Typography flexGrow={1}>{option.label}</Typography>
              <Checkbox
                checked={filterOptions[option.key]}
                onChange={() => handleOptionChange(option.key)}
                sx={{
                  color: "#212121",
                  "&.Mui-checked": {
                    color: "#212121",
                  },
                }}
              />
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };
  