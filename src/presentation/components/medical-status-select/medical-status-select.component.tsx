import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MedicalStatus } from '@/application/models/case';

interface MedicalStatusSelectProps {
  value: MedicalStatus | '';
  onChange: (status: MedicalStatus | '') => void;
}

export const MedicalStatusSelect: React.FC<MedicalStatusSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel>Medical Status</InputLabel>
      <Select
        value={value}
        label="Medical Status"
        onChange={(e) => onChange(e.target.value as MedicalStatus | '')}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
      </Select>
    </FormControl>
  );
};
