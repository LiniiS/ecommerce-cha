<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mt-5 mb-5">
        <h3>Cartões Cadastrados</h3>

        <!-- Colocar um "Alterar senha -->
        <router-link :to="{ name: 'AdicionaCartao' }">
          <button class="btn btn-special">Trocar senha</button>
        </router-link>
        <!-- Volta pra Home do Cliente -->
        <router-link :to="{ name: 'ClienteLogado' }">
          <button class="btn btn-special">Voltar</button>
        </router-link>
      </div>
    </div>
    <!-- Forms pra alterar os dados do cliente | a senha será alterada em outra view -->
    <div class="row mb-5">
       


  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ClienteLogadoDetalhes",
  props: ["baseURL"],

  data() {
    return {
      token: null,
      cartoes: null,
    };
  },
  methods: {
    fetchDadosCliente() {
      axios
        
    },
  },

  mounted() {
    //token na sessão após login
    this.token = localStorage.getItem("token");
    //token tem um clienteId, mas o clienteId n tem um token
    this.fetchCartoes();
  },
};
</script>
<style scoped>
</style>