import { createApp } from 'vue'
import App from './App.vue'


let app =  createApp(App)

app.config.warnHandler = () => null;

app.mount('#app')
