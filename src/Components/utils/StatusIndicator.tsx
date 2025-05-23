// import React from "react";
// import { Box } from "@mui/material";

// interface StatusIndicatorProps {
//   value?: number;
//   size?: number;
//   colorBoxes: string[];
// }

// const StatusIndicator: React.FC<StatusIndicatorProps> = ({
//   value = 0,
//   size,
//   colorBoxes,
// }) => {
//   return (
//     <Box display="flex" alignItems="center" gap="1px">
//       {colorBoxes.map((color, index) => {
//         const isFull = index < Math.floor(value);
//         const isPartial = index === Math.floor(value) && value % 1 !== 0;
//         const fillPercent = isPartial ? (value % 1) * 100 : 0;

//         return (
//           <Box
//             key={index}
//             sx={{
//               width: size,
//               height: size,
//               borderRadius: "50%",
//               position: "relative",
//               overflow: "hidden",
//               border: isFull || isPartial ? "none" : `1px solid ${color}`,
//               backgroundColor: "#fff",
//             }}
//           >
//             {(isFull || isPartial) && (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   left: 0,
//                   top: 0,
//                   width: isFull ? "100%" : `${fillPercent}%`,
//                   height: "100%",
//                   backgroundColor: color,
//                 }}
//               />
//             )}
//           </Box>
//         );
//       })}
//     </Box>
//   );
// };

// export default StatusIndicator;

import React from "react";
import { Box } from "@mui/material";

interface StatusIndicatorProps {
  value?: number;
  size?: number;
  colorBoxes: string[]; // Each color defines an indicator
  gap?:string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  value = 0,
  size,
  colorBoxes,
  gap="4px"
}) => {
  // Function to reverse the score
  const roundedValue = Math.round(value);

  return (
    <Box display="flex" alignItems="center"  sx={{
      ...(size ? {} : { width: "80%" }),
    }} gap={gap}>
      {colorBoxes.map((color, index) => {
        const isFilled = index < roundedValue;

        return (
          <Box
            key={index}
            sx={{
              ...(size
                ? {
                    width: size,
                    height: size,
                  }
                : {
                    flex: 1,
                    aspectRatio: '1 / 1',
                  }),
              borderRadius: "50%",
              backgroundColor: isFilled ? color : "",
              border: `1px solid ${color}`,
            }}
          />
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