import { createApp } from 'vue'
import App from './App.vue'
import Particles from 'particles.vue3';
// 引入可视化图表
import * as echarts from 'echarts';
// 引入ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 引入路由
import router from "./router/index"

let app = createApp(App)
app.echarts = echarts
app.config.productionTip = false
app.use(Particles).use(router)
app.use(Antd)
app.mount('#app');

