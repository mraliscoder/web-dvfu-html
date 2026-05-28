import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { galleryItems } from '../data';

function Gallery() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Галерея вершин
      </Typography>
      <Box sx={{ height: 600, overflowY: 'scroll', borderRadius: 1 }}>
        <ImageList
          variant="masonry"
          sx={{
            // адаптивное количество колонок
            columnCount: {
              xs: '1 !important',
              sm: '2 !important',
              md: '3 !important',
              lg: '4 !important',
            },
          }}
          gap={8}
        >
          {galleryItems.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={item.img}
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{ borderRadius: 4 }}
              />
              <ImageListItemBar position="bottom" title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
}

export default Gallery;
