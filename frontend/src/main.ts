import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { Table, Tag, Button, Input, Tooltip, Spin, Result } from 'ant-design-vue';

if (!process.env.BACKEND_URL) throw new Error('Отсутствует BACKEND_URL в переменных окружения');

const app = createApp(App);
app.use(Input).use(Table).use(Tag).use(Button).use(Tooltip).use(Spin).use(Result);
app.mount('#app');
