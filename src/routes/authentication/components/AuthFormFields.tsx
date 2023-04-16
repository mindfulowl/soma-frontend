import { Grid, TextField } from "@mui/material";
import { FormField, AuthFormFieldsValues } from "../types/types.auth";

type UserFormFieldsProps = {
  formFields: Array<FormField>;
  handleFormFieldChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  defaultValues?: AuthFormFieldsValues;
};

const AuthFormFields = (props: UserFormFieldsProps) => {
  const { handleFormFieldChange, formFields, defaultValues } = props;

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
              value={
                defaultValues &&
                defaultValues[field.name as keyof AuthFormFieldsValues]
              }
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
