import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import { Box } from "@mui/material";
import SignIn from "./components/auth/SignIn";
import Alert from "./components/library/Alert";
import Home from "./components/feedback/Home";
import Feedback from "./components/feedback/Feedback";

export default function AppPublic() {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight="100%">
      <Alert />
      <Routes>
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password/:resetCode" element={<ResetPassword />} />
        <Route path="/" Component={Home} />
        <Route path="/employee/feedback/:employeeId" Component={Feedback} />
      </Routes>
    </Box>
  )
}
