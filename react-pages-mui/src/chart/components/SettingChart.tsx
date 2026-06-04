import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';

export type tSeries = {
  'Максимальная высота': boolean;
  'Средняя высота': boolean;
  'Минимальная высота': boolean;
};

type SettingChartProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingChart({ series, setSeries, isBar, setIsBar }: SettingChartProps) {
  const handleSeries = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({ ...series, [event.target.name]: event.target.checked } as tSeries);
  };
  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(event.target.value === 'bar');
  };

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="flex-start"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ m: '20px 0' }}
    >
      <FormControl>
        <FormLabel id="label-radio-group">Тип диаграммы:</FormLabel>
        <RadioGroup
          name="group-radio"
          value={isBar ? 'bar' : 'line'}
          onChange={handleType}
        >
          <FormControlLabel value="bar" control={<Radio />} label="Гистограмма" />
          <FormControlLabel value="line" control={<Radio />} label="Линейная" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="label-checkbox-group">На диаграмме показать:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={series['Максимальная высота']}
                onChange={handleSeries}
                name="Максимальная высота"
              />
            }
            label="максимальную высоту"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={series['Средняя высота']}
                onChange={handleSeries}
                name="Средняя высота"
              />
            }
            label="среднюю высоту"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={series['Минимальная высота']}
                onChange={handleSeries}
                name="Минимальная высота"
              />
            }
            label="минимальную высоту"
          />
        </FormGroup>
      </FormControl>
    </Stack>
  );
}
