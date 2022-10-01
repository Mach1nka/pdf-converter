import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';

import { Nullable } from '../../types/types';
import { authRoutes } from '../../router/auth-config';
import { AuthContext } from '../../contexts/Auth';
import { useApi } from '../../hooks';
import { logout } from '../../services/resources/requests/auth';
import { authManagement } from '../../services/resources/storages/client';
import { AuthKeys } from '../../services/resources/storages/types';
import { AuthActions, LogoutPayload } from '../../services/resources/models/auth.model';

const MobileNav: React.FC = () => {
  const { isAuth, username, dispatch } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const navigate = useNavigate();
  const callback = useApi<string, LogoutPayload>(logout);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const refreshToken = String(authManagement.get(AuthKeys.REFRESH_TOKEN));
    handleClose();
    dispatch({ type: AuthActions.LOG_OUT });
    await callback({ refreshToken, username: String(username) });
  };

  return (
    <>
      {!isAuth ? (
        <>
          <IconButton size="large" onClick={handleMenu} color="secondary">
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
            <MenuItem onClick={handleLogout}>
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
