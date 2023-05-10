import { Box, FormHelperText, TextField } from '@mui/material'

function TextInput(props) {
  const { input, meta, ...rest } = props;
  const { touched, error } = meta;
  return (
    <Box width="100%">
      <TextField fullWidth {...input} {...rest} size='small' error={touched && error ? true : false} />
      <FormHelperText error>
        {
          touched && error ? error : <span>&nbsp;</span>
        }
      </FormHelperText>
    </Box>
  )
}

export default TextInput