import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MountainCard from './MountainCard';
import { cards, sidePeaks, mountains } from '../../data';
import type { Mountain } from '../../data';

interface SidePeakProps {
  peak: Mountain;
  buildingIndex: number;
}

function SidePeak({ peak, buildingIndex }: SidePeakProps) {
  return (
    <Box
      component={Link}
      to={`/building/${buildingIndex}`}
      sx={{
        display: 'block',
        textAlign: 'center',
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

export default function Content() {
  const leftPeaks = sidePeaks.slice(0, 4);
  const rightPeaks = sidePeaks.slice(4, 8);
  // sidePeaks начинаются с индекса 6 в массиве mountains
  const leftStart = mountains.indexOf(sidePeaks[0]);
  const rightStart = mountains.indexOf(sidePeaks[4]);
  // Большие карточки (Джангитау, Шхара) — индексы 4 и 5
  const cardBuildingIdx = [4, 5];

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 2 }}>
          <Stack spacing={4}>
            {leftPeaks.map((peak, i) => (
              <SidePeak key={peak.title} peak={peak} buildingIndex={leftStart + i} />
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            {cards.map((item, i) => (
              <MountainCard
                key={item.title}
                mountain={item}
                index={i}
                buildingIndex={cardBuildingIdx[i]}
              />
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Stack spacing={4}>
            {rightPeaks.map((peak, i) => (
              <SidePeak key={peak.title} peak={peak} buildingIndex={rightStart + i} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
