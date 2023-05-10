import { Form, Field } from "react-final-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import TextInput from "../library/form/TextInput";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function ResetPassword() {

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
        onSubmit={handelResetPassword}
        validate={validate}
        initialValues={{}}
        render={({
          handleSubmit,
          submitting,
          submitError,
        }) => (
          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <Field component={TextInput} type='password' name="newPassword" placeholder="Enter new password" />
            <Field component={TextInput} type='password' name="confirmPassword" placeholder="Enter confirm password" />

            <Button
              sx={{ marginTop: '20px' }}
              variant="outlined"
              // color="success"
              startIcon={<FontAwesomeIcon icon={faSync} />}
              type="submit"
              disabled={submitting || submitting}
            >
              Change Password
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