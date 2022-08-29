import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

/* @router */
import router from './router/index'

/* @store */
import store from './store'

/* @primevue */
//primeVue Config
import PrimeVue from 'primevue/config'
//primevue themes
import 'primevue/resources/themes/tailwind-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

/* @vueToast */
import VueToast from 'vue-toast-notification'
//vuetoast theme
import 'vue-toast-notification/dist/theme-sugar.css'

/* @layouts */
import AppLayout from './layouts/AppLayout.vue'
import Container from './components/Container.vue'
import Modal from './components/Modal.vue'
import ProgressSpinner from 'primevue/progressspinner'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

/* socket IO */
/* import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

const socket = io('http://10.15.20.184:5000') */

createApp(App)
    .use(router)
    .use(store)
    .use(VueToast)
    .use(PrimeVue)
    /*     .use(VueSocketIOExt, socket) */
    .use(ToastService)
    .component('AppLayout', AppLayout)
    .component('Container', Container)
    .component('Modal', Modal)
    .component('Toast', Toast)
    .component('ProgressSpinner', ProgressSpinner)
    .mount('#app')
