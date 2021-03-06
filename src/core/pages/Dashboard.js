import { $ } from "../dom";
import { createAllRecords } from "./dashboard.functions";
import { Page } from "./Page";

export class Dashboard extends Page {
    getRoot() {
        const now = Date.now().toString().replace(':', '/');
        
        return $.create('div', 'db').html(`

            <div class='db__header'>
                <h1>Excel Dashboard</h1>
            </div>

            <div class="db__new">
                <div class="db__view">
                    <a href="#excel/${now}" class="db__create">
                        Новая <br/>Таблица
                    </a>
                </div>
            </div>

            <div class="db__table db__view">
            ${createAllRecords()}
            </div>

        `)
    }
}