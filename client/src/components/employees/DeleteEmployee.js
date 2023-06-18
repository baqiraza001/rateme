import { Box, Button, IconButton, Popover, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { useDispatch } from "react-redux";
import { hideProgressBar, showProgressBar } from "../../store/actions/progressBarActions";
import axios from "axios";
import { showError, showSuccess } from "../../store/actions/alertActions";

function DeleteEmployee({ employeeId, name }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteEmployee = () => {
        dispatch(showProgressBar());
        axios.post('api/employees/delete', { id: employeeId }).then(({ data }) => {
            if (data.success) {
                dispatch(showSuccess("Employee deleted successfully"));
                dispatch(hideProgressBar())
            }
        }).catch(error => {
            dispatch(hideProgressBar())
            let message = error && error.response && error.response.data ? error.response.data.error : error.message;
            dispatch(showError(message))
        })
    }

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton onClick={handleClick}> <DeleteIcon /> </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Typography sx={{ p: 2 }}>All employee data including employee rating will be deleted. Do you want to delete <b>{name}</b>?</Typography>
                <Box textAlign="center" pb={2}>
                    <Button onClick={handleClose}>Close</Button>
                    <Button sx={{ ml: 2 }} variant="contained" color="error" onClick={deleteEmployee} >Delete</Button>
                </Box>
            </Popover>
        </>
    )
}

export default DeleteEmployee;