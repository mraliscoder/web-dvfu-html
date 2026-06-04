import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  to: string;
}

const pages: NavPage[] = [
  { id: '1', label: 'Главная', to: '/' },
  { id: '2', label: 'Список гор', to: '/list' },
  { id: '3', label: 'Диаграммы', to: '/chart' },
];

interface NavbarProps {
  active: string;
}

export default function Navbar({ active }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const toggle = (next: boolean) => () => setOpen(next);

  return (
    <AppBar position="static" sx={{ boxShadow: 0, bgcolor: 'transparent', mt: '28px' }}>
      <Container maxWidth="xl">
        <StyledToolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TerrainIcon sx={{ color: '#2e7d32' }} />
            <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 600 }}>
              Горы России
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((p) => (
              <Button
                key={p.id}
                component={Link}
                to={p.to}
                color="success"
                size="medium"
                variant={active === p.id ? 'contained' : 'text'}
              >
                {p.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="Меню" onClick={toggle(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggle(false)}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggle(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {pages.map((p) => (
                  <MenuItem
                    key={p.id}
                    component={Link}
                    to={p.to}
                    onClick={toggle(false)}
                    selected={active === p.id}
                    sx={{
                      ...(active === p.id && {
                        bgcolor: 'success.main',
                        color: 'common.white',
                        '&.Mui-selected': {
                          bgcolor: 'success.main',
                          color: 'common.white',
                        },
                        '&.Mui-selected:hover': { bgcolor: 'success.dark' },
                      }),
                      '&:hover': { bgcolor: 'success.light', color: 'common.white' },
                    }}
                  >
                    {p.label}
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
