import AppPublic from "./AppPublic";
import { useEffect } from "react";
import { loadAuth, signout } from "./store/actions/authActions";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import AppPreloader from "./components/library/AppPreloader";
import { Navigate } from "react-router-dom";

function App({ user, isAuthLoaded, loadAuth, signout }) {

  useEffect(() => {
    loadAuth();
  }, []);

  if (!isAuthLoaded)
    return <AppPreloader message="Loading App..." />

  if (!user)
    return <AppPublic />

  return (
    <div className="App">
      return <Navigate to='/admin/forgot-password' />
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
