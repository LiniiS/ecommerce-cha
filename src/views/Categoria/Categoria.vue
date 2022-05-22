<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mt-5 mb-5">
        <h3>Categorias Disponíveis</h3>

        <router-link :to="{ name: 'AdicionaCategoria' }">
          <button id="adicionar-categoria" class="btn btn-special">Adicionar Categoria</button>
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        v-for="categoria of categorias"
        :key="categoria.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <CategoriaBox :categoria="categoria"> </CategoriaBox>
      </div>
    </div>
  </div>
</template>
<script>
//const axios = require("axios");
//adding a new cat will not auto refresh the view list
import CategoriaBox from "../../components/Categoria/CategoriaBox.vue";
export default {
  name: "Categoria",
  props: ["categorias"],
  components: { CategoriaBox },

  data() {
    return {
     // baseURL: "https://api-asantos-cha.herokuapp.com/",
     baseURL: "http://localhost:8081",
    };
  },
  methods: {},

  mounted() {},
};
</script>
<style scoped>
</style>