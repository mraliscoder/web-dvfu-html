export default function Pagination({ page, pageCount, onPage }) {
    if (pageCount <= 1) return null;

    // Окно из страниц вокруг текущей.
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(pageCount, page + 2);
    for (let p = start; p <= end; p++) pages.push(p);

    const item = (key, label, targetPage, disabled, active) => (
        <li key={key} className={"page-item" + (disabled ? " disabled" : "") + (active ? " active" : "")}>
            <button className="page-link" onClick={() => onPage(targetPage)}>{label}</button>
        </li>
    );

    return (
        <nav>
            <ul className="pagination justify-content-center mb-0">
                {item("first", "«", 1, page === 1)}
                {item("prev", "‹", page - 1, page === 1)}
                {start > 1 && <li className="page-item disabled"><span className="page-link">…</span></li>}
                {pages.map(p => item(p, p, p, false, p === page))}
                {end < pageCount && <li className="page-item disabled"><span className="page-link">…</span></li>}
                {item("next", "›", page + 1, page === pageCount)}
                {item("last", "»", pageCount, page === pageCount)}
            </ul>
        </nav>
    );
}
