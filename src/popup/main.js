
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import apps from './components/app.vue';

const app = createApp(apps)

app.use(ElementPlus)
app.mount('#app')