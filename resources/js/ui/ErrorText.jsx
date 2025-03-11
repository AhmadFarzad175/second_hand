import { FormHelperText } from "@mui/material";

function ErrorText({ message }) {
    return <FormHelperText error>{message}</FormHelperText>;
}

export default ErrorText;
