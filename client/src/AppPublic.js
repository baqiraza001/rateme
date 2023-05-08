import { Route, Routes } from "react-router-dom";
import Signin from "./components/auth/Signin";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

export default function AppPublic() {
  return (
    <Routes>
      <Route path="admin/signin" element={<Signin />} />
      <Route path="admin/forgot-password" element={<ForgotPassword />} />
      <Route path="admin/reset-password/:resetCode" element={<ResetPassword />} />
    </Routes>
  )
}
