import { Button } from "@mui/material";
import Alert from "./components/library/Alert";
import { showSuccess } from "./store/actions/alertActions";
import { useDispatch } from "react-redux";
import { showProgressBar, hideProgressBar } from "./store/actions/progressBarActions";
import ProgressBar from "./components/library/ProgressBar";
import AppPublic from "./AppPublic";

function App() {

  const dispatch = useDispatch();

  return <AppPublic />

  return (
    <div className="App">
      <Button onClick={() => dispatch(showSuccess("Employee created successfully")) }>Send Message</Button>
      <Button onClick={() => dispatch(showProgressBar()) }>Show Bar</Button>
      <Button onClick={() => dispatch(hideProgressBar()) }>Hide Bar</Button>

      <Alert />
      <ProgressBar />
    </div>
  );
}

export default App;
