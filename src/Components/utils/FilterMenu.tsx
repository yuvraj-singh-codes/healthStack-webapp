import { useState, MouseEvent, useMemo } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";

interface FilterMenuProps {
  options: string[];
  selectedFilters: Record<string, boolean>;
  onChange: (value: string) => void;
  onSelectAll: (checked: boolean) => void;
}

export const FilterMenu = ({
  options,
  selectedFilters,
  onChange,
  onSelectAll,
}: FilterMenuProps) => {
  const [anchorFilter, setAnchorFilter] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleFilterClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorFilter(event.currentTarget);
    setOpen(true)
  };

  const handleClose = () => {
    setAnchorFilter(null);
    setOpen(false)
  };

  // Determine if "Select all" should be checked
  const allSelected = useMemo(() => {
    return options.every((opt) => selectedFilters[opt]);
  }, [options, selectedFilters]);

  return (
    <>
      <IconButton
        onClick={handleFilterClick}
        size="small"
        sx={{
          border: "1px solid #212121",
          borderRadius: "6px",
          px: 2,
          color: "#212121",
           bgcolor:"#ffffff",
           ":hover":{ bgcolor:"#ffffff"}
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "14px",
            fontWeight: "bold",
            color: "#333333"
          }}
        >
          Filter {open ? <IoIosArrowUp size={16} style={{fontWeight:"bold"}}  /> : <IoIosArrowDown size={16} style={{fontWeight:"bold"}}  />}
        </Typography>
      </IconButton>
      <Menu
        anchorEl={anchorFilter}
        open={Boolean(anchorFilter)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            // border: "1px solid #212121",
            borderRadius: 0,
            minWidth: "200px",
            boxShadow: "none",
            bgcolor: "#F0EFEF"
          },
        }}
      >
        <MenuItem sx={{ border: "1px solid #333333", fontSize: "16px", fontWeight: 700, color: "#333333" }}>Filter</MenuItem>

        <MenuItem
          disableRipple
          sx={{ display: "flex", justifyContent: "space-between", padding: "4px 10px" }}
        >
          <Typography variant="body2" sx={{ fontSize: "14px", color: "#212121" }}>
            Select all
          </Typography>
          <Checkbox
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            icon={
              <span
                style={{
                  width: 18,
                  height: 18,
                  display: "inline-block",
                  backgroundColor: "#333333",
                  borderRadius: 2,
                }}
              />
            }
            checkedIcon={
              <span
                style={{
                  width: 18,
                  height: 18,
                  display: "inline-block",
                  backgroundColor: "#333333",
                  borderRadius: 2,
                  position: "relative",
                }}
              >
                <BsCheckLg size={16} style={{ color: "#fff" }} />
              </span>
            }
            sx={{ px: 1 }}
          />
        </MenuItem>

        {options.map((option, index) => (
          <MenuItem
            key={index}
            disableRipple
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 10px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                color: "#333333",
              }}
            >
              {option}
            </Typography>
            <Checkbox
              checked={selectedFilters[option] || false}
              onChange={() => onChange(option)}
              icon={
                <span
                  style={{
                    width: 18,
                    height: 18,
                    display: "inline-block",
                    backgroundColor: "#333333",
                    borderRadius: 2,
                  }}
                />
              }
              checkedIcon={
                <span
                  style={{
                    width: 18,
                    height: 18,
                    display: "inline-block",
                    backgroundColor: "#333333",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  <BsCheckLg size={16} style={{ color: "#fff" }} />
                </span>
              }
              sx={{ padding: 1 }}
            />

          </MenuItem>
        ))}
      </Menu>
    </>
  );
};


// import { useState, MouseEvent } from "react";
// import {
//   IconButton,
//   Menu,
//   MenuItem,
//   Checkbox,
//   Typography,
// } from "@mui/material";
// import { FaFilter } from "react-icons/fa";

// interface FilterMenuProps {
//   options: string[];
//   selectedFilters: Record<string, boolean>;
//   onChange: (value: string) => void;
// }

// export const FilterMenu = ({
//   options,
//   selectedFilters,
//   onChange,
// }: FilterMenuProps) => {
//   const [anchorFilter, setAnchorFilter] = useState<null | HTMLElement>(null);

//   const handleFilterClick = (event: MouseEvent<HTMLElement>) => {
//     setAnchorFilter(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorFilter(null);
//   };

//   return (
//     <>
//       <IconButton onClick={handleFilterClick} sx={{ color: "#212121" }}>
//         <FaFilter />
//       </IconButton>
//       <Menu
//         anchorEl={anchorFilter}
//         open={Boolean(anchorFilter)}
//         onClose={handleClose}
//       >
//         {options.map((option, index) => (
//           <MenuItem key={index}>
//             <Typography flexGrow={1}>{option}</Typography>
//             <Checkbox
//               checked={selectedFilters[option] || false}
//               onChange={() => onChange(option)}
//               sx={{
//                 color: "#212121",
//                 "&.Mui-checked": {
//                   color: "#212121",
//                 },
//               }}
//             />
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// };