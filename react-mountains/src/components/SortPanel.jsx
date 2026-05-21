import { SORT_FIELDS } from "../data.js";

const LABELS = ["Первый уровень", "Второй уровень", "Третий уровень"];

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
                        // Поля, выбранные на других уровнях, недоступны.
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

export default function SortPanel({ sort, onChangeLevel, onReset }) {
    const used = sort.map(l => l.field).filter(Boolean);

    return (
        <div className="card h-100">
            <div className="card-header"><h5 className="mb-0">Сортировка (3 уровня)</h5></div>
            <div className="card-body">
                {sort.map((level, i) => (
                    <SortLevel
                        key={i}
                        label={LABELS[i]}
                        level={level}
                        used={used}
                        onChange={l => onChangeLevel(i, l)}
                    />
                ))}
                <button className="btn btn-secondary" onClick={onReset}>Сбросить сортировку</button>
            </div>
        </div>
    );
}
