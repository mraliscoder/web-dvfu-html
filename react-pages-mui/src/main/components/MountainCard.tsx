import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import type { Mountain } from '../../data';

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  marginBottom: theme.spacing(1.5),
}));

interface MountainCardProps {
  mountain: Mountain;
  index: number;
  buildingIndex: number;
}

export default function MountainCard({ mountain, index, buildingIndex }: MountainCardProps) {
  const reversed = index % 2 === 1;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: reversed ? 'row-reverse' : 'row' },
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardMedia
        component="img"
        alt={mountain.title}
        image={mountain.img}
        sx={{
          width: { xs: '100%', sm: 260 },
          height: { xs: 200, sm: 'auto' },
          flexShrink: 0,
          objectFit: 'cover',
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">
            {mountain.title}
          </Typography>
          {mountain.description.map((p, i) => (
            <StyledTypography key={i} variant="body2">
              {p}
            </StyledTypography>
          ))}
        </CardContent>
        <CardActions sx={{ justifyContent: reversed ? 'flex-start' : 'flex-end', mt: 'auto' }}>
          <Button
            size="small"
            variant="contained"
            color="success"
            component={Link}
            to={`/building/${buildingIndex}`}
          >
            Подробнее »
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
