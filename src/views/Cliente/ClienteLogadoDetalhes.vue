<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5 mt-5">
        <h2>Olá Cliente!</h2>
        <h6 class="text-dark">Painel Administrativo</h6>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header mb-2 text-dark">
            Alteração de Dados Cadastrais
          </div>
          <div class="row-3 mb-3">
            <router-link :to="{ name: 'ClienteLogado' }">
              <button class="btn btn-special">Dados Pessoais</button>
            </router-link>
            <router-link :to="{ name: 'ClienteLogadoTrocaSenha' }">
              <button class="btn btn-special">Alterar Senha</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
    <div class="row justify-content-center">
      <!-- insert productBoxComponent -->
    </div>
  </div>
</template>
<script>
//import axios from "axios";

export default {
  name: "ClienteLogadoDetalhes",
  props: ["baseURL"],

  data() {
    return {
      token: null,
    };
  },
  methods: {},

  mounted() {
    //token na sessão após login
    this.token = localStorage.getItem("token");
    //token tem um clienteId, mas o clienteId n tem um token
  },
};
</script>
<style scoped>
.btn-special {
  font-size: 0.7em;
}
</style>