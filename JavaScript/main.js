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

    // Reset checkboxes
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
        .addEventListener('click', () =>
            filterTable(mountains, 'list', filterForm)
        );

    document.getElementById('clearFilterBtn')
        .addEventListener('click', () =>
            clearFilter('list', mountains, filterForm)
        );

    document.getElementById('sortBtn')
        .addEventListener('click', () =>
            sortTable('list', sortForm)
        );

    document.getElementById('resetSortBtn')
        .addEventListener('click', () => {
            setSortSelects(mountains[0], sortForm);
            createTable(mountains, 'list');
        });
});
