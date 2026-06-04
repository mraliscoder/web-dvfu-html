import * as React from 'react';
import Container from '@mui/material/Container';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { tGroup } from '../groupdata';
import SettingChart, { tSeries } from './SettingChart';

type GroupChartProps = {
  data: tGroup;
};

const chartSetting = {
  yAxis: [{ label: 'Высота (м)' }],
  height: 400,
};

export default function GroupChart({ data }: GroupChartProps) {
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная высота': true,
    'Средняя высота': false,
    'Минимальная высота': false,
  });
  const [isBar, setIsBar] = React.useState(true);

  const seriesY = (Object.entries(series) as [keyof tSeries, boolean][])
    .filter(([, on]) => on)
    .map(([key]) => ({ dataKey: key, label: key }));

  const showLabels = seriesY.length === 1;

  return (
    <Container maxWidth="lg">
      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          slotProps={{
            legend: { position: { vertical: 'bottom', horizontal: 'middle' } },
          }}
          barLabel={showLabels ? 'value' : undefined}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          slotProps={{
            legend: { position: { vertical: 'bottom', horizontal: 'middle' } },
          }}
          {...chartSetting}
        />
      )}
      <SettingChart
        series={series}
        setSeries={setSeries}
        isBar={isBar}
        setIsBar={setIsBar}
      />
    </Container>
  );
}
