import { useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
} from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
interface SortProps {
  options: string[];
  selectedSortValue: Record<string, boolean>;
  onChange: (value: string) => void;
}

export const SortMenu = ({
  options,
  onChange,
  selectedSortValue,
}: SortProps) => {
  const [anchorSort, setAnchorSort] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleSortClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorSort(event.currentTarget);
    setOpen(true)
  };

  const handleClose = () => {
    setAnchorSort(null);
    setOpen(false)
  };

  return (
    <>
      <IconButton
        onClick={handleSortClick}
        size="small"
        sx={{
          border: "1px solid #212121",
          borderRadius: "6px",
          px: 2,
          color: "#212121",
          bgcolor: "#ffffff",
          ":hover": { bgcolor: "#ffffff" }
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "14px",
            fontWeight: "bold",
            color: "#333333",
          }}
        >
          Sort {open ? <IoIosArrowUp style={{fontWeight:"bold"}} size={16} /> : <IoIosArrowDown size={16} style={{fontWeight:"bold"}}  />}
        </Typography>
      </IconButton>
      <Menu
        anchorEl={anchorSort}
        open={Boolean(anchorSort)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            // border: "1px solid #212121",
            borderRadius: 0,
            padding: 0,
            minWidth: "200px",
            boxShadow: "none",
            bgcolor: "#F0EFEF"
          },
        }}
      >
        <MenuItem sx={{ border: "1px solid #333333", fontSize: "16px", fontWeight: 700, color: "#333333" }}>Sort</MenuItem>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            disableRipple
            onClick={(e) => {
              e.preventDefault();
              onChange(option);
            }}
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
              checked={selectedSortValue[option] || false}
              onChange={(e) => {
                e.stopPropagation();
                onChange(option);
              }}
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
// import { FaSortAmountDown } from "react-icons/fa";

// interface sortProps {
//   options:string[]
//   selectedSortValue:Record<string, boolean>;
//   onChange: (value: string) => void;
// }


// export const SortMenu = ({options,onChange,selectedSortValue}:sortProps) => {
//   const [anchorSort, setAnchorSort] = useState<null | HTMLElement>(null);

//   const handleSortClick = (event: MouseEvent<HTMLElement>) => {
//     setAnchorSort(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorSort(null);
//   };

//   return (
//     <>
//       <IconButton onClick={handleSortClick} sx={{ color: "#212121" }}>
//         <FaSortAmountDown />
//       </IconButton>
//       <Menu
//         anchorEl={anchorSort}
//         open={Boolean(anchorSort)}
//         onClose={handleClose}
//       >
//         {options.map((option,index) => (
//           <MenuItem key={index}>
//             <Typography flexGrow={1}>{option}</Typography>
//             <Checkbox
//               checked={selectedSortValue[option] || false}
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