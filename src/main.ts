import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import './style.css'
import App from './App.vue'
import router from './router'
import vReveal from './directives/reveal'
import vTypewriter from './directives/typewriter'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.directive('reveal', vReveal)
app.directive('typewriter', vTypewriter)
app.mount('#app')
