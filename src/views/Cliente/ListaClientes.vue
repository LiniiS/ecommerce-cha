<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Lista de Clientes</h4>
      </div>
    </div>
    <div class="row">
      <div
        v-for="cliente of clientes"
        :key="cliente.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <ClienteBox :cliente="cliente" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import ClienteBox from "../../components/Cliente/ClienteBox.vue";
export default {
    name: 'ListaClientes',
  //  props: ["clientes"],
    components: { ClienteBox },

   data() {
    return {
     // baseURL: "https://api-asantos-cha.herokuapp.com/",
        baseURL: "http://localhost:8080/",
      clientes: null,
      id: null
    };
  },

  methods: {
    async fetchUserData() {
      await axios
        .get(this.baseURL + "/admin/clientes")
        .then((res) => {
          this.clientes = res.data;
          console.log(res.data);
        })
        .catch((err) => console.log("err", err));
    },
  },

  mounted() {
    this.fetchUserData();
  },
};
</script>
<style scoped>
h4 {
  color: #142;
  font-size: 1.7em;
  font-weight: 700;
}
</style>
