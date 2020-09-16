export function toHTML() {
    return `
        <li class="db__record">
            <a href="#">Таблица номер 1</a>
            <strong>12.06.2020</strong>
        </li>
    `
}

export function getParamsFromLocalStore() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (!key.includes('excel')) {
            continue
        }

        keys.push(key);
    }

    return keys;
}

export function getRecord() {
    return `<p>Вы пока не создали ни одной таблицы</p>`
}

export function createAllRecords() {
    const tablesKeys = getParamsFromLocalStore();

    if (!tablesKeys.length) {
        return `<p>Вы пока не создали ни одной таблицы</p>`
    }

    return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${tablesKeys.map(toHTML).join('')}
    </ul>
    `
}