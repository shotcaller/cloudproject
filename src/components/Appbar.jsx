import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Menu, AccountCircle, Mail } from "@mui/icons-material"
import { appbarList } from "../data/appbarList"
import { useState } from "react"
import { appSubtitle, appTitle } from "../data/defaultStrings"

export const Appbar = (props) => {
    const [auth, setAuth] = useState(true)
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const handleDrawer = (drawerState) => {
        setToggleDrawer((toggle) => !toggle)
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawer}>
            <Typography variant="h2">Lesgo</Typography>
            <List>
                {appbarList.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Mail />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
)

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr:2 }}
                        onClick={handleDrawer}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {appTitle}
                    </Typography>
                    { auth && (
                    <div>
                        <IconButton
                            size="large"
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </div>
                )}
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