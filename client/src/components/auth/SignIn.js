import { Form, Field } from "react-final-form";
import TextInput from "../library/form/TextInput";
import { Button, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showError } from "../../store/actions/alertActions";
import { signin } from "../../store/actions/authActions";

function SignIn() {

  const dispatch = useDispatch();

  const validate = (data) => {
    const errors = {};
    
    if (!data.email) errors.email = "Please Enter Email";
    else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(data.email))
      errors.email = "Invalid email address";
    if (!data.password) errors.password = "Please Enter Password";
    return errors
  };


  const handelSignIn = async (data, form) => {
    try {
      let result = await axios.post("/users/signin", data);
      const { user, token } = result.data;
      dispatch(signin(user, token));
      const fields = form.getRegisteredFields(); // Get all the registered field names
      fields.forEach((field) => {
        form.resetFieldState(field); // Reset the touched state for each field
        form.change(field, null); // Reset the value of each field to null
      });
    } catch (error) {
      let message = error && error.response && error.response.data ? error.response.data.error : error.message;
      dispatch(showError(message))
    }
  };


  return (
    <Box bgcolor={'#fff'} p={3} textAlign={'center'} minWidth={'350px'} borderRadius="5px" boxShadow="0 0 17px 5px #dbdada">
      <h3>Rate Me</h3>
      <Form
        onSubmit={handelSignIn}
        validate={validate}
        initialValues={{}}
        render={({
          handleSubmit,
          submitting,
          invalid,
        }) => (
          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <Field component={TextInput} type='text' name="email" placeholder="Enter email address" autoFocus />
            <Field component={TextInput} type='password' name="password" placeholder="Enter passowrd" />

            <Button
              sx={{ marginTop: '20px' }}
              variant="outlined"
              // startIcon={<FontAwesomeIcon icon={faSignInAlt} />}
              type="submit"
              disabled={invalid || submitting}
            >
              Sign in { submitting && <CircularProgress style={{ marginLeft: '10px' }} size={20} /> }
            </Button>
            <Box mt={2}>
              <Link style={{ textDecoration: 'none' }} to="/admin/forgot-password">Forgot Password?</Link>
            </Box>
          </form>
        )}
      />
    </Box>
  );
}

export default SignIn;