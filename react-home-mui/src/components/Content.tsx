import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MountainCard from './MountainCard';
import { cards, peaks, Peak } from '../data';

// Маленькая карточка в боковой колонке: квадратное фото, название и краткое описание,
// весь блок — ссылка на rock.html (как в исходном index.html).
function SidePeak({ peak }: { peak: Peak }) {
  return (
    <Box
      component="a"
      href="rock.html"
      sx={{
        display: 'block',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'text.primary',
        '&:hover h6': { color: 'success.dark' },
      }}
    >
      <Box
        component="img"
        src={peak.img}
        alt={peak.title}
        sx={{
          width: '70%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          display: 'block',
          mx: 'auto',
          mb: 1,
          borderRadius: 1,
        }}
      />
      <Typography variant="subtitle1" component="h6" sx={{ fontWeight: 700 }}>
        {peak.title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
        Высота {peak.height} м, расположена в системе {peak.system}
      </Typography>
    </Box>
  );
}

function Content() {
  const leftPeaks = peaks.slice(0, 4);
  const rightPeaks = peaks.slice(4, 8);

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 2 }}>
          <Stack spacing={4}>
            {leftPeaks.map((peak) => (
              <SidePeak key={peak.title} peak={peak} />
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            {cards.map((item, index) => (
              <MountainCard key={item.title} mountain={item} index={index} />
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Stack spacing={4}>
            {rightPeaks.map((peak) => (
              <SidePeak key={peak.title} peak={peak} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;
