<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mb-5 mt-5">
        <h3>Clientes</h3>
        <span>Painel do Administrador</span>
        <!--
                <router-link :to="{ name: 'AdicionaCliente'}">
                    <button class="btn btn-special">Novo Cliente</button>
                </router-link>   
                -->
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cadastro Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.statusAtivo }}</td>
            <td>
              <button class="btn">
                <img src="https://img.icons8.com/ios/24/000000/id-not-verified.png"/> Inativar
              </button>

              <button class="btn">
                <img src="https://img.icons8.com/ios/24/000000/delete--v1.png"/> Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Cliente",

  data() {
    return {
      clientes: null,
    };
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
h3{
  color: #2c3e50;
  font-weight: bold;
}
</style>