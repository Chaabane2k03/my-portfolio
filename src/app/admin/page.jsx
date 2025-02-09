"use client";
import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { Home, Settings, Info, Menu as MenuIcon, Logout } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1c1c1c',
      paper: '#333333',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const components = {
  Home: () => <Typography variant="h4" color="text.primary">Home Component</Typography>,
  Settings: () => <Typography variant="h4" color="text.primary">Settings Component</Typography>,
  About: () => <Typography variant="h4" color="text.primary">About Component</Typography>,
};

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('Home');
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuItems = [
    { text: 'Home', icon: <Home /> },
    { text: 'Settings', icon: <Settings /> },
    { text: 'About', icon: <Info /> },
  ];

  const userSettings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', color: 'text.primary' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            bgcolor: 'background.paper',
            width: { sm: `calc(100% - ${menuExpanded ? drawerWidth : 60}px)` },
            ml: { sm: `${menuExpanded ? drawerWidth : 60}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMenuExpanded(!menuExpanded)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, textTransform: 'uppercase', color: 'text.primary' }}>
              Admin Panel
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userSettings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: menuExpanded ? drawerWidth : 60,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: menuExpanded ? drawerWidth : 60,
              boxSizing: 'border-box',
              transition: 'width 0.3s',
              overflowX: 'hidden',
              bgcolor: 'background.paper',
            },
          }}
        >
          <Toolbar />
          <Box>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  key={item.text}
                  onClick={() => setActiveComponent(item.text)}
                  sx={{ cursor: 'pointer' }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {menuExpanded && <ListItemText primary={item.text} />}
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${menuExpanded ? drawerWidth : 60}px)` },
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <Toolbar />
          {components[activeComponent] ? components[activeComponent]() : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel;
