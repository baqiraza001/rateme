import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, AppBar as MuiAppBar, Toolbar, Tooltip, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../store/actions/authActions';
import ProgressBar from './library/ProgressBar';
import Alert from './library/Alert';
import { userTypes } from '../utils/constants';

export default function AppBar() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const userType = user.type;

  // to open dropdown of profile picture
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = event => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  //logout button
  const handleLogout = () => {
    dispatch(signout());
    closeMenu();
  }

  return (
    <MuiAppBar>
      <Alert />
      <Container maxWidth="lg">
        <Toolbar>
          <AdbIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/admin/dashboard"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RateMe
          </Typography>

          {/* Menus list */}
          <Box sx={{ flexGrow: 1, textAlign: 'right', }}>
            {
              userType === userTypes.USER_TYPE_SUPER &&
              <Button LinkComponent={Link} to="/admin/departments" sx={{ color: 'white' }}>Departments</Button>
            }
            {
              userType === userTypes.USER_TYPE_STANDARD &&
              <Button LinkComponent={Link} to={`/admin/departments/${user.departmentId}`} sx={{ color: 'white' }}>Employees</Button>
            }
            <Button LinkComponent={Link} to="/admin/users" sx={{ color: 'white' }}>Users</Button>
          </Box>
          {/* Menus list */}

          {/* profile picture with dropdown */}
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip>
              <IconButton sx={{ p: 0 }} onClick={openMenu}>
                <Avatar alt="Profile picture" src={process.env.REACT_APP_BASE_URL + `content/${user._id}/${user.profilePicture}`} />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem component={Link} to="/admin/account-settings" >
                <Typography onClick={closeMenu}>Account Settings</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography >Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* profile pitcure with dropdown */}
        </Toolbar>
      </Container>
      <ProgressBar />
    </MuiAppBar>
  )
}
