import AppPublic from "./AppPublic";
import { useEffect } from "react";
import { loadAuth, signout } from "./store/actions/authActions";
import { connect } from "react-redux";
import AppPreloader from "./components/library/AppPreloader";
import { Navigate, useLocation } from "react-router-dom";
import AppBar from "./components/AppBar";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import AccountSettings from "./components/AccountSettings";
import Dashboard from "./components/Dashboard";
import BlockInterface from "./components/library/BlockInterface";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import Departments from "./components/departments/Departments";

const publicRoutes = ['/admin/signin', '/admin/forgot-password', '/admin/reset-password/']

function App({ user, isAuthLoaded, loadAuth, signout }) {

  const { pathname } = useLocation();

  useEffect(() => {
    loadAuth();
  }, []);

  if (!isAuthLoaded)
    return <AppPreloader message="Loading App..." />

  if (user && publicRoutes.find(url => pathname.startsWith(url)))
    return <Navigate to='/admin/dashboard' />
  if (!user && !publicRoutes.find(url => pathname.startsWith(url)))
    return <Navigate to='/admin/signin' />
  if (pathname === '/' || pathname === '/admin')
    return <Navigate to='/admin/signin' />

  if (!user)
    return <AppPublic />

  return (
    <div className="App">
      <AppBar />
      <Container sx={{ mt: 10, position: 'relative', bgcolor: '#fff', p: 3, minWidth: '350px', borderRadius: "5px", boxShadow: "0 0 17px 5px #dbdada" }} maxWidth="lg">
        <BlockInterface />
        <Routes>
          <Route path="/admin/account-settings" Component={AccountSettings} />
          <Route path="/admin/dashboard" Component={Dashboard} />

          {/* Departments routes */}
          <Route path="/admin/departments" Component={Departments} />
          <Route path="/admin/departments/add" Component={AddDepartment} />
          <Route path="/admin/departments/edit/:deptId" Component={EditDepartment} />
        </Routes>
      </Container>

    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    isAuthLoaded: auth.isLoaded,
  }
}

export default connect(mapStateToProps, { loadAuth, signout })(App);
