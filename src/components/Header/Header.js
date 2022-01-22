import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

function Header() {
  const Navigate = useNavigate();
  function manager() {
    Navigate("/profile");
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="transparent" position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Shop
            </Typography>
            <Button endIcon={<AddShoppingCartIcon />}>CART</Button>
            <Button color="inherit">
              <Avatar onClick={manager} src="/broken-image.jpg" />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
