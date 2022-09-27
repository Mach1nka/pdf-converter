import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListItemIcon, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';

import { Nullable } from '../../types/types';
import { authRoutes } from '../../router/auth-config';
import { AuthContext } from '../../contexts/Auth';
import { authManagement } from '../../services/resources/storages/client';
import { AuthKeys } from '../../services/resources/storages/types';
import { useApi } from '../../hooks';
import { logout } from '../../services/resources/requests/auth';
import { AuthActions } from '../../services/resources/models/auth.model';

const DesktopNav: React.FC = () => {
  const { username, isAuth, dispatch } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const navigate = useNavigate();
  const callback = useApi(logout);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const refreshToken = String(authManagement.get(AuthKeys.REFRESH_TOKEN));
    handleClose();
    await callback({ refreshToken, username: String(username) });
    dispatch({ type: AuthActions.LOG_OUT });
  };

  return (
    <>
      {!isAuth ? (
        authRoutes.map((el) => (
          <Button key={el.id} onClick={() => navigate(el.path)} size="large" color="secondary">
            {el.title}
          </Button>
        ))
      ) : (
        <>
          <Button
            startIcon={<AccountCircleIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            size="large"
            onClick={handleMenu}
            color="primary"
          >
            {username}
          </Button>
          <Menu
            id="menu-auth"
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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

export default DesktopNav;
