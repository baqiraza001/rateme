import Alert from "./components/library/Alert";
import ProgressBar from "./components/library/ProgressBar";
import AppPublic from "./AppPublic";
import { useEffect } from "react";
import { loadAuth, loadToken } from "./store/actions/authActions";
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();

  useEffect( () => {
    const token = localStorage.getItem('token');
    if(token){
      dispatch(loadToken(token))
      dispatch(loadAuth(token))
    }
    }, []);

  return <AppPublic />

  return (
    <div className="App">
      <Alert />
      <ProgressBar />
    </div>
  );
}

export default App;
