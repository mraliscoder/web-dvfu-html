// Сравнение результатов React-логики (src/utils.js) с исходной vanilla-логикой
// из ЛР 2 (JavaScript/filter.js + JavaScript/sort.js).
//
// Запуск: node test/compare.mjs
import { mountains, SORT_FIELDS } from "../src/data.js";
import { applyFilter, applySort } from "../src/utils.js";

// ---------- Эталон: точный порт исходной vanilla-логики ----------

// filter.js: текст -> includes(lowercased), число -> диапазон [from..to].
function refFilter(rows, filter) {
    const correspondText = {
        "Название": "name",
        "Система": "system",
        "Тип": "type",
        "Регион": "region",
    };
    const d = {
        name: filter.name.toLowerCase(),
        system: filter.system.toLowerCase(),
        type: filter.type.toLowerCase(),
        region: filter.region.toLowerCase(),
        heightFrom: filter.heightFrom === "" ? -Infinity : Number(filter.heightFrom),
        heightTo: filter.heightTo === "" ? Infinity : Number(filter.heightTo),
    };

    return rows.filter(item => {
        let result = true;
        for (const [key, val] of Object.entries(item)) {
            if (typeof val === "string" && correspondText[key]) {
                result &&= val.toLowerCase().includes(d[correspondText[key]] || "");
            }
            if (key === "Высота") {
                result &&= val >= d.heightFrom && val <= d.heightTo;
            }
        }
        return result;
    });
}

// sort.js: getCellValue (parseFloat иначе lowercase) + многоуровневое localeCompare 'ru'.
function refCellValue(val) {
    const raw = String(val).trim();
    const num = parseFloat(raw);
    if (!Number.isNaN(num) && isFinite(num)) return num;
    return raw.toLowerCase();
}

function refSort(rows, levels) {
    const active = levels.filter(l => l.field !== "");
    if (active.length === 0) return rows;

    return [...rows].sort((a, b) => {
        for (const { field, desc } of active) {
            const aVal = refCellValue(a[field]);
            const bVal = refCellValue(b[field]);
            let cmp = 0;
            if (typeof aVal === "number" && typeof bVal === "number") {
                cmp = aVal - bVal;
            } else {
                cmp = String(aVal).localeCompare(String(bVal), "ru");
            }
            if (cmp !== 0) return desc ? -cmp : cmp;
        }
        return 0;
    });
}

// ---------- Утилиты сравнения ----------

const key = (rows) => rows.map(r => r["Место"]).join(",");

let passed = 0, failed = 0;
const failures = [];

function check(label, a, b) {
    const ka = key(a), kb = key(b);
    if (ka === kb) {
        passed++;
    } else {
        failed++;
        failures.push({ label, react: ka, ref: kb });
    }
}

// ---------- Сценарии фильтрации ----------
const blank = { name: "", heightFrom: "", heightTo: "", system: "", type: "", region: "" };

const filterCases = [
    ["пустой фильтр", blank],
    ["name=пик", { ...blank, name: "пик" }],
    ["name=ПИК (регистр)", { ...blank, name: "ПИК" }],
    ["высота 4500..5000", { ...blank, heightFrom: "4500", heightTo: "5000" }],
    ["только heightFrom=5000", { ...blank, heightFrom: "5000" }],
    ["только heightTo=4200", { ...blank, heightTo: "4200" }],
    ["система=кавказ", { ...blank, system: "кавказ" }],
    ["тип=вулкан", { ...blank, type: "вулкан" }],
    ["регион=осетия", { ...blank, region: "осетия" }],
    ["комбо: вулкан + камчатка", { ...blank, type: "вулкан", region: "камчат" }],
    ["ничего не найдено", { ...blank, name: "zzz" }],
];

for (const [label, f] of filterCases) {
    check(`filter[${label}]`, applyFilter(mountains, f), refFilter(mountains, f));
}

// ---------- Сценарии сортировки (включая 3 уровня) ----------
const L = (field, desc = false) => ({ field, desc });
const none = L("");

const sortCases = [
    ["нет сортировки", [none, none, none]],
    ["Высота ASC", [L("Высота"), none, none]],
    ["Высота DESC", [L("Высота", true), none, none]],
    ["Название ASC", [L("Название"), none, none]],
    ["Название DESC", [L("Название", true), none, none]],
    ["Регион, затем Высота DESC", [L("Регион"), L("Высота", true), none]],
    ["Система, Тип, Высота DESC (3 уровня)", [L("Система"), L("Тип"), L("Высота", true)]],
    ["Регион DESC, Название ASC", [L("Регион", true), L("Название"), none]],
    ["Тип, Регион, Название (3 уровня)", [L("Тип"), L("Регион"), L("Название")]],
];

for (const [label, levels] of sortCases) {
    check(`sort[${label}]`, applySort(mountains, levels), refSort(mountains, levels));
}

// ---------- Комбинированный пайплайн фильтр -> сортировка ----------
for (const [flabel, f] of filterCases) {
    for (const [slabel, levels] of sortCases) {
        const react = applySort(applyFilter(mountains, f), levels);
        const ref = refSort(refFilter(mountains, f), levels);
        check(`pipe[${flabel} | ${slabel}]`, react, ref);
    }
}

// ---------- Проверка иммутабельности исходных данных ----------
const before = key(mountains);
applySort(mountains, [L("Высота", true), L("Название"), none]);
const after = key(mountains);
if (before === after) passed++;
else { failed++; failures.push({ label: "иммутабельность mountains", react: after, ref: before }); }

// ---------- Отчёт ----------
console.log(`\nВсего проверок: ${passed + failed}`);
console.log(`  PASS: ${passed}`);
console.log(`  FAIL: ${failed}`);

if (failures.length) {
    console.log("\nРасхождения:");
    for (const f of failures) {
        console.log(`\n  ● ${f.label}`);
        console.log(`    React: ${f.react}`);
        console.log(`    Ref:   ${f.ref}`);
    }
    process.exit(1);
} else {
    console.log("\n✓ React-логика полностью совпадает с исходной vanilla-логикой ЛР 2.");
}
