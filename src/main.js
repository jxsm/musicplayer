import { createApp } from 'vue'
import App from './App.vue'
import "./css/main.css"

let app =  createApp(App)

app.config.warnHandler = () => null;

app.mount('#app')
