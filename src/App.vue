<template>
<!-- <img alt="Vue logo" src="./assets/logo.png"> -->
 <DemoCargo />
</template>

<script>
//import PortsView from '../src/views/PortsView.vue'
import DemoCargo from './views/DemoCargo.vue'

export default {
  name: 'App',
  components: {
    //PortsView
    DemoCargo
  }
}
</script>
<style>
#app {
  background-attachment: fixed;
background-image: linear-gradient(rgba(255,255,255,0.9),rgba(255,255,255,0.9),rgba(255,255,255,1)),  url('https://cargofive.com/wp-content/uploads/2018/07/logo.svg');
background-repeat: no-repeat;
background-position: center!important;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>