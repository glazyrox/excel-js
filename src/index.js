import { Router } from './core/routes/Router';
import { Dashboard } from './core/pages/Dashboard';
import { ExcelPage } from './core/pages/ExcelPage';
import './scss/index.scss';

new Router('#app', {
    dashboard: Dashboard,
    excel: ExcelPage
});
