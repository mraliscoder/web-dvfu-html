import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { quiz, Quiz as QuizType } from '../quizData';
import { setChoice } from './quizSlice';
import { RootState } from '../../store';
import Matching from './Matching';
import Choice from './Choice';

interface Score {
  correct: number;
  total: number;
}

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((x) => setB.has(x));
}

function grade(item: QuizType, lists: string[][], choices: string[][]): Score {
  if (item.type === 'C' || item.type === 'X') {
    const sel = choices[item.id - 1] || [];
    const correct = item.tasks.filter((t) => t.answer === true).map((t) => t.question);
    return { correct: sameSet(sel, correct) ? 1 : 0, total: 1 };
  }
  const list = lists[item.id - 1] || [];
  if (item.type === 'M') {
    const correct = item.tasks.reduce(
      (acc, t, i) => acc + (list[i] === t.answer ? 1 : 0),
      0
    );
    return { correct, total: item.tasks.length };
  }
  const correct = item.tasks.reduce((acc, t) => {
    const pos = list.indexOf(t.question);
    return acc + (String(pos + 1) === t.answer ? 1 : 0);
  }, 0);
  return { correct, total: item.tasks.length };
}

export default function Quiz() {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.quiz.lists);
  const choices = useSelector((state: RootState) => state.quiz.choices);
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<Score[] | null>(null);

  const handleCheck = () => {
    setResults(quiz.map((item) => grade(item, lists, choices)));
  };

  const handleRestart = () => {
    setResults(null);
    quiz.forEach((item) => {
      if (item.type === 'C' || item.type === 'X') {
        dispatch(setChoice({ index: item.id - 1, items: [] }));
      }
    });
    setRound((r) => r + 1);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: 600, color: '#2e7d32' }}>
        Проверь себя
      </Typography>

      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {index + 1}. {item.title}
          </Typography>
          {item.type === 'C' || item.type === 'X' ? (
            <Choice
              index={item.id - 1}
              type={item.type as 'C' | 'X'}
              options={item.tasks.map((t) => t.question)}
            />
          ) : (
            <Matching
              index={item.id - 1}
              type={item.type as 'M' | 'S'}
              tasks={item.tasks}
              round={round}
            />
          )}
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 3 }}>
        <Button variant="contained" color="success" onClick={handleCheck}>
          Проверить
        </Button>
        <Button variant="outlined" color="success" onClick={handleRestart}>
          Начать снова
        </Button>
      </Box>

      {results && (
        <Paper elevation={2} sx={{ p: 3, m: 2 }}>
          <Typography variant="h5" gutterBottom>
            Результаты тестирования
          </Typography>
          {quiz.map((item, index) => {
            const r = results[index];
            const ok = r.correct === r.total;
            return (
              <Typography
                key={item.id}
                variant="body1"
                sx={{ mb: 1, color: ok ? 'success.main' : 'error.main' }}
              >
                Задание {index + 1}:{' '}
                {item.type === 'C' || item.type === 'X'
                  ? ok
                    ? 'верно'
                    : 'неверно'
                  : `верно ${r.correct} из ${r.total}`}
              </Typography>
            );
          })}
        </Paper>
      )}
    </Container>
  );
}
