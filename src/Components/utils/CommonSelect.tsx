import React from "react";
import { FormControl, Select, MenuItem, FormHelperText, SelectChangeEvent } from "@mui/material";

interface SelectFieldProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error: boolean;
  helperText: string;
  name: string;
}

const CommonSelect: React.FC<SelectFieldProps> = ({
  value,
  onChange,
  options,
  placeholder,
  error,
  helperText,
  name
}) => {
  return (
    <FormControl fullWidth size="small" error={error} sx={{ mb: 2 }}>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        displayEmpty
        sx={{
          color: "gray",
          borderRadius: "5px",
          fontStyle: "italic",
          border:"1px solid #333333"
        }}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CommonSelect;
