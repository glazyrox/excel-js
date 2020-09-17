import { storage } from "../utils";

export function toHTML(tableItem) {
    const { id, title } = tableItem;
    
    return `
        <li class="db__record">
            <a href="#${id}">${title}</a>
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

export const getTitle = (key) => {
}

export function createAllRecords() {
    const tablesKeys = getParamsFromLocalStore();
    
    if (!tablesKeys.length) {
        return `<p>Вы пока не создали ни одной таблицы</p>`
    }

    const tablesList = tablesKeys.map(id => {
        const { title } = storage(id);

        return {
            id,
            title,
        }
    })

    return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${tablesList.map(toHTML).join('')}
    </ul>
    `
}