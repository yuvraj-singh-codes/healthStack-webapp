import React from "react";
import { TextField } from "@mui/material";

interface TextFieldComponentProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error: boolean;
  helperText: string;
  multiline?: boolean;
  rows?: number;
}

const CommonTextField: React.FC<TextFieldComponentProps> = ({
  value,
  onChange,
  placeholder,
  error,
  helperText,
  multiline = false,
  rows = 4,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      sx={{
        mb: 2,
        // border: "1px solid #000",
        borderRadius: "5px",
        fontStyle: "italic",
      }}
    />
  );
};

export default CommonTextField;
