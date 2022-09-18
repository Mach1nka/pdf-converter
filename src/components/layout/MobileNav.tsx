import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';

import { Nullable } from '../../types/types';
import { authRoutes } from '../../router/auth-config';
import { AuthContext } from '../../contexts/Auth';

const MobileNav: React.FC = () => {
  const { isAuth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {!isAuth ? (
        <>
          <IconButton size="large" onClick={handleMenu} color="primary">
            <LoginIcon />
          </IconButton>
          <Menu
            id="menu-auth"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {authRoutes.map((el) => (
              <MenuItem
                key={el.id}
                onClick={() => {
                  handleClose();
                  navigate(el.path);
                }}
              >
                {el.title}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <>
          <IconButton size="large" color="primary" onClick={handleMenu}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-auth"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Log Out
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default MobileNav;
