import { Grid, TextField } from "@mui/material";
import { FormField } from "../Authentication.component";

type UserFormFieldsProps = {
  formFields: Array<FormField>;
  handleFormFieldChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

const AuthFormFields = (props: UserFormFieldsProps) => {
  const { handleFormFieldChange, formFields } = props;

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    handleFormFieldChange(e);
  };

  return (
    <Grid container spacing={2}>
      {formFields.map((field) => {
        return (
          <Grid item xs={field.xs} sm={field.sm} key={field.name}>
            <TextField
              name={field.name}
              fullWidth
              type={field.type}
              label={field.label}
              onChange={onChange}
              required
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default AuthFormFields;
