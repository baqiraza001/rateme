
import { Avatar, Box, Button, IconButton, Pagination, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadDepartments } from '../../store/actions/departmentActions';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import { hideProgressBar, showProgressBar } from '../../store/actions/progressBarActions';
import axios from 'axios';
import { showError, showSuccess } from '../../store/actions/alertActions';
import DeleteEmployee from './DeleteEmployee';
import EmployeeQRCode from './EmployeeQRCode';

function Employees() {
    const { deptId } = useParams();
    const dispatch = useDispatch();
    const [department, setDepartment] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const [query, setQuery] = useState("");

    const loadEmployees = () => {
        dispatch(showProgressBar());
        axios.post('/api/employees/search', { deptId, page, query }).then(result => {
            setDepartment(result.data.department);
            setEmployees(result.data.employees);
            setNumOfPages(result.data.numOfPages);
            dispatch(hideProgressBar())
        }).catch(error => {
            let message = error && error.response && error.response.data ? error.response.data.error : error.message;
            dispatch(hideProgressBar())
            dispatch(showError(message))
        })
    }

    const deleteEmployee = (id) => {
        dispatch(showProgressBar());
        axios.post('api/employees/delete', { id }).then(({ data }) => {
            if (data.success) {
                dispatch(showSuccess("Employee deleted successfully"));
                dispatch(hideProgressBar())
                setEmployees(employees => employees.filter(item => item._id !== id));
            }
        }).catch(error => {
            dispatch(hideProgressBar())
            let message = error && error.response && error.response.data ? error.response.data.error : error.message;
            dispatch(showError(message))
        })
    }

    useEffect(() => {
        loadEmployees();
    }, [page]);

    if (!department) return null;

    return (
        <Box>

            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">{department.name} - Employees</Typography>
                <Box>
                    <Button sx={{ mr: 1 }} component={Link} to={`/admin/departments/edit/${deptId}`} variant="outlined" startIcon={<EditIcon />}> Edit Department Info </Button>
                    <Button component={Link} to={`/admin/employees/add/${deptId}`} variant="outlined" startIcon={<AddIcon />}> Add Employee</Button>
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <TextField sx={{ flexGrow: 1, mr: 2 }} onChange={(event) => setQuery(event.target.value)} placeholder='Search name, email, cnic, phone, designation...' size="small" />
                <Button variant="contained" onClick={loadEmployees}>Search</Button>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Picture</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>CNIC</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        employees.length === 0 &&
                        <TableRow>
                            <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                                No employees found
                            </TableCell>
                        </TableRow>
                    }
                    {
                        employees.map(employee => (
                            <TableRow key={employee._id}>
                                <TableCell>
                                    {
                                        <Avatar src={process.env.REACT_APP_BASE_URL + 'content/' + department._id + '/' + employee.profilePicture} />
                                    }
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/employees/profile/${employee._id}`}>
                                        {employee.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{employee.phone}</TableCell>
                                <TableCell>{employee.cnic}</TableCell>
                                <TableCell>
                                    <IconButton component={Link} to={`/admin/employees/edit/${employee._id}`}> <EditIcon /> </IconButton>
                                    <DeleteEmployee employeeId={employee._id} name={employee.name} deleteEmployee={deleteEmployee} />
                                    <EmployeeQRCode employeeId={employee._id} name={employee.name} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

            </Table>

            <Box mt={3} display="flex" justifyContent="center">
                <Pagination count={numOfPages} variant="outlined" color="primary" page={page} onChange={(event, value) => setPage(value)} />
            </Box>

        </Box>
    )
}

export default Employees;