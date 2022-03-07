import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePaginate from 'vue-paginate'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap 4 (CSS y JS) 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Archivo CSS de Bootstrap 4 
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4 
//inicializa la app,seleccionamos la librerias,renderiza en el componente app
createApp(App).use(store).use(VuePaginate).use(router).mount('#app')

