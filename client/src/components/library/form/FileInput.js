import { Box, FormHelperText, TextField } from '@mui/material'
import React from 'react'

function FileInput(props) {
    const { input, meta, ...rest } = props;
    const { touched, error } = meta;
  return (
    <Box>
        <TextField type="file" onChange={ (event) => input.onChange(event.target.files[0]) } fullWidth size='small' {...rest} error={touched && error ? true : false} />
        <FormHelperText error>
            {
                touched && error ? error : <span>&nbsp;</span>
            }
        </FormHelperText>
    </Box>
  )
}

export default FileInput