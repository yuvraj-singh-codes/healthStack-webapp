
// import { Box } from "@mui/material";

// const colorBoxes = [
//   "#00C853", // Green
//   "#A5D6A7", // Light green
//   "#FFF176", // Yellow
//   "#FFB74D", // Orange
//   "#EF5350", // Red
// ];

// const StatusIndicator = () => {
//   return (
//     <Box display="flex" alignItems="center" gap={"2px"}>
//       {colorBoxes.map((color, index) => (
//         <Box
//           key={index}
//           sx={{
//             width: 16,
//             height: 16,
//             borderRadius: 1,
//             backgroundColor:index >= 3 ?"": color,
//             border: index >= 3 ? "2px solid " + color : "none",
//           }}
//         />
//       ))}
//     </Box>
//   );
// };

// export default StatusIndicator;
import React from "react";
import { Box } from "@mui/material";

interface StatusIndicatorProps {
  value?: number;
  size?: number;
  colorBoxes: string[];
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  value = 0,
  size,
  colorBoxes,
}) => {
  return (
    <Box display="flex" alignItems="center" gap="4px">
      {colorBoxes.map((color, index) => {
        const isFull = index < Math.floor(value);
        const isPartial = index === Math.floor(value) && value % 1 !== 0;
        const fillPercent = isPartial ? (value % 1) * 100 : 0;

        return (
          <Box
            key={index}
            sx={{
              width: size,
              height: size,
              borderRadius: "50%",
              position: "relative",
              overflow: "hidden",
              border: isFull || isPartial ? "none" : `1px solid ${color}`,
              backgroundColor: "#fff",
            }}
          >
            {(isFull || isPartial) && (
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: isFull ? "100%" : `${fillPercent}%`,
                  height: "100%",
                  backgroundColor: color,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default StatusIndicator;



{/* <Box display="flex" alignItems="center" gap="4px">
{colorBoxes.map((color, index) => (
  <Box
    key={index}
    sx={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: index < (value ?? 0) ? color : "transparent",
      border: index < (value ?? 0) ? "none" : `2px solid ${color}`,
    }}
  />
))}
</Box> */}