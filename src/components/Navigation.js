import React, { useState } from 'react';
import { Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {LogoDev} from "@mui/icons-material";
import { Link } from 'react-router-dom';
import logoImage from '../duodeka_logo.png'

function Navigation() {
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const menuItems = [
        { displayName: 'Task Manager', routeName: 'todos', icon: InboxIcon},
        { displayName: 'About Us', routeName: 'about', icon: MailIcon  },
        { displayName: 'Contact Us', routeName: 'contact', icon: MailIcon  },
        { displayName: 'Logs', routeName: 'logs', icon: LogoDev}
    ];

    const drawerContent = (
        <List>
            {menuItems.map((item) => (
                <ListItem button key={item.routeName} component={Link} to={`/${item.routeName}`} onClick={() => setOpen(false)}>
                    <ListItemIcon><item.icon/></ListItemIcon>
                    <ListItemText primary={item.displayName} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: 'block' }}>
                <MenuIcon />
            </IconButton>
            <Drawer variant="temporary" open={open} onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={logoImage} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                    <Typography variant="h5" noWrap component="div" sx={{fontWeight: 'bold'}}>
                        To-do app
                    </Typography>
                </Box>
                {drawerContent}
            </Drawer>
        </Box>
    );
}

export default Navigation;
