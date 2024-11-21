import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Toolbar, Typography, Menu } from "@mui/material"
import { Menu as MenuIcon, AccountCircle, Dashboard, BugReport, ContactEmergency } from "@mui/icons-material"
import { appbarList } from "../data/appbarList"
import { useState } from "react"
import { appSubtitle, appTitle } from "../data/defaultStrings"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/userSlice"

export const Appbar = (props) => {
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const handleDrawer = (drawerState) => {
        setToggleDrawer((toggle) => !toggle)
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const { isLoggedIn, userName } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const changeMenuOnClick = (event, index) => {
        props.changeMenuPage(index);
    }

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    }

    const handleProfileMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(logout())
        
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawer}>
            <Typography p={2} variant="h2">Menu</Typography>
            <Divider />
            <List>
                
                    <ListItem disablePadding>
                        <ListItemButton onClick={(e) => changeMenuOnClick(e, 0)}>
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={(e) => changeMenuOnClick(e, 1)}>
                            <ListItemIcon>
                                <BugReport />
                            </ListItemIcon>
                            <ListItemText primary={"All Tickets"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={(e) => changeMenuOnClick(e, 2)}>
                            <ListItemIcon>
                                <ContactEmergency />
                            </ListItemIcon>
                            <ListItemText primary={"Assinged To Me"} />
                        </ListItemButton>
                    </ListItem>
               
            </List>
        </Box>
)

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    { isLoggedIn && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr:2 }}
                        onClick={handleDrawer}>
                        <MenuIcon />
                    </IconButton>}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {appTitle}
                    </Typography>
                        { isLoggedIn && <><IconButton
                            onClick={handleProfileMenu}
                            size="large"
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Menu anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}} 
                        keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right'}} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
                            <Typography p={2}>Hi, {userName}!</Typography>
                            <Divider />
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu></>}
                </Toolbar>
                <Drawer open={toggleDrawer} onClose={handleDrawer}>
            {DrawerList}
        </Drawer>   
            </AppBar>
            
        </Box>
        {props.children}
        </>
    )
}