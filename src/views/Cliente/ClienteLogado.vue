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
          <div class="card-header mb-2 text-muted">Acesso Rápido</div>

          <a href="#" class="card-link">Cupons</a>
          <a href="#" class="card-link">Trocas e Devoluções</a>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
    <div class="row justify-content-center">
      <!-- insert productBoxComponent -->
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-header mb-2 text-title font-weight-bold">Endereços</div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Meus Endereços</h6>
          <p class="card-text">
            Cadastre novos endereços ou edite os endereços atuais
          </p>
          <router-link class="card-link" :to="{ name: 'Endereco' }"
            >Detalhes
          </router-link>
        </div>
      </div>
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-header mb-2 text-title font-weight-bold">Dados Pessoais</div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Meus Dados</h6>
          <p class="card-text">Revise todos os seus dados, altere senhas</p>
          <a href="#" class="card-link">Detalhes</a>
        </div>
      </div>
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-header mb-2 text-title font-weight-bold">Cartões</div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Meus Cartões</h6>
          <p class="card-text">Adicione ou altere seus cartões</p>
          <a href="#" class="card-link">Detalhes</a>
        </div>
      </div>
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-header mb-2 text-title font-weight-bold">Pedidos</div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Meus Pedidos</h6>
          <p class="card-text">Revise todos os seus pedidos</p>
          <a href="#" class="card-link">Detalhes</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      clientes: null,
    };
  },
  methods: {},

  mounted() {
    this.token = localStorage.getItem("token");
  },
  created() {
    axios
      .get("https://api-asantos-cha.herokuapp.com/cliente/admin/clientes")
      .then((resp) => {
        this.clientes = resp.data;
      });
  },
};
</script>

<style scoped>
.cardbox-special {
  box-shadow: 2px 2px 2px #312d2d;
}

.cardbox-special:hover {
  box-shadow: 1px 1px #312d2d;
}
</style>