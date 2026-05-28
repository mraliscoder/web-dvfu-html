import { useMemo, useState } from "react";
import * as d3 from "d3";
import ChartDraw from "./ChartDraw.jsx";

// Поля, по которым можно группировать (категориальные).
const GROUP_FIELDS = ["Система", "Тип", "Регион"];
const CHART_TYPES = ["Точечная диаграмма", "Столбчатая диаграмма"];

// Описание серий по оси OY (агрегаты высоты внутри группы).
const SERIES = {
    max: { key: "max", label: "Максимальная высота", color: "#d6336c" },
    min: { key: "min", label: "Минимальная высота", color: "#1c7ed6" },
};

// Группировка строк по выбранному полю + агрегаты min/max высоты.
function groupData(rows, field) {
    const groups = d3.group(rows, d => d[field]);
    const arr = [];
    for (const [labelX, items] of groups) {
        const [min, max] = d3.extent(items, d => d["Высота"]);
        arr.push({ labelX, values: { min, max }, count: items.length });
    }
    // Сортируем категории по максимуму, чтобы диаграмма читалась слева направо.
    arr.sort((a, b) => b.values.max - a.values.max);
    return arr;
}

export default function Chart({ data }) {
    const [field, setField] = useState("Система");
    const [oy, setOy] = useState({ max: true, min: false });
    const [type, setType] = useState("Столбчатая диаграмма");
    const [error, setError] = useState("");

    // Применённые настройки (меняются только по кнопке «Построить»).
    const [applied, setApplied] = useState({
        field: "Система",
        oy: { max: true, min: false },
        type: "Столбчатая диаграмма",
    });

    const grouped = useMemo(() => groupData(data, applied.field), [data, applied.field]);
    const series = useMemo(
        () => Object.keys(SERIES).filter(k => applied.oy[k]).map(k => SERIES[k]),
        [applied.oy]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!oy.max && !oy.min) {
            setError("Выберите хотя бы одно значение по оси OY.");
            return;
        }
        setError("");
        setApplied({ field, oy, type });
    };

    return (
        <div className="card mb-4">
            <div className="card-header"><h5 className="mb-0">Диаграмма по сгруппированным данным</h5></div>
            <div className="card-body">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Группировать по (ось OX):</label>
                                <select className="form-select" value={field}
                                    onChange={e => setField(e.target.value)}>
                                    {GROUP_FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label d-block">Значения по оси OY:</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="oy-max"
                                        checked={oy.max}
                                        onChange={e => setOy(p => ({ ...p, max: e.target.checked }))} />
                                    <label className="form-check-label" htmlFor="oy-max">Максимальная высота</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="oy-min"
                                        checked={oy.min}
                                        onChange={e => setOy(p => ({ ...p, min: e.target.checked }))} />
                                    <label className="form-check-label" htmlFor="oy-min">Минимальная высота</label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Тип диаграммы:</label>
                                <select className="form-select" value={type}
                                    onChange={e => setType(e.target.value)}>
                                    {CHART_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            {error && <div className="alert alert-danger py-2">{error}</div>}
                            <button type="submit" className="btn btn-primary">Построить</button>
                        </form>
                    </div>

                    <div className="col-lg-8">
                        {grouped.length === 0 ? (
                            <p className="text-muted">Нет данных для построения диаграммы.</p>
                        ) : (
                            <ChartDraw data={grouped} series={series} type={applied.type} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
