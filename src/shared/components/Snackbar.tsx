import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export type SnackBarConfig = {
  message?: string;
  open?: boolean;
  type?: "success" | "error" | "warning" | "info";
};

type CustomSnackbarProps = {
  config?: SnackBarConfig;
  setOpen: (isOpen: boolean) => void;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = (props: CustomSnackbarProps) => {
  const { config, setOpen } = props;

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={config?.open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={config?.type}
        sx={{ width: "100%" }}
      >
        {config?.message}
      </Alert>
    </Snackbar>
  );
};
export default CustomSnackbar;
