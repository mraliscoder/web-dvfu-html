import { useState } from "react";

const EMPTY_FILTER = { name: "", heightFrom: "", heightTo: "", system: "", type: "", region: "" };

function applyFilter(rows, filter) {
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

export default function FilterPanel({ rows, onChange }) {
    const [filter, setFilter] = useState(EMPTY_FILTER);

    const set = (key) => (e) => {
        const next = { ...filter, [key]: e.target.value };
        setFilter(next);
        onChange(applyFilter(rows, next));
    };

    const reset = () => {
        setFilter(EMPTY_FILTER);
        onChange(rows);
    };

    return (
        <div className="card h-100">
            <div className="card-header"><h5 className="mb-0">Фильтр</h5></div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Название:</label>
                    <input type="text" className="form-control"
                        value={filter.name} onChange={set("name")} />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Высота от:</label>
                        <input type="number" className="form-control" placeholder="От"
                            value={filter.heightFrom} onChange={set("heightFrom")} />
                    </div>
                    <div className="col">
                        <label className="form-label">до:</label>
                        <input type="number" className="form-control" placeholder="До"
                            value={filter.heightTo} onChange={set("heightTo")} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Горная система:</label>
                    <input type="text" className="form-control"
                        value={filter.system} onChange={set("system")} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Тип вершины:</label>
                    <input type="text" className="form-control"
                        value={filter.type} onChange={set("type")} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Регион:</label>
                    <input type="text" className="form-control"
                        value={filter.region} onChange={set("region")} />
                </div>
                <button className="btn btn-secondary" onClick={reset}>Сбросить фильтр</button>
            </div>
        </div>
    );
}
