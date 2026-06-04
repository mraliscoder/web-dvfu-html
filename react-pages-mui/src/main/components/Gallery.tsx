import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { galleryItems } from '../../data';

const areas = ['a', 'b', 'c', 'd', 'e', 'f'] as const;

export default function Gallery() {
  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gridAutoRows: { xs: 160, sm: 200, md: 240 },
          gridTemplateAreas: {
            xs: '"a a" "c b" "d e" "f f"',
            md: '"a a c b" "d e f f"',
          },
        }}
      >
        {galleryItems.map((item, i) => (
          <Box
            key={item.title}
            component={Link}
            to={`/building/${i}`}
            sx={{
              gridArea: areas[i],
              display: 'block',
              overflow: 'hidden',
              borderRadius: 1,
            }}
          >
            <Box
              component="img"
              src={item.img}
              alt={item.title}
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
