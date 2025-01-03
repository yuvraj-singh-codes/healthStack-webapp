

import { useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
} from "@mui/material";
import { FaSortAmountDown } from "react-icons/fa";

interface Option {
  label: string;
  key: string; // Key for state management
}

const sortOptionsData: Option[] = [
  { label: "Easy Wins", key: "easyWins" },
  { label: "Overall Evidence Rating", key: "overallEvidence" },
  { label: "Time", key: "time" },
  { label: "Cost", key: "cost" },
  { label: "Name", key: "name" },
];

export const SortMenu = () => {
  const [anchorSort, setAnchorSort] = useState<null | HTMLElement>(null);
  const [sortOptions, setSortOptions] = useState<Record<string, boolean>>({
    easyWins: true,
    overallEvidence: false,
    time: false,
    cost: false,
    name: false,
  });

  const handleSortClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorSort(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorSort(null);
  };

  const handleOptionChange = (key: string) => {
    setSortOptions((prev) => ({ ...prev, [key]: !prev[key] }));
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
        {sortOptionsData.map((option) => (
          <MenuItem key={option.key}>
            <Typography flexGrow={1}>{option.label}</Typography>
            <Checkbox
              checked={sortOptions[option.key]}
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