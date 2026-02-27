const createHeaderRow = (headers) => {
    const thead = document.createElement("thead");

    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });
    
    thead.append(tr);
    return thead;
};

const createBodyRows = (data) => {
    const tbody = document.createElement('tbody');

    data.forEach(item => {
        const tr = document.createElement('tr');

        Object.values(item).forEach(val => {
            const td = document.createElement('td');
            td.innerHTML = val;
            tr.append(td);
        });

        tbody.append(tr);
    });

    return tbody;
};

const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    clearTable(idTable);

    if (data.length === 0) {
        const header = Object.keys(mountains[0]);
        table.append(createHeaderRow(header));
        return;
    }

    const header = Object.keys(data[0]);

    table.append(createHeaderRow(header));
    table.append(createBodyRows(data));
};

const clearTable = (idTable) => {
    const table = document.getElementById(idTable);
    table.innerHTML = '';
};
