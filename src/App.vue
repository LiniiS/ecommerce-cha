<template>
  <Navbar />

  <router-view
    v-if="categorias && produtos"
    style="min-height: 60vh"
    :baseURL="baseURL"
    :categorias="categorias"
    :produtos="produtos"
    @fetchData="fetchData"
  >
  </router-view>

  <Footer />
</template>
<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";

export default {
  components: { Navbar, Footer },

  data() {
    return {
     // baseURL: "https://api-asantos-cha.herokuapp.com/",
      baseURL: "http://localhost:8081/",
      categorias: null,
      produtos: null,
    };
  },

  methods: {
    async fetchData() {
      //categorias
      await axios
        .get(this.baseURL + "categoria/")
        .then((res) => {
          this.categorias = res.data;
        })
        .catch((err) => console.log("erro!", err));

      //produtos
      await axios
        .get(this.baseURL + "produto/")
        .then((res) => {
          this.produtos = res.data;
        })
        .catch((err) => console.log("err", err));
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btn-special {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #312d2d;
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
  border: 1px solid whitesmoke;
  transition: all 0.3s ease 0s;
  white-space: normal;
}

.btn-special:hover {
  background: #9c8888;
  letter-spacing: 1.2px;
  box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
</style>
