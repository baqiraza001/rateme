import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, AppBar as MuiAppBar, Toolbar, Tooltip, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../store/actions/authActions';
import ProgressBar from './library/ProgressBar';
import Alert from './library/Alert';

export default function AppBar() {

  const dispatch = useDispatch();

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
            <Button LinkComponent={Link} to="/admin/departments" sx={{ color: 'white' }}>Departments</Button>
          </Box>
          {/* Menus list */}

          {/* profile picture with dropdown */}
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip>
              <IconButton sx={{ p: 0 }} onClick={openMenu}>
                <Avatar alt="Remy Sharp" src="" />
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
