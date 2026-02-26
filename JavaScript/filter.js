const correspond = {
    "Название": "name",
    "Высота": ["heightFrom", "heightTo"],
    "Система": "system",
    "Тип": "type",
    "Регион": "region"
};

const dataFilter = (dataForm) => {
    let dictFilter = {};
    for (const item of dataForm.elements) {
        if (!item.id) continue;
        let valInput = item.value;
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        }
        if (item.type === "number") {
            if (valInput !== "") {
                valInput = Number(valInput);
            } else {
                if (item.id.includes("From")) valInput = -Infinity;
                if (item.id.includes("To")) valInput = Infinity;
            }
        }
        dictFilter[item.id] = valInput;
    }

    return dictFilter;
};

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);
    console.log('Filter values:', datafilter);

    let tableFilter = data.filter(item => {
        let result = true;
        Object.entries(item).forEach(([key, val]) => {
            const mapping = correspond[key];
            if (mapping === undefined) return; // Skip fields not in correspond

            if (typeof val === "string" && typeof mapping === "string") {
                const filterVal = datafilter[mapping] || "";
                result &&= val.toLowerCase().includes(filterVal);
            }
            if (typeof val === "number" && Array.isArray(mapping)) {
                const [from, to] = mapping;
                const fromVal = datafilter[from] ?? -Infinity;
                const toVal = datafilter[to] ?? Infinity;
                result &&= val >= fromVal && val <= toVal;
            }
        });

        return result;
    });

    console.log('Filtered results:', tableFilter.length);
    createTable(tableFilter, idTable);
};

const clearFilter = (idTable, data, form) => {
    form.reset();
    createTable(data, idTable);
};
