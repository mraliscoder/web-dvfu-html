export default function FilterPanel({ filter, onChange, onReset }) {
    const set = (key) => (e) => onChange(key, e.target.value);

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
                <button className="btn btn-secondary" onClick={onReset}>Сбросить фильтр</button>
            </div>
        </div>
    );
}
