import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import MountainCard from './MountainCard';
import { cards } from '../data';

function Content() {
  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Grid container spacing={{ xs: 3, md: 5 }}>
        {cards.map((item, index) => (
          <Grid key={item.title} size={{ xs: 12, lg: 6 }}>
            <MountainCard mountain={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Content;
