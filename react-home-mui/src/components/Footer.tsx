import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#5d8aa8',
        color: 'common.white',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" align="center" sx={{ mt: 3, opacity: 0.8 }}>
          © {new Date().getFullYear()} Эдуард Ильин, Б9123-09.03.04
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
