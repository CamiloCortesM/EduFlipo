import { FC } from 'react';
import { validateName, validateEmail } from '../../../utils/validations';
import { FormModal } from '../../common/FormModal';
import { ITeacher } from '../../../interfaces/entities';

export type TeacherData = {
  firstName: string;
  lastName: string;
  email: string;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  dataForm: TeacherData | undefined;
  handleSave: (data: ITeacher) => void;
  title: string;
};

export const TeacherModal: FC<Props> = ({
  open,
  handleClose,
  dataForm,
  handleSave,
  title,
}) => {
  const initialData =
    dataForm !== undefined
      ? dataForm
      : { firstName: '', lastName: '', email: '' };

  return (
    <FormModal<TeacherData, ITeacher>
      open={open}
      handleClose={handleClose}
      handleSave={handleSave}
      initialData={initialData}
      title={title}
      fields={[
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
      ]}
      validate={(data) => ({
        firstName: validateName(data.firstName)
          ? ''
          : 'First name should contain only letters',
        lastName: validateName(data.lastName)
          ? ''
          : 'Last name should contain only letters',
        email: validateEmail(data.email) ? '' : 'Invalid email format',
      })}
    />
  );
};
