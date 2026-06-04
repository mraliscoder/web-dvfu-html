import Container from '@mui/material/Container';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import { mountains } from '../../data';

// Преобразуем массив гор в строки DataGrid: id = индекс, остальные поля плоские.
const rows: GridRowsProp = mountains.map((m, i) => ({
  id: i,
  'Название': m.title,
  'Высота': m.height,
  'Система': m.system,
  'Тип': m.type,
  'Регион': m.region,
}));

const columns: GridColDef[] = [
  { field: 'Название', headerName: 'Название', flex: 1 },
  { field: 'Высота', headerName: 'Высота, м', type: 'number', flex: 0.5 },
  { field: 'Система', headerName: 'Система', flex: 1 },
  { field: 'Тип', headerName: 'Тип', flex: 0.7 },
  { field: 'Регион', headerName: 'Регион', flex: 1 },
];

export default function MountainsGrid() {
  return (
    <Container maxWidth="lg" sx={{ height: 700, mt: 3 }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </Container>
  );
}
