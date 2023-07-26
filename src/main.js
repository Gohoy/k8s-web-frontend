import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import Cookies from 'js-cookie';
axios.defaults.baseURL = "http://localhost:8080/"

axios.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    const username = Cookies.get('username');
    if (token) {
        config.headers['Authorization'] = token;
    }

    if (username) {
        config.headers['X-Username'] = username;
    }

    config.headers['Referrer-Policy'] = 'no-referrer'
    return config;
});
const app = createApp(App);
app.config.globalProperties.$axios = axios
app.config.globalProperties.$http = axios
app.config.globalProperties.$cookies = Cookies;
app.use(ElementPlus).use(router).mount('#app')
