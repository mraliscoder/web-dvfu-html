import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TerrainIcon from '@mui/icons-material/Terrain';
import { styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  padding: '8px 12px',
}));

interface NavPage {
  id: string;
  label: string;
  href: string;
}

const pages: NavPage[] = [
  { id: '1', label: 'Главная', href: 'index.html' },
  { id: '2', label: 'Список гор', href: 'table.html' },
  { id: '3', label: 'О горе', href: 'rock.html' },
];

interface NavbarProps {
  active: string;
}

function Navbar({ active }: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{ boxShadow: 0, bgcolor: 'transparent', mt: '28px' }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TerrainIcon sx={{ color: '#2e7d32' }} />
            <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 600 }}>
              Горы России
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                href={page.href}
                color="success"
                size="medium"
                variant={active === page.id ? 'contained' : 'text'}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="Меню" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {pages.map((page) => (
                  <MenuItem
                    key={page.id}
                    component="a"
                    href={page.href}
                    selected={active === page.id}
                    sx={{
                      ...(active === page.id && {
                        bgcolor: 'success.main',
                        color: 'common.white',
                        '&.Mui-selected': {
                          bgcolor: 'success.main',
                          color: 'common.white',
                        },
                        '&.Mui-selected:hover': { bgcolor: 'success.dark' },
                      }),
                      '&:hover': {
                        bgcolor: 'success.light',
                        color: 'common.white',
                      },
                    }}
                  >
                    {page.label}
                  </MenuItem>
                ))}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
