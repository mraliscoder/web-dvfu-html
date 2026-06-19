import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid2';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { addList } from './quizSlice';
import SortableList from './SortableList';
import { Task } from '../quizData';

function shuffle(arr: string[]): string[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface MatchingProps {
  index: number;
  type: 'M' | 'S';
  tasks: Task[];
  round: number;
}

function Matching({ index, type, tasks, round }: MatchingProps) {
  const dispatch = useDispatch();
  const source = type === 'S' ? tasks.map((t) => t.question) : tasks.map((t) => String(t.answer));

  useEffect(() => {
    dispatch(addList({ index, items: shuffle(source) }));
  }, [round]);

  if (type === 'S') {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <SortableList index={index} numbered />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item, i) => (
            <ListItem key={i}>
              <ListItemButton
                sx={{ border: '1px solid gray', borderRadius: '5px', textAlign: 'right' }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid size={6}>
        <SortableList index={index} />
      </Grid>
    </Grid>
  );
}

export default Matching;
