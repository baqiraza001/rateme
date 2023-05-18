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
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Routes>
          <Route path="/admin/account-settings" Component={AccountSettings} />
          <Route path="/admin/dashboard" Component={Dashboard} />
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
