import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: '#2e7d32', color: 'common.white', py: 4, mt: 6 }}
    >
      <Container maxWidth="xl">
        <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
          Горы России
        </Typography>
        <Typography variant="body2" align="center" sx={{ opacity: 0.9, mt: 1 }}>
          Самые высокие горные вершины Российской Федерации.
        </Typography>
        <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
        <Typography variant="body2" align="center">
          <Link href="https://edwardcode.net/" color="inherit" underline="hover">
            Эдуард Ильин
          </Link>
          , Б9123-09.03.04
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
