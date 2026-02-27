const createSortArr = (form) => {
    let sortArr = [];
    const selects = form.getElementsByTagName('select');

    for (const item of selects) {
        const keySort = item.value;
        if (keySort == 0) break;

        const desc = document.getElementById(item.id + 'Desc').checked;

        sortArr.push({
            column: Number(keySort) - 1,
            direction: desc
        });
    }

    return sortArr;
};

const getCellValue = (cell) => {
    const raw = (cell.textContent ?? "").trim();
    const num = parseFloat(raw);
    if (!Number.isNaN(num) && isFinite(num)) {
        return num;
    }

    return raw.toLowerCase();
};

const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);
    if (sortArr.length === 0) return;

    const table = document.getElementById(idTable);
    const tbody = table.querySelector('tbody');

    if (!tbody) return;

    let rows = Array.from(tbody.rows);

    rows.sort((a, b) => {
        for (const { column, direction } of sortArr) {
            const aVal = getCellValue(a.cells[column]);
            const bVal = getCellValue(b.cells[column]);

            let cmp = 0;

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                cmp = aVal - bVal;
            } else {
                cmp = String(aVal).localeCompare(String(bVal), 'ru');
            }

            if (cmp !== 0) return direction ? -cmp : cmp;
        }
        return 0;
    });

    tbody.innerHTML = "";
    rows.forEach(r => tbody.append(r));
};
