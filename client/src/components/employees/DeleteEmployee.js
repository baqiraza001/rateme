import { Box, Button, IconButton, Popover, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

function DeleteEmployee({ employeeId, name, deleteEmployee }){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <Button sx={{ ml: 2 }} variant="contained" color="error" onClick={() => deleteEmployee(employeeId)} >Delete</Button>
                </Box>
            </Popover>
        </>
    )
}

export default DeleteEmployee;