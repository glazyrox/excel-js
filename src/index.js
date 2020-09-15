import { Router } from './core/routes/Router';
import { Dashboard } from './core/page/Dashboard';
import { ExcelPage } from './core/page/ExcelPage';
import './scss/index.scss';

new Router('#app', {
    dashboard: Dashboard,
    excel: ExcelPage
});
