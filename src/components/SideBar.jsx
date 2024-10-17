import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
function SideBar({ setSelectedView, setIsCollapsed, isCollapsed }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
    setSelectedView(index);
  };

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev); 
  };

  return (
    <Box sx={{ width: isCollapsed ? "60px" : "240px", bgcolor: "background.paper", transition: 'width 0.3s', margin:'0px' }}>
      <IconButton onClick={handleToggleSidebar} sx={{ margin: '0px' }}>
        {isCollapsed ? <ChevronRightRoundedIcon /> : <ChevronLeftRoundedIcon />}
      </IconButton>
      <Divider />
      <List component="nav" aria-label="user service options">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(e) => handleListItemClick(e, 0)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Dashboard" />}
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(e) => handleListItemClick(e, 1)}
        >
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Orders" />}
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(e) => handleListItemClick(e, 2)}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Customers" />}
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(e) => handleListItemClick(e, 3)}
        >
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Services" />}
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(e) => handleListItemClick(e, 4)}
        >
          <ListItemIcon>
            <ConfirmationNumberIcon />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Support Tickets" />}
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="agent service options">
        <ListItemButton
          selected={selectedIndex === 5}
          onClick={(e) => handleListItemClick(e, 5)}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Settings" />}
        </ListItemButton>
      </List>
    </Box>
  );
}

export default SideBar;
