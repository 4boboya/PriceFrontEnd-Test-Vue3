import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Component from "./components"
import './styles/app.scss'
import Directive from './directive'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const app = createApp(App).use(store).use(router)

app.component('icon', FontAwesomeIcon)
app.component('Header', Component.Header)
app.component('ISingin', Component.ISingin)
app.component('HotGame', Component.HotGame)
app.component('Footer', Component.Footer)
app.component('Chat', Component.Chat)
app.component('SideBar', Component.SideBar)

Directive(app)

app.mount('#app')
