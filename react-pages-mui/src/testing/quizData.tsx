export interface Task {
  question: string;
  answer: string | boolean;
}

export interface Quiz {
  id: number;
  type: 'M' | 'S' | 'C' | 'X';
  title: string;
  tasks: Task[];
}

export const quiz: Quiz[] = [
  {
    id: 1,
    type: 'M',
    title: 'Сопоставьте вершину и её высоту (м).',
    tasks: [
      { question: 'Эльбрус', answer: '5642' },
      { question: 'Дыхтау', answer: '5204' },
      { question: 'Казбек', answer: '5032' },
      { question: 'Ключевская Сопка', answer: '4750' },
    ],
  },
  {
    id: 2,
    type: 'M',
    title: 'Сопоставьте вершину и регион, в котором она расположена.',
    tasks: [
      { question: 'Эльбрус', answer: 'Кабардино-Балкария' },
      { question: 'Казбек', answer: 'Северная Осетия' },
      { question: 'Ключевская Сопка', answer: 'Камчатский край' },
    ],
  },
  {
    id: 3,
    type: 'S',
    title: 'Расположите вершины в порядке убывания высоты (от самой высокой).',
    tasks: [
      { question: 'Эльбрус', answer: '1' },
      { question: 'Дыхтау', answer: '2' },
      { question: 'Коштантау', answer: '3' },
      { question: 'Казбек', answer: '4' },
      { question: 'Ключевская Сопка', answer: '5' },
    ],
  },
  {
    id: 4,
    type: 'S',
    title: 'Расположите вершины в порядке возрастания высоты (от самой низкой).',
    tasks: [
      { question: 'Уилпата', answer: '1' },
      { question: 'Ключевская Сопка', answer: '2' },
      { question: 'Джимара', answer: '3' },
      { question: 'Казбек', answer: '4' },
    ],
  },
  {
    id: 5,
    type: 'C',
    title: 'Какая вершина является самой высокой в России?',
    tasks: [
      { question: 'Дыхтау', answer: false },
      { question: 'Эльбрус', answer: true },
      { question: 'Казбек', answer: false },
      { question: 'Ключевская Сопка', answer: false },
    ],
  },
  {
    id: 6,
    type: 'X',
    title: 'Какие из перечисленных вершин являются вулканами? (выберите все)',
    tasks: [
      { question: 'Эльбрус', answer: true },
      { question: 'Дыхтау', answer: false },
      { question: 'Казбек', answer: true },
      { question: 'Шхара', answer: false },
      { question: 'Ключевская Сопка', answer: true },
    ],
  },
];
