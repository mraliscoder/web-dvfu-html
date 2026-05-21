// Фильтрация: подстрока (без учёта регистра) по тексту + диапазон по высоте.
export function applyFilter(rows, filter) {
    const name = filter.name.trim().toLowerCase();
    const system = filter.system.trim().toLowerCase();
    const type = filter.type.trim().toLowerCase();
    const region = filter.region.trim().toLowerCase();
    const from = filter.heightFrom === "" ? -Infinity : Number(filter.heightFrom);
    const to = filter.heightTo === "" ? Infinity : Number(filter.heightTo);

    return rows.filter(r =>
        r["Название"].toLowerCase().includes(name) &&
        r["Система"].toLowerCase().includes(system) &&
        r["Тип"].toLowerCase().includes(type) &&
        r["Регион"].toLowerCase().includes(region) &&
        r["Высота"] >= from && r["Высота"] <= to
    );
}

// Сравнение по полю: числа — численно, строки — с учётом русской локали.
function compareBy(a, b, field) {
    const av = a[field], bv = b[field];
    if (typeof av === "number" && typeof bv === "number") return av - bv;
    return String(av).localeCompare(String(bv), "ru");
}

// Сортировка по трём уровням. levels: [{ field, desc }, ...].
export function applySort(rows, levels) {
    const active = levels.filter(l => l.field !== "");
    if (active.length === 0) return rows;

    return [...rows].sort((a, b) => {
        for (const { field, desc } of active) {
            const cmp = compareBy(a, b, field);
            if (cmp !== 0) return desc ? -cmp : cmp;
        }
        return 0;
    });
}
