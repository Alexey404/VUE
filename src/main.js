import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import components from './components/UI/indexUI'

const app = createApp(App)

components.forEach(component => app.component(component.name, component))

app.use(store).use(components).mount('#app')
