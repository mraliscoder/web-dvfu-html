import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MountainCard from './MountainCard';
import { cards, peaks } from '../data';

function Content() {
  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      {/* Подробные карточки вершин */}
      <Grid container spacing={{ xs: 3, md: 5 }}>
        {cards.map((item, index) => (
          <Grid key={item.title} size={{ xs: 12, lg: 6 }}>
            <MountainCard mountain={item} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Блок «Другие вершины» — небольшие карточки */}
      <Typography variant="h5" sx={{ mt: 6, mb: 3, fontWeight: 600 }}>
        Другие вершины
      </Typography>
      <Grid container spacing={3}>
        {peaks.map((peak) => (
          <Grid key={peak.title} size={{ xs: 6, sm: 4, md: 3 }}>
            <Card
              sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardMedia
                component="img"
                alt={peak.title}
                image={peak.img}
                sx={{ height: 160, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {peak.title}
                </Typography>
                <Box sx={{ color: 'text.secondary' }}>
                  <Typography variant="body2">Высота {peak.height} м</Typography>
                  <Typography variant="body2">{peak.system}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Content;
