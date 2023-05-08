import { LinearProgress } from "@mui/material";
import { connect, useSelector } from "react-redux";

function ProgressBar() {
  
  const loading = useSelector( state => state.progressBar.loading);

  return (
    <>{ loading  && <LinearProgress /> }</>
  )
}

export default ProgressBar;
