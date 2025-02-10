"use client"; // This tells the computer that this part is for the user to see

import React, { useState , useEffect} from 'react'; // We need these tools to make our app work
import { useRouter } from 'next/navigation';

import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Avatar, Menu, MenuItem, Tooltip } from '@mui/material'; // These are special building blocks for our app
import { Home, Settings, Info, Menu as MenuIcon, Logout } from '@mui/icons-material'; // These are pictures we can use in our app
import { createTheme, ThemeProvider } from '@mui/material/styles'; // These help us make our app look nice
import ProfilePage from './admin_components/ProfilePage'; // This is the home part of our app
import SkillsPage from './admin_components/SkillsPage'; // This is the settings part of our app
import ProjectsPage from './admin_components/ProjectsPage'; // This is the about part of our app
import ExperiencePage from './admin_components/ExperiencePage'; // This is the about part of our app






const drawerWidth = 240; // This is how wide the side menu is

// This is the color theme for our app, making it dark
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1c1c1c', // Dark background color
      paper: '#333333', // Dark paper color
    },
    text: {
      primary: '#ffffff', // White text color
    },
  },
});

// These are the different parts of our app we can show
const components = {
  Profile: () => <Typography variant="h4" color="text.primary"><ProfilePage/></Typography>, // Home part
  Skills: () => <Typography variant="h4" color="text.primary"><SkillsPage/></Typography>, // Settings part
  Projects: () => <Typography variant="h4" color="text.primary"><ProjectsPage/></Typography>, // About part
  Experience: () => <Typography variant="h4" color="text.primary"><ExperiencePage/></Typography>, // About part

};

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState('Home'); // This keeps track of which part we are looking at
  const [menuExpanded, setMenuExpanded] = useState(true); // This keeps track if the side menu is open or closed
  const [anchorElUser, setAnchorElUser] = useState(null); // This keeps track if the user menu is open or closed



  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    if (!token) {
      router.push('/login');
    }
  }, [router]);
  

  // This opens the user menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // This closes the user menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // These are the items in the side menu
  const menuItems = [
    { text: 'Profile', icon: <Home /> }, // Home item
    { text: 'Skills', icon: <Info /> }, // Settings item
    { text: 'Projects', icon: <Info /> },// About item
    { text: 'Experience', icon: <Info /> },// About item
    { text: 'Logout', icon: <Logout /> }, // Logout item
  ];

  // These are the items in the user settings menu
  const userSettings = ['Profile', 'Account', 'Dashboard', 'Logout']; // User settings items

  return (
    <ThemeProvider theme={darkTheme}> {/* This makes our app use the dark theme */}
      <Box sx={{ display: 'flex', bgcolor: 'background.default', color: 'text.primary' }}> {/* This is the main container for our app */}
        <CssBaseline /> {/* This makes sure our app looks good on all devices */}
        <AppBar
          position="fixed"
          sx={{
            bgcolor: 'background.paper',
            width: { sm: `calc(100% - ${menuExpanded ? drawerWidth : 60}px)` }, // This makes the top bar adjust when the side menu is open or closed
            ml: { sm: `${menuExpanded ? drawerWidth : 60}px` }, // This moves the top bar to the right when the side menu is open
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMenuExpanded(!menuExpanded)} // This toggles the side menu open or closed
              sx={{ mr: 2 }}
            >
              <MenuIcon /> {/* This is the menu button icon */}
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, textTransform: 'uppercase', color: 'text.primary' }}>
              Welcome Back {/* This is the title of our app */}
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" /> {/* This is the user avatar */}
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
                open={Boolean(anchorElUser)} // This checks if the user menu is open
                onClose={handleCloseUserMenu} // This closes the user menu
              >
                {userSettings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography> {/* This shows each user setting */}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: menuExpanded ? drawerWidth : 60, // This sets the width of the side menu
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: menuExpanded ? drawerWidth : 60, // This sets the width of the side menu paper
              boxSizing: 'border-box',
              transition: 'width 0.3s', // This makes the side menu open and close smoothly
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
                  onClick={() => setActiveComponent(item.text)} // This changes the active component when a menu item is clicked
                  sx={{ cursor: 'pointer' }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon> {/* This shows the icon for each menu item */}
                  {menuExpanded && <ListItemText primary={item.text} />} {/* This shows the text for each menu item if the menu is expanded */}
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
            width: { sm: `calc(100% - ${menuExpanded ? drawerWidth : 60}px)` }, // This sets the width of the main content area
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <Toolbar />
          {components[activeComponent] ? components[activeComponent]() : null} {/* This shows the active component */}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel; // This makes our AdminPanel component available to use in other parts of our app