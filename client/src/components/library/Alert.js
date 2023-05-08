import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { connect } from "react-redux";
import { clearAlert } from "../../store/actions/alertActions";

function Alert({ alert, clearAlert }) {

  let variant = null;
  for (let key in alert) {
    if (alert[key])
      variant = key;
  }
  
  if (!variant) return null;

  return (
    <>
      <Snackbar
        open={true}
        autoHideDuration={5000}
        onClose={clearAlert}
      >
        <MuiAlert severity={variant}>{alert[variant]}</MuiAlert>
      </Snackbar>
    </>
  )
}

const mapStateToProps = ({ alert }) => {
  return { alert }
}

const Wrapper = connect(mapStateToProps, { clearAlert });

export default Wrapper(Alert);
