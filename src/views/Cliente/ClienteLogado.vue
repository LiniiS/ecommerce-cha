<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5 mt-5">
        <h3>Olá, Cliente!</h3>
        <p class="text-dark">Painel Administrativo do Cliente</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- insert productBoxComponent -->
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Endereços</h5>
          <h6 class="card-subtitle mb-2 text-muted">Meus Endereços</h6>
          <p class="card-text">
            Cadastre novos endereços ou edite os endereços atuais
          </p>
          <router-link class="card-link" :to="{ name: 'Endereco'  }"
            >Detalhes
          </router-link>
        </div>
      </div>
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Dados Pessoais</h5>
          <h6 class="card-subtitle mb-2 text-muted">Meus Dados</h6>
          <p class="card-text">Revise todos os seus dados, altere senhas</p>
          <a href="#" class="card-link">Detalhes</a>
        </div>
      </div>
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Cartões</h5>
          <h6 class="card-subtitle mb-2 text-muted">Meus Cartões</h6>
          <p class="card-text">Adicione ou altere seus cartões</p>
          <a href="#" class="card-link">Detalhes</a>
        </div>
      </div>
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Pedidos</h5>
          <h6 class="card-subtitle mb-2 text-muted">Meus Pedidos</h6>
          <p class="card-text">Revise todos os seus pedidos</p>
          <a href="#" class="card-link">Detalhes</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  props: ["clientes"],
  methods: {},

  mounted() {
    this.token = localStorage.getItem("token");
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