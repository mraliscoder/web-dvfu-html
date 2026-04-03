const createOption = (str, val) => {
    let option = document.createElement('option');
    option.text = str;
    option.value = val;
    return option;
};

const setSortSelect = (arr, select) => {
    select.innerHTML = '';
    select.append(createOption('Нет', 0));

    arr.forEach((item, index) => {
        select.append(createOption(item, index + 1));
    });
};

const setSortSelects = (data, form) => {
    const head = Object.keys(data);
    const selects = form.getElementsByTagName('select');

    let index = 0;
    for (const select of selects) {
        setSortSelect(head, select);

        if (index !== 0) {
            select.disabled = true;
        }

        index++;
    }

    document.getElementById('fieldsFirstDesc').checked = false;
    document.getElementById('fieldsSecondDesc').checked = false;
    document.getElementById('fieldsThirdDesc').checked = false;
};

const changeNextSelect = (curSelect, nextSelectId) => {
    const nextSelect = document.getElementById(nextSelectId);
    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value == 0) {
        nextSelect.disabled = true;
        return;
    }

    nextSelect.disabled = false;
    nextSelect.remove(curSelect.value);
};

const groupByKeyMap = {
    system: 'Система',
    type: 'Тип',
    region: 'Регион',
    name: 'Название'
};

document.addEventListener("DOMContentLoaded", () => {
    createTable(mountains, 'list');

    const filterForm = document.getElementById('filter');
    const sortForm = document.getElementById('sort');

    setSortSelects(mountains[0], sortForm);

    document.getElementById('fieldsFirst')
        .addEventListener('change', function() {
            changeNextSelect(this, 'fieldsSecond');
        });

    document.getElementById('fieldsSecond')
        .addEventListener('change', function() {
            changeNextSelect(this, 'fieldsThird');
        });

    document.getElementById('findBtn')
        .addEventListener('click', () => {
            setSortSelects(mountains[0], sortForm);
            createTable(mountains, 'list');
            filterTable(mountains, 'list', filterForm)
        });

    document.getElementById('clearFilterBtn')
        .addEventListener('click', () => {
            setSortSelects(mountains[0], sortForm);
            createTable(mountains, 'list');
            clearFilter('list', mountains, filterForm)
        });

    document.getElementById('sortBtn')
        .addEventListener('click', () =>
            sortTable('list', sortForm)
        );

    document.getElementById('resetSortBtn')
        .addEventListener('click', () => {
            setSortSelects(mountains[0], sortForm);
            createTable(mountains, 'list');
            filterTable(mountains, 'list', filterForm)
        });

    const graphMinCb = document.querySelector('input[name="graph_min"]');
    const graphMaxCb = document.querySelector('input[name="graph_max"]');
    const chartErrorDiv = document.getElementById('chartError');

    [graphMinCb, graphMaxCb].forEach(cb => {
        cb.addEventListener('change', () => {
            if (graphMinCb.checked || graphMaxCb.checked) {
                chartErrorDiv.textContent = '';
            }
        });
    });

    document.getElementById('buildChartBtn')
        .addEventListener('click', () => {
            const showMin = graphMinCb.checked;
            const showMax = graphMaxCb.checked;

            if (!showMin && !showMax) {
                chartErrorDiv.textContent = 'Ошибка: необходимо выбрать хотя бы одно значение для отображения.';
                document.getElementById('mainChart').style.display = 'none';
                return;
            }

            chartErrorDiv.textContent = '';

            const groupByVal = document.querySelector('select[name="group_by"]');
            const keyX = groupByKeyMap[groupByVal.value];
            const chartType = document.getElementById('chartType').value;

            document.getElementById('mainChart').style.display = 'block';
            drawGraph(mountains, keyX, showMin, showMax, chartType);
        });
});
