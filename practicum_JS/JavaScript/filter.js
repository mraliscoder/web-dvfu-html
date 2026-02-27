const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
};

const dataFilter = (dataForm) => {
    let dictFilter = {};

    for (const item of dataForm.elements) {
        if (item.tagName === "BUTTON" || item.type === "button" || item.type === "submit" || item.type === "reset") {
            continue;
        }

        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.trim().toLowerCase();
        }

        if (item.type === "number") {
            const trimmed = String(valInput).trim();

            if (trimmed !== "") {
                valInput = Number(trimmed);
            } else {
                if (item.id.includes("From")) {
                    valInput = -Infinity;
                }
                else if (item.id.includes("To")) {
                    valInput = Infinity;
                } else {
                    valInput = NaN;
                }
            }
        }

        dictFilter[item.id] = valInput;
    }

    return dictFilter;
};

const showHeaderOnly = (data, idTable) => {
    const table = document.getElementById(idTable);
    table.innerHTML = "";

    const headers = Object.keys(data[0]);
    const headerRow = createHeaderRow(headers);
    table.append(headerRow);
};

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {
        let result = true;
        Object.entries(item).forEach(([key, val]) => {
            if (typeof val === "string") {
                const inputId = correspond[key];
                const filterVal = (datafilter[inputId] ?? "").toString();

                if (filterVal !== "") {
                    result &&= val.toLowerCase().includes(filterVal);
                }
            }

            if (typeof val === "number") {
                const ids = correspond[key];
                const fromId = ids[0];
                const toId = ids[1];

                const fromVal = datafilter[fromId];
                const toVal = datafilter[toId];

                result &&= (val >= fromVal && val <= toVal);
            }
        });

        return result;
    });

    const table = document.getElementById(idTable);
    table.innerHTML = "";

    if (tableFilter.length === 0) {
        showHeaderOnly(data, idTable);
        return;
    }

    createTable(tableFilter, idTable);
};

const clearFilter = (idTable, data, dataForm) => {
    for (const item of dataForm.elements) {
        if (item.tagName === "BUTTON" || item.type === "button" || item.type === "submit" || item.type === "reset") {
            continue;
        }
        item.value = "";
    }

    const table = document.getElementById(idTable);
    table.innerHTML = "";
    createTable(data, idTable);
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("filter");
    const btnFind = document.getElementById("btnFind");
    const btnClear = document.getElementById("btnClear");
    const tableId = "list";

    createTable(buildings, tableId);

    btnFind.addEventListener("click", (e) => {
        e.preventDefault();
        filterTable(buildings, tableId, form);
    });

    btnClear.addEventListener("click", (e) => {
        e.preventDefault();
        clearFilter(tableId, buildings, form);
    });
});