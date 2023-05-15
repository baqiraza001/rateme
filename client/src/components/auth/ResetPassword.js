import { Form, Field } from "react-final-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import TextInput from "../library/form/TextInput";
import { Button, Box, CircularProgress } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { showError, showSuccess } from "../../store/actions/alertActions";
import { useDispatch } from "react-redux";

function ResetPassword() {

  const { resetCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect( () => {
    axios.post('/users/verify-reset-code', { code: resetCode }).then(result => {

    }).catch(error => {
      dispatch(showError(error.message));
      navigate('/admin/signin')
    })
  }, [])

  const validate = (data) => {
    const errors = {};

    if (!data.newPassword)
      errors.newPassword = "Password is required";
    else if(data.newPassword.length < 6)
    errors.newPassword = "Password should have at least 6 characters";

    if (!data.confirmPassword)
      errors.confirmPassword = "Please confirm password";

    if (data.confirmPassword && data.newPassword !== data.confirmPassword)
      errors.confirmPassword = "Passwords are not same";


    return errors
  };




  const handelResetPassword = async (data, form) => {
    try {
      let result = await axios.post("/users/reset-password", { ...data, code: resetCode });
      if(result.data.success)
      {
        dispatch(showSuccess('Pasword changed successfully'))
        navigate('/admin/signin');
      }
    } catch (error) {
      let message = error && error.response && error.response.data ? error.response.data.error : error.message;
      dispatch(showError(message))
    }

  };


  return (
    <Box bgcolor={'#fff'} p={3} textAlign={'center'} minWidth={'350px'} borderRadius="5px" boxShadow="0 0 17px 5px #dbdada">
      <h3>Rate Me</h3>
      <Form
        onSubmit={handelResetPassword}
        validate={validate}
        initialValues={{}}
        render={({
          handleSubmit,
          submitting,
          invalid
        }) => (
          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <Field component={TextInput} type='password' name="newPassword" placeholder="Enter new password" />
            <Field component={TextInput} type='password' name="confirmPassword" placeholder="Enter confirm password" />

            <Button
              sx={{ marginTop: '20px' }}
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faSync} />}
              type="submit"
              disabled={submitting || submitting}
            >
              Change Password { submitting && <CircularProgress style={{ marginLeft: '10px' }} size={20} /> }
            </Button>
            <Box mt={2}>
              <Link style={{ textDecoration: 'none' }} to="/admin/signin">Sign in?</Link>
            </Box>
          </form>
        )}
      />
    </Box>
  );
}

export default ResetPassword;