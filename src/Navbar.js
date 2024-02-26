import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';


function Navbar() {
    let userId = 5;

    const linkStyle = {
      textDecoration: 'none', 
      color: 'white',         
      marginLeft: '10px'
    };

    return(
        
        <div>

        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign={"left"}>
          <Link style={linkStyle} to="/">Home</Link>
          </Typography >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign={"right"}>
          <Link style={linkStyle} to={{pathname : '/users/' + userId}}>User</Link>
          </Typography>
        </Toolbar>
      </AppBar>
        </div>
    )
}
export default Navbar;