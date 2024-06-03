import { FC } from 'react';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IPerson } from '../../interfaces/entities';

type SelectInputProps = {
  selectedEntity: number | '';
  handleChange: (event: SelectChangeEvent<number>) => void;
  entities: IPerson[];
  text: string;
  title: string;
};

export const SelectInput: FC<SelectInputProps> = ({
  selectedEntity,
  handleChange,
  entities,
  text,
  title,
}) => {
  return (
    <>
      <InputLabel id={`${text}-label`}>{title}</InputLabel>
      <Select
        labelId={`${text}-label`}
        id={`${text}-select`}
        value={selectedEntity}
        onChange={handleChange}
        fullWidth
      >
        {entities.map((entity) => (
          <MenuItem key={entity.id} value={entity.id}>
            {entity.firstName + ' ' + entity.lastName}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
