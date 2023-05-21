import { Form, Field } from "react-final-form";
import { Button, Box } from "@mui/material";
import axios from "axios";
import { connect } from "react-redux";
import { showError, showSuccess } from "../store/actions/alertActions";
import TextInput from "./library/form/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { hideProgressBar, showProgressBar } from "../store/actions/progressBarActions";
import FileInput from "./library/form/FileInput";

function AccountSettings({ user, dispatch }) {

  const validate = (data) => {
    const errors = {};

    if (!data.name) errors.name = "Please enter name";
    if (!data.phoneNumber) errors.phoneNumber = "Please enter phone number";

    if (data.newPassword) 
    {
    if (!data.currentPassword) errors.currentPassword = "Please enter current password";
    
    if (data.newPassword.length < 6)
        errors.newPassword = "Password should have at least 6 characters";
      if (!data.confirmPassword)
        errors.confirmPassword = "Please confirm password";

      if (data.confirmPassword && data.newPassword !== data.confirmPassword)
        errors.confirmPassword = "Passwords are not same";
    }

    return errors
  };


  const handelUpdateProfile = async (data, form) => {
    try {
      dispatch(showProgressBar())
      let result = await axios.postForm("/users/profile-update", data);
      if(result.data.user)
      {
        dispatch(showSuccess('Profile updated successfully'))
      }
      dispatch(hideProgressBar())
      
    } catch (error) {
      let message = error && error.response && error.response.data ? error.response.data.error : error.message;
      dispatch(hideProgressBar())
      dispatch(showError(message))
    }
  };


  return (
    <Box textAlign={'center'} sx={{ width: { sm: "50%", md: "50%"}, mx: "auto" }}>
      <h3>Account Settings</h3>
      <Form
        onSubmit={handelUpdateProfile}
        validate={validate}
        initialValues={{
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        render={({
          handleSubmit,
          submitting,
          invalid,
        }) => (
          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <Field component={TextInput} type='text' name="name" placeholder="Enter name" />
            <Field component={TextInput} type='email' name="email" placeholder="Enter email address" disabled />
            <Field component={TextInput} type='text' name="phoneNumber" placeholder="Enter phone number" />
            <Field component={FileInput} type='file' name="profilePicture" inputProps={{ accept: "image/*" }}/>
            <Field component={TextInput} type='password' name="currentPassword" placeholder="Enter current passowrd" />
            <Field component={TextInput} type='password' name="newPassword" placeholder="Enter new passowrd" />
            <Field component={TextInput} type='password' name="confirmPassword" placeholder="Enter confirm passowrd" />

            <Button
              sx={{ marginTop: '20px' }}
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faUserEdit} />}
              type="submit"
              disabled={invalid}
            >Update</Button>
          </form>
        )}
      />
    </Box>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  }
}

export default connect(mapStateToProps)(AccountSettings);