import { useState } from "react";
import { mountains, COLUMNS } from "./data.js";
import FilterPanel from "./components/FilterPanel.jsx";
import SortPanel from "./components/SortPanel.jsx";
import Pagination from "./components/Pagination.jsx";

const PAGE_SIZES = [5, 10, 20, 50];

export default function App() {
    const [filtered, setFiltered] = useState(mountains);
    const [sorted, setSorted] = useState(mountains);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleFilter = (result) => {
        setFiltered(result);
        setSorted(result);
        setPage(1);
    };

    const handleSort = (result) => {
        setSorted(result);
        setPage(1);
    };

    const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
    const currentPage = Math.min(page, pageCount);
    const pageRows = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="container-fluid px-md-5 my-4">
            <h1 className="mb-4">Список гор</h1>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <FilterPanel rows={mountains} onChange={handleFilter} />
                </div>
                <div className="col-lg-6 mb-4">
                    <SortPanel rows={filtered} onChange={handleSort} />
                </div>
            </div>

            <div className="d-flex flex-wrap align-items-center justify-content-between mb-2 gap-2">
                <div className="text-muted">Найдено: {filtered.length} из {mountains.length}</div>
                <div className="d-flex align-items-center gap-2">
                    <label className="form-label mb-0">Записей на странице:</label>
                    <select className="form-select form-select-sm" style={{ width: "auto" }}
                        value={pageSize}
                        onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
                        {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>{COLUMNS.map(c => <th key={c}>{c}</th>)}</tr>
                    </thead>
                    <tbody>
                        {pageRows.length === 0 ? (
                            <tr>
                                <td colSpan={COLUMNS.length} className="text-center text-muted">
                                    Ничего не найдено
                                </td>
                            </tr>
                        ) : (
                            pageRows.map(row => (
                                <tr key={row["Место"]}>
                                    {COLUMNS.map(c => <td key={c}>{row[c]}</td>)}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination page={currentPage} pageCount={pageCount} onPage={setPage} />

            <hr className="my-4" />
            <div className="text-center mb-3">
                <a href="https://edwardcode.net/">Эдуард Ильин</a>, Б9123-09.03.04
            </div>
        </div>
    );
}
