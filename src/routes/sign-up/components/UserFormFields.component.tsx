import { Grid, TextField } from "@mui/material";

const FORM_FIELDS = [
  { name: "firstName", label: "First Name", type: "text", sm: 6, xs: 12 },
  { name: "lastName", label: "Last Name", type: "text", sm: 6, xs: 12 },
  { name: "email", label: "Email", type: "email", xs: 12 },
  { name: "postCode", label: "Post Code", type: "text", xs: 12 },
  { name: "password", label: "Password", type: "password", xs: 12 },
];

type UserFormFieldsProps = {
  handleFormFieldChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

const UserFormFields = (props: UserFormFieldsProps) => {
  const { handleFormFieldChange } = props;

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    handleFormFieldChange(e);
  };

  return (
    <Grid container spacing={2}>
      {FORM_FIELDS.map((field) => {
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
export default UserFormFields;
