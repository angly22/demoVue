<!--
INICIO
Maquetado y estructuracion de la pagina-->

<template>
  <div class="container">
    <div class="title" style="margin: 50px">
      <h1>{{ $store.state.msg }}</h1>
    </div>
    <div class="form-group">
      <div class="checkbox-slider">
        <label>Id</label>
        <input type="checkbox" v-model="filterId" @keyup="onchange" />
      </div>
      <div class="checkbox-slider">
        <label>Name</label>
        <input type="checkbox" v-model="filterName" @keyup="onchange" />
      </div>
      <div class="checkbox-slider">
        <label>Country</label>
        <input type="checkbox" v-model="filterCountry" @keyup="onchange" />
      </div>
      <div class="checkbox-slider">
        <label>Continent</label>
        <input type="checkbox" v-model="filterContinent" @keyup="onchange" />
      </div>
      <div class="checkbox-slider">
        <label>Coordinates</label>
        <input type="checkbox" v-model="filterCoordinates" @keyup="onchange" />
      </div>
    </div>

    <div class="form-group">
      <div class="input-group mb-3">
        <input
          id="clean"
          type="text"
          class="form-control"
          v-model="filterField"
          @keyup="onchange"
          placeholder="Writte Here "
          aria-label="Writte Here "
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2"> to Filter</span>
        </div>
      </div>
    </div>
    <div class="button-reset">
      <button v-on:click="resetData()" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-arrow-up-circle"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
          />
        </svg>
        <span>Reset All</span>
      </button>
    </div>
    <div>
      <table class="table mt-3 table-hover" :items="datas" :fields="fields">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">COUNTRY</th>
            <th scope="col">CONTINENT</th>
            <th scope="col">COORDINATES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ports in dataPaginates" v-bind:key="ports.id">
            <!-- <ul v-if="filter(ports)" ></ul> -->
            <td>{{ ports.id }}</td>
            <td>{{ ports.name }}</td>
            <td>{{ ports.country }}</td>
            <td>{{ ports.continent }}</td>
            <td>{{ ports.coordinates }}</td>
          </tr>
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" v-on:click="previousPage()">
            <a class="page-link" href="#">Prev</a>
          </li>
          <li
            v-for="pages in totalPages()"
            v-bind:key="pages.id"
            v-on:click="dataPerPages(pages)"
            class="page-item"
          >
            <a class="page-link" href="#">{{ pages }}</a>
          </li>
          <li class="page-item" v-on:click="nextPage()">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <!--FIN - Maquetado y estructuracion de la pagina-->
</template>

