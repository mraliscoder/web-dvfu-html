import { useMemo, useState } from "react";
import { mountains, COLUMNS } from "./data.js";
import { applyFilter, applySort } from "./utils.js";
import FilterPanel from "./components/FilterPanel.jsx";
import SortPanel from "./components/SortPanel.jsx";
import Pagination from "./components/Pagination.jsx";
import Chart from "./components/Chart.jsx";

const PAGE_SIZES = [5, 10, 20, 50];
const EMPTY_FILTER = { name: "", heightFrom: "", heightTo: "", system: "", type: "", region: "" };
const EMPTY_SORT = [
    { field: "", desc: false },
    { field: "", desc: false },
    { field: "", desc: false },
];

export default function App() {
    const [filter, setFilter] = useState(EMPTY_FILTER);
    const [sort, setSort] = useState(EMPTY_SORT);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Пайплайн: фильтр -> сортировка (исходный массив не мутируется).
    const processed = useMemo(() => {
        const filtered = applyFilter(mountains, filter);
        return applySort(filtered, sort);
    }, [filter, sort]);

    const pageCount = Math.max(1, Math.ceil(processed.length / pageSize));
    const currentPage = Math.min(page, pageCount);
    const pageRows = processed.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const setFilterField = (key, value) => {
        setFilter(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const setSortLevel = (index, newLevel) => {
        setSort(prev => {
            const next = prev.map((l, i) => (i === index ? newLevel : l));
            // Сброс поля уровня сбрасывает и последующие уровни.
            if (newLevel.field === "") {
                for (let i = index + 1; i < next.length; i++) next[i] = { field: "", desc: false };
            }
            return next;
        });
        setPage(1);
    };

    const resetFilter = () => { setFilter(EMPTY_FILTER); setPage(1); };
    const resetSort = () => { setSort(EMPTY_SORT); setPage(1); };

    return (
        <div className="container-fluid px-md-5 my-4">
            <h1 className="mb-4">Список гор (React)</h1>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <FilterPanel filter={filter} onChange={setFilterField} onReset={resetFilter} />
                </div>
                <div className="col-lg-6 mb-4">
                    <SortPanel sort={sort} onChangeLevel={setSortLevel} onReset={resetSort} />
                </div>
            </div>

            <div className="d-flex flex-wrap align-items-center justify-content-between mb-2 gap-2">
                <div className="text-muted">Найдено: {processed.length} из {mountains.length}</div>
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
            <Chart data={processed} />

            <hr className="my-4" />
            <div className="text-center mb-3">
                <a href="https://edwardcode.net/">Эдуард Ильин</a>, Б9123-09.03.04
            </div>
        </div>
    );
}
