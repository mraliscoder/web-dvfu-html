import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Checkbox,
} from '@mui/material';
import { setChoice } from './quizSlice';
import { RootState } from '../../store';

interface ChoiceProps {
  index: number;
  type: 'C' | 'X';
  options: string[];
}

function Choice({ index, type, options }: ChoiceProps) {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.quiz.choices[index]) || [];

  if (type === 'C') {
    return (
      <FormControl>
        <RadioGroup
          value={selected[0] ?? ''}
          onChange={(e) => dispatch(setChoice({ index, items: [e.target.value] }))}
        >
          {options.map((opt) => (
            <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }

  const toggle = (opt: string) => {
    const next = selected.includes(opt)
      ? selected.filter((o) => o !== opt)
      : [...selected, opt];
    dispatch(setChoice({ index, items: next }));
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {options.map((opt) => (
          <FormControlLabel
            key={opt}
            control={<Checkbox checked={selected.includes(opt)} onChange={() => toggle(opt)} />}
            label={opt}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default Choice;
