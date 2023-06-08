import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import components from './components/UI/indexUI'
import router from './router/router'

const app = createApp(App)

components.forEach(component => app.component(component.name, component))

app.use(store).use(components).use(router).mount('#app')
