import { useState } from "react";
import { SORT_FIELDS } from "../data.js";

const LABELS = ["Первый уровень", "Второй уровень", "Третий уровень"];
const EMPTY_SORT = [
    { field: "", desc: false },
    { field: "", desc: false },
    { field: "", desc: false },
];

function compareBy(a, b, field) {
    const av = a[field], bv = b[field];
    if (typeof av === "number" && typeof bv === "number") return av - bv;
    return String(av).localeCompare(String(bv), "ru");
}

function applySort(rows, levels) {
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

function SortLevel({ label, level, used, onChange }) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}:</label>
            <div className="input-group">
                <select
                    className="form-select"
                    value={level.field}
                    onChange={e => onChange({ ...level, field: e.target.value })}
                >
                    <option value="">Нет</option>
                    {SORT_FIELDS.map(f => (
                        <option key={f} value={f} disabled={used.includes(f) && level.field !== f}>
                            {f}
                        </option>
                    ))}
                </select>
                <div className="input-group-text">
                    <input
                        type="checkbox"
                        className="form-check-input mt-0"
                        checked={level.desc}
                        disabled={level.field === ""}
                        onChange={e => onChange({ ...level, desc: e.target.checked })}
                    />
                    <span className="ms-2">по убыванию?</span>
                </div>
            </div>
        </div>
    );
}

export default function SortPanel({ rows, onChange }) {
    const [sort, setSort] = useState(EMPTY_SORT);

    const changeLevel = (index, newLevel) => {
        const next = sort.map((l, i) => (i === index ? newLevel : l));
        if (newLevel.field === "") {
            for (let i = index + 1; i < next.length; i++) next[i] = { field: "", desc: false };
        }
        setSort(next);
        onChange(applySort(rows, next));
    };

    const reset = () => {
        setSort(EMPTY_SORT);
        onChange(rows);
    };

    const used = sort.map(l => l.field).filter(Boolean);

    return (
        <div className="card h-100">
            <div className="card-header"><h5 className="mb-0">Сортировка</h5></div>
            <div className="card-body">
                {sort.map((level, i) => (
                    <SortLevel
                        key={i}
                        label={LABELS[i]}
                        level={level}
                        used={used}
                        onChange={l => changeLevel(i, l)}
                    />
                ))}
                <button className="btn btn-secondary" onClick={reset}>Сбросить сортировку</button>
            </div>
        </div>
    );
}
