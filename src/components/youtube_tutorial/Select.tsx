/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem, Select } from "@mui/material";

const BasicSelect = ({ id, field, options, placeholder }) => {
  return (
    <Select
      style={{ width: "400px" }}
      labelId={id}
      id={id}
      size="small"
      {...field}
      displayEmpty
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
      {options.map((option: any) => (
        <MenuItem key={option.id} value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </Select>
  );
};

export default BasicSelect;
