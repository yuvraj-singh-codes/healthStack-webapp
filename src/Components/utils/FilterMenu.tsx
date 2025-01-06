import { useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
} from "@mui/material";
import { FaFilter } from "react-icons/fa";

interface FilterMenuProps {
  options: string[];
  selectedFilters: Record<string, boolean>;
  onChange: (value: string) => void;
}

export const FilterMenu = ({
  options,
  selectedFilters,
  onChange,
}: FilterMenuProps) => {
  const [anchorFilter, setAnchorFilter] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorFilter(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorFilter(null);
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
        {options.map((option, index) => (
          <MenuItem key={index}>
            <Typography flexGrow={1}>{option}</Typography>
            <Checkbox
              checked={selectedFilters[option] || false}
              onChange={() => onChange(option)}
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
