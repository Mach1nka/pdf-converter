import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import { Nullable } from '../../types/types';
import { authRoutes } from '../../router/auth-config';

const MobileNav: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log('render');

  return (
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
  );
};

export default MobileNav;
