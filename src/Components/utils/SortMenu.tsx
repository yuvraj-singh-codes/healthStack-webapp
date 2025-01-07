

import { useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
} from "@mui/material";
import { FaSortAmountDown } from "react-icons/fa";

interface sortProps {
  options:string[]
  selectedSortValue:Record<string, boolean>;
  onChange: (value: string) => void;
}


export const SortMenu = ({options,onChange,selectedSortValue}:sortProps) => {
  const [anchorSort, setAnchorSort] = useState<null | HTMLElement>(null);

  const handleSortClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorSort(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorSort(null);
  };

  return (
    <>
      <IconButton onClick={handleSortClick} sx={{ color: "#212121" }}>
        <FaSortAmountDown />
      </IconButton>
      <Menu
        anchorEl={anchorSort}
        open={Boolean(anchorSort)}
        onClose={handleClose}
      >
        {options.map((option,index) => (
          <MenuItem key={index}>
            <Typography flexGrow={1}>{option}</Typography>
            <Checkbox
              checked={selectedSortValue[option] || false}
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