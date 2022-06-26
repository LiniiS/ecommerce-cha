<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mt-5 mb-5">
        <h3>Cupons De Troca</h3>
        <router-link :to="{ name: 'ClienteLogado' }">
          <button class="btn btn-special">Voltar</button>
        </router-link>
      </div>
    </div>
    <div class="row mb-5">
      <div
        v-for="cupom in cupons"
        :key="cupom.id"
        class="col-md-3 col-xl-4 col-12 pt-3 justify-content-around d-flex">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">Cupom de Troca</h5><hr/>
            <h6 class="card-subtitle mb-2 text-dark">
              Valor: {{ cupom.valor }}
            </h6>
            <small class="text-muted">Utilize o código no carrinho de compras</small>
            <p class="card-title">{{ cupom.codigo }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ExibirCuponsDoCliente",
  props: ["baseURL"],

  data() {
    return {
      token: null,
      cupons: null,
    };
  },
  methods: {
    buscaCupons() {
      axios
        .get(`${this.baseURL}pedido/cliente/cupons/?token=${this.token}`)
        .then((data) => {
          this.cupons = data.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },

  mounted() {
    //token na sessão após login
    this.token = localStorage.getItem("token");
    //token tem um clienteId, mas o clienteId n tem um token
    this.buscaCupons();
  },
};
</script>
<style scoped>



</style>