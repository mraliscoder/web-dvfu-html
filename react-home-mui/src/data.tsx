import Image1 from './images/1.jpg';
import Image2 from './images/2.jpg';
import Image3 from './images/3.jpg';
import Image4 from './images/4.jpg';
import Image5 from './images/5.jpg';
import Image6 from './images/6.jpg';
import Image62 from './images/6-2.jpg';
import Image7 from './images/7.jpg';
import Image8 from './images/8.jpg';
import Image9 from './images/9.jpg';
import Image10 from './images/10.jpg';
import Image11 from './images/11.jpg';
import Image12 from './images/12.jpg';
import Image13 from './images/13.jpg';
import Image14 from './images/14.jpg';

// Изображение для галереи: фото вершины и её название
export interface GalleryItem {
  img: string;
  title: string;
}

// Карточка основного контента: подробное описание вершины
export interface MountainInfo {
  img: string;
  title: string;
  description: string[];
}

// Небольшая карточка вершины в блоке «Другие вершины»
export interface Peak {
  img: string;
  title: string;
  height: number;
  system: string;
}

export const galleryItems: GalleryItem[] = [
  { img: Image1, title: 'Эльбрус' },
  { img: Image2, title: 'Дыхтау' },
  { img: Image3, title: 'Коштантау' },
  { img: Image4, title: 'Пик Пушкина' },
  { img: Image5, title: 'Джангитау' },
  { img: Image6, title: 'Шхара' },
  { img: Image7, title: 'Мижирги' },
  { img: Image8, title: 'Казбек' },
  { img: Image9, title: 'Катын-Тау' },
  { img: Image10, title: 'Шота Руставели' },
  { img: Image11, title: 'Гестола' },
  { img: Image12, title: 'Джимара' },
  { img: Image13, title: 'Ключевская Сопка' },
  { img: Image14, title: 'Уилпата' },
];

export const cards: MountainInfo[] = [
  {
    img: Image5,
    title: 'Джангитау',
    description: [
      `Джангитау (карач.-балк. Джангы тау — «Новая гора»), или Джанга (груз. ჯანღა) — горная вершина в центральной части Главного Кавказского хребта на границе России и Грузии. Высота главной вершины 5085 м. Это пятая по высоте вершина Российской части Кавказа и вторая в Грузии (после Шхары).`,
      `В массиве Джангитау выделяют ещё две вершины: Западную (5058,8 м) и Восточную (5033,6 м), на картах генштаба именуемую как Пик Пушкина. Джангитау находится в центре 13-километрового горного массива, известного под названием Безенгийская стена, и популярна в альпинизме. На вершину проложены маршруты 4Б–5А категории сложности.`,
    ],
  },
  {
    img: Image62,
    title: 'Шхара',
    description: [
      `Шхара (груз. შხარა — «полосатая», карач.-балк. ушхара) — горная вершина в центральной части Главного Кавказского (Водораздельного) хребта, является его высочайшей точкой, а также высочайшей точкой Грузии и второй по высоте горой Европы.`,
      `Высота главной вершины — 5203 м, уточнена в 2010 году альпинистами с помощью приёмника DGPS. В массиве Шхары также выделяют западную вершину (5068,8 м) и восточную вершину (4866,5 м).`,
    ],
  },
];

export const peaks: Peak[] = [
  { img: Image7, title: 'Мижирги', height: 5047, system: 'Большой Кавказ' },
  { img: Image8, title: 'Казбек', height: 5032, system: 'Большой Кавказ' },
  { img: Image9, title: 'Катын-Тау', height: 4970, system: 'Большой Кавказ' },
  { img: Image10, title: 'Шота Руставели', height: 4859, system: 'Большой Кавказ' },
  { img: Image11, title: 'Гестола', height: 4860, system: 'Большой Кавказ' },
  { img: Image12, title: 'Джимара', height: 4780, system: 'Большой Кавказ' },
  { img: Image13, title: 'Ключевская Сопка', height: 4750, system: 'Восточный хребет' },
  { img: Image14, title: 'Уилпата', height: 4646, system: 'Большой Кавказ' },
];
