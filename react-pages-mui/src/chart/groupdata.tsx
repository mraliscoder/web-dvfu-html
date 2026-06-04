import { mountains } from '../data';

export type tGroup = {
  id: number;
  'Группа': string;
  'Минимальная высота': number;
  'Максимальная высота': number;
  'Средняя высота': number;
}[];

// Группируем массив гор по заданному ключу и считаем min/max/avg высоты.
function buildGroup(key: 'system' | 'type' | 'region'): tGroup {
  const buckets = new Map<string, number[]>();
  for (const m of mountains) {
    const groupName = m[key];
    if (!buckets.has(groupName)) buckets.set(groupName, []);
    buckets.get(groupName)!.push(m.height);
  }

  let id = 1;
  const result: tGroup = [];
  for (const [groupName, heights] of buckets) {
    const min = Math.min(...heights);
    const max = Math.max(...heights);
    const avg = heights.reduce((s, h) => s + h, 0) / heights.length;
    result.push({
      id: id++,
      'Группа': groupName,
      'Минимальная высота': min,
      'Максимальная высота': max,
      'Средняя высота': Math.round(avg),
    });
  }
  // Сортируем по убыванию максимальной высоты для удобства чтения диаграммы.
  result.sort((a, b) => b['Максимальная высота'] - a['Максимальная высота']);
  return result.map((row, i) => ({ ...row, id: i + 1 }));
}

export const systems: tGroup = buildGroup('system');
export const types: tGroup = buildGroup('type');
export const regions: tGroup = buildGroup('region');
