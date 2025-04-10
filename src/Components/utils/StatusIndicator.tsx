
import { Box } from "@mui/material";

const colorBoxes = [
  "#00C853", // Green
  "#A5D6A7", // Light green
  "#FFF176", // Yellow
  "#FFB74D", // Orange
  "#EF5350", // Red
];

const StatusIndicator = () => {
  return (
    <Box display="flex" alignItems="center" gap={"2px"}>
      {colorBoxes.map((color, index) => (
        <Box
          key={index}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 1,
            backgroundColor:index >= 3 ?"": color,
            border: index >= 3 ? "2px solid " + color : "none",
          }}
        />
      ))}
    </Box>
  );
};

export default StatusIndicator;
