import { useParams, Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { mountains } from '../data';

export default function Building() {
  const { id } = useParams<{ id: string }>();
  const index = Number(id);
  const mountain = Number.isInteger(index) ? mountains[index] : undefined;

  return (
    <div>
      <Navbar active="1" />
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Главная
          </Link>
          <Typography color="text.primary">
            {mountain ? mountain.title : 'Не найдено'}
          </Typography>
        </Breadcrumbs>

        {mountain ? (
          <Paper sx={{ p: { xs: 2, md: 4 }, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h3" align="center" sx={{ mb: 3, fontWeight: 600 }}>
              {mountain.title}
            </Typography>

            <Box
              component="img"
              src={mountain.imgAlt ?? mountain.img}
              alt={mountain.title}
              sx={{
                display: 'block',
                width: '100%',
                maxHeight: { xs: 320, md: 480 },
                objectFit: 'cover',
                borderRadius: 1,
                mb: 3,
              }}
            />

            <Grid container spacing={3} sx={{ mb: 3 }}>
              {mountain.description.map((p, i) => (
                <Grid key={i} size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: 'justify', color: 'text.secondary' }}
                  >
                    {p}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 2,
                bgcolor: 'grey.50',
                p: 2,
                borderRadius: 1,
              }}
            >
              <Stat label="Высота" value={`${mountain.height} м`} />
              <Stat label="Система" value={mountain.system} />
              <Stat label="Тип" value={mountain.type} />
              <Stat label="Регион" value={mountain.region} />
            </Box>
          </Paper>
        ) : (
          <Typography variant="h5" color="text.secondary" align="center">
            Гора с таким идентификатором не найдена.
          </Typography>
        )}
      </Container>
      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}
