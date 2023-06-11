
import { Avatar, Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { connect } from 'react-redux';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadDepartments } from '../../store/actions/departmentActions';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';

function Employees() {
    const { deptId } = useParams();

    useEffect(() => {

    }, []);
    return (
        <Box>

            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">Employees</Typography>
                <Box>
                    <Button sx={{ mr: 1 }} component={Link} to={`/admin/departments/edit/${deptId}`} variant="outlined" startIcon={<EditIcon />}> Edit Department Info </Button>
                    <Button component={Link} to="/admin/employees/add" variant="outlined" startIcon={<AddIcon />}> Add Employee</Button>
                </Box>
            </Box>

        </Box>
    )
}

export default Employees;