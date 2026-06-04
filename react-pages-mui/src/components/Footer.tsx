import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: '#5d8aa8', color: 'common.white', py: 4, mt: 6 }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" align="center" sx={{ opacity: 0.85 }}>
          © Эдуард Ильин, Б9123-09.03.04
        </Typography>
      </Container>
    </Box>
  );
}
