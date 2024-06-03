import { FC } from 'react';
import { validateMinLength } from '../../../utils/validations';
import { FormModal } from '../../common/FormModal';
import { IClass } from '../../../interfaces/entities';

export type ClassData = {
  className: string;
  description: string;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  dataForm: ClassData | undefined;
  handleSave: (data: IClass) => void;
  title: string;
};

export const ClassModal: FC<Props> = ({
  open,
  handleClose,
  title,
  dataForm,
  handleSave,
}) => {
  const initialData =
    dataForm !== undefined ? dataForm : { className: '', description: '' };

  return (
    <FormModal
      open={open}
      handleClose={handleClose}
      handleSave={handleSave}
      initialData={initialData}
      title={title}
      fields={[
        { name: 'className', label: 'Class Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
      ]}
      validate={(data) => ({
        className: validateMinLength(data.className)
          ? ''
          : 'Class name should contain at least 3 letters',
        description: validateMinLength(data.description)
          ? ''
          : 'Description should contain at least 3 letters',
      })}
    />
  );
};
