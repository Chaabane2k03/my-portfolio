"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Switch,
} from '@mui/material';
import {
  Home,
  Settings,
  Info,
  Menu as MenuIcon,
  Logout,
  Notifications,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfilePage from './admin_pages/ProfilePage';
import SkillsPage from './admin_pages/SkillsPage';
import ProjectsPage from './admin_pages/ProjectsPage';
import ExperiencePage from './admin_pages/ExperiencePage';

const drawerWidth = 240;

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('Profile');
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('auth_token='));
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#1c1c1c' : '#ffffff',
        paper: darkMode ? '#333333' : '#f5f5f5',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#bbbbbb' : '#555555',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  const components = {
    Profile: () => <ProfilePage dark={darkMode}/>,
    Skills: () => <SkillsPage />,
    Projects: () => <ProjectsPage />,
    Experience: () => <ExperiencePage />,
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuItems = [
    { text: 'Profile', icon: <Home /> },
    { text: 'Skills', icon: <Settings /> },
    { text: 'Projects', icon: <Info /> },
    { text: 'Experience', icon: <Info /> },
    { text: 'Logout', icon: <Logout /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', color: 'text.primary' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            bgcolor: 'background.paper',
            width: { sm: `calc(100% - ${menuExpanded ? drawerWidth : 60}px)` },
            ml: { sm: `${menuExpanded ? drawerWidth : 60}px` },
            boxShadow: 3,
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
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, textTransform: 'uppercase' }}>
              Welcome Back, Admin
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Tooltip title="Toggle dark mode">
              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
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
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {['Profile', 'Account', 'Dashboard', 'Logout'].map((setting) => (
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
              boxShadow: 1,
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
                  sx={{
                    cursor: 'pointer',
                    bgcolor: activeComponent === item.text ? (darkMode ? 'primary.dark' : 'primary.light') : 'transparent',
                    color: 'text.primary',
                    borderRadius: 1,
                    mb: 1,
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: darkMode ? 'primary.light' : 'primary.main',
                      color: darkMode ? '#000000' : '#ffffff',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
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
