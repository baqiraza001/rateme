import AppPublic from "./AppPublic";
import { useEffect } from "react";
import { loadAuth, signout } from "./store/actions/authActions";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import AppPreloader from "./components/library/AppPreloader";
import { Navigate, useLocation } from "react-router-dom";

const publicRoutes = ['/', '/admin/signin', '/admin/forgot-password', '/admin/reset-password/:resetCode']

function App({ user, isAuthLoaded, loadAuth, signout }) {

  const { pathname } = useLocation();

  useEffect(() => {
    loadAuth();
  }, []);

  if (!isAuthLoaded)
    return <AppPreloader message="Loading App..." />

    if (user && publicRoutes.includes(pathname))
      return <Navigate to='/admin/dashboard' />
    if(!user && !publicRoutes.includes(pathname))
      return <Navigate to='/admin/signin' />

  if (!user)
    return <AppPublic />

  return (
    <div className="App">
      you are signed in
      <Button onClick={() => signout()}>Sign Out</Button>
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
