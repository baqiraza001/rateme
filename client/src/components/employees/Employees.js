
import { Avatar, Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { connect } from 'react-redux';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadDepartments } from '../../store/actions/departmentActions';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';

function Employees() {
    useEffect(() => {

    }, []);
    return (
        <Box>

            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">Employees</Typography>
                <Box>
                    <Button component={Link} to="/admin/employees/add" variant="outlined" startIcon={<AddIcon />}> Add </Button>
                </Box>
            </Box>

        </Box>
    )
}

export default Employees;