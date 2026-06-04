import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GroupGrid from './components/GroupGrid';
import GroupChart from './components/GroupChart';
import { systems, types, regions, tGroup } from './groupdata';

type tSelect = 'Система' | 'Тип' | 'Регион';

const dataByGroup: Record<tSelect, tGroup> = {
  'Система': systems,
  'Тип': types,
  'Регион': regions,
};

export default function Chart() {
  const [group, setGroup] = React.useState<tSelect>('Система');
  const [groupData, setGroupData] = React.useState<tGroup>(systems);

  const handleChange = (event: SelectChangeEvent) => {
    const next = event.target.value as tSelect;
    setGroup(next);
    setGroupData(dataByGroup[next]);
  };

  return (
    <div>
      <Navbar active="3" />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#2e7d32' }}>
          Диаграммы по сгруппированным данным
        </Typography>
        <Box sx={{ width: 240, m: 'auto' }}>
          <FormControl fullWidth>
            <InputLabel id="select-group-label">Группировать по</InputLabel>
            <Select
              labelId="select-group-label"
              id="select-group"
              value={group}
              label="Группировать по"
              onChange={handleChange}
            >
              <MenuItem value="Система">Системе</MenuItem>
              <MenuItem value="Тип">Типу</MenuItem>
              <MenuItem value="Регион">Региону</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>

      <GroupChart data={groupData} />
      <GroupGrid data={groupData} />

      <Footer />
    </div>
  );
}
