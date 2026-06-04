import Container from '@mui/material/Container';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import { tGroup } from '../groupdata';

type GroupProps = {
  data: tGroup;
};

const columns: GridColDef[] = [
  { field: 'Группа', headerName: 'Группа', flex: 1.2 },
  { field: 'Минимальная высота', headerName: 'Минимальная высота, м', type: 'number', flex: 1 },
  { field: 'Средняя высота', headerName: 'Средняя высота, м', type: 'number', flex: 1 },
  { field: 'Максимальная высота', headerName: 'Максимальная высота, м', type: 'number', flex: 1 },
];

export default function GroupGrid({ data }: GroupProps) {
  return (
    <Container maxWidth="lg" sx={{ height: 400, mt: 3 }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        columns={columns}
        hideFooter
      />
    </Container>
  );
}