<script>
import axios from "axios"; // importamos para hacer uso de la llamada a la api
// encapsulamos la informacion correspondiente al componente,
// se hace para tener todo dentro del mismo archivo:html,js,stilos
export default {
  name: "DemoCargo",
  //usamos hook(ciclo de vida de un componente), podemos ejecutar cierta logica
  //cuando se esta creando el componente
  //se ejecuta lo que tengamos definido dentro de la funcion, una vez que se cree el componente
  data() {
    return {
      //manejos de estado de forma local
      fields: [
        { id: "id" },
        { name: "name" },
        { country: "country" },
        { continent: "continent" },
        { coordinates: "coordinates" },
      ],

      datas: [], // Creamos este array para almacenar los datos(este es mi estado con toda la info)
      elementsPerpage: 15, //cantidad de elemntos que queremos por pagina
      dataPaginates: [],//almacenamos la informacion por pagina
      currentPage: 1,//indicamos ela pagina actual, donde empezara a mostrar info
      filterField: "",// el input donde vamos a escribir para filtrar
      backup: [], // lo utilizo para guardar la informacion completa y volverla a renderizar
      filterId: false,//filtro por ID-checkbox
      filterName: false,//filtro por name-checkbox
      filterCountry: false,//filtro por country-checkbox
      filterContinent: false,//filtro por continent-checkbox
      filterCoordinates: false,//filtro por coordinates-checkbox
    };
  },
  // iniciamos los metodos que vamos a utilizar dentro de la app
  methods: {
    //total de paginas
    totalPages() {
      return Math.ceil(this.datas.length / this.elementsPerpage);
    },
    //paginado - informacion a mostrar por cada pagina
    dataPerPages(numPage) {
      this.currentPage = numPage; // cada vez que demos click le pasamos el num de pagina en la que estamos y se actualiza la pagina actual
      this.dataPaginates = []; //para que comience en cero y no se acumulen los datos
      let start = numPage * this.elementsPerpage - this.elementsPerpage; //inicio
      let end = numPage * this.elementsPerpage; // fin
      this.dataPaginates = this.datas.slice(start, end);// cortamos la informacion por partes pasandole el inicio y el fin
    },
    previousPage() { //metodo para el boton de prev
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.dataPerPages(this.currentPage); // le pasamos la pagina actual
    },
    nextPage() { //metodo para el boton de next
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
      }
      this.dataPerPages(this.currentPage); // le pasamos la pagina actual
    },
    resetData() { // para borrar todos los filtros y traer de nuevo la informacion
      this.datas = this.backup; // aca me guardo la info
      this.totalPages(); // // llamo a la funcion
      this.dataPerPages(1); // le digo que se posicione en la pagina 1
      // vuelvo a false todos los checkbox
      this.filterName = false;
      this.filterId = false;
      this.filterCountry = false;
      this.filterContinent = false;
      this.filterCoordinates = false;
      //limpio el imput
      this.filterField = "";
    },
    onchange(event) { // es mi funcion para pasar la informacion al input
      "use strict";
      if (this.filterId === true) { //si el checkbox esta true
        this.datas = this.datas.filter((num) => // aplico el filtro a la columna indicada
        //tostring porque el dato es de tipo numerico, se debe pasar a cadena 
          num.id.toString().includes(event.target.value)//e.t.v es lo que me entra por el input cuando escribo
        );
        this.dataPerPages(1);
      } else if (this.filterName === true) {
        this.datas = this.datas.filter((el) =>
        //toLowerCase para contemplar las minusculas y mayusculas
          el.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        this.dataPerPages(1);
      } else if (this.filterCountry === true) {
        this.datas = this.datas.filter((coun) =>
                //toLowerCase para contemplar las minusculas y mayusculas
          coun.country.toLowerCase().includes(event.target.value.toLowerCase())
        );
        this.dataPerPages(1);
      } else if (this.filterContinent === true) {
        this.datas = this.datas.filter((cont) =>
                //toLowerCase para contemplar las minusculas y mayusculas
          cont.continent.toLowerCase().includes(event.target.value.toLowerCase())
        );
        this.dataPerPages(1);
      } else if (this.filterCoordinates === true) {
        this.datas = this.datas.filter((cor) =>
          cor.coordinates != null //hay algunos valores tipo null asi que debe hacerse la validacion
            ? cor.coordinates.includes(event.target.value)
            : 0
        );
        this.dataPerPages(1); // con esto siemrpe nos aseguramos de que este en la pagina 1 los datos
      }
      return 0;
    },
  },

  async mounted() { // acceder al dom, y cuando se carge toda la info se monta el comonente y se renderiza
    // hacemos la pedticion a la api
    let response = await axios.get("http://apitest.cargofive.com/api/ports");
    this.datas = response.data.data; // mis datos estan guardados aqui
    this.backup = response.data.data; //variable de backup
    this.dataPerPages(this.currentPage);
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap");
h1 {
  color: #031b4e;
  font-weight: 800;
  font-size: 80px;
  text-transform: uppercase;
}

label {
  margin: 5px;
  color: #031b4e;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
}
title {
  margin: 50px;
}
.form-group {
  display: flex;
  justify-content: space-between !important;
  padding: 20px !important;
  border: 1px solid #031b4e !important;
  margin: 20px;
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
button-reset {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
button {
  justify-content: center;
  align-items: center;
  font-family: inherit;
  font-weight: 500;
  font-size: 17px;
  padding: 0.8em 1.3em 0.8em 0.9em;
  color: white;
  background: #ad5389;
  background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
  border: none;
  letter-spacing: 0.05em;
  border-radius: 16px;
}

button svg {
  margin-right: 3px;
  transform: rotate(30deg);
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}

button span {
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}

button:hover svg {
  transform: translateX(5px) rotate(90deg);
}

button:hover span {
  transform: translateX(7px);
}
</style>
