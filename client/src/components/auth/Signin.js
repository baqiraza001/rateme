import { Form, Field } from "react-final-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import TextInput from "../library/form/TextInput";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function SignIn() {

  const validate = (data) => {
    const errors = {};
    
    if (!data.email) errors.email = "Please Enter Email";
    else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(data.email))
      errors.email = "Invalid email address";
    if (!data.password) errors.password = "Please Enter Password";
    return errors
  };




  const handelSignIn = async (data, form) => {
    // try {
    //   let result = await axios.post(
    //     "http://localhost:5000/api/users/add",
    //     data
    //   );
    //   const fields = form.getRegisteredFields(); // Get all the registered field names
    //   fields.forEach((field) => {
    //     form.resetFieldState(field); // Reset the touched state for each field
    //     form.change(field, null); // Reset the value of each field to null
    //   });
    //   dispatch({ type: userActionTypes.ADD_USER, payload: result.data.user })
    //   dispatch(showSuccess("User added successfully"))
    //   navigate("/admin/users/?userAdded=1");
    // } catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     return { [FORM_ERROR]: error.response.data.errors };
    //   }
    //   else
    //     return { [FORM_ERROR]: error.message };
    // }

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
          submitError,
        }) => (
          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <Field component={TextInput} type='text' name="email" placeholder="Enter email address" />
            <Field component={TextInput} type='password' name="password" placeholder="Enter passowrd" />

            <Button
              sx={{ marginTop: '20px' }}
              variant="outlined"
              // color="success"
              startIcon={<FontAwesomeIcon icon={faSignInAlt} />}
              type="submit"
              disabled={submitting || submitting}
            >
              Sign in
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