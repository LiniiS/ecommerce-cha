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
    <!-- search cliente -->
    <hr />
    <router-link :to="{ name: 'Admin' }">
      <button type="button" class="btn btn-special float-left mb-2" role="group">
        Voltar
      </button>
    </router-link>
    <form class="float-right mb-2">
      <div class="form-row">
        <div class="form-group">
          <label class="text-muted text-left" for="cliente"
            >Filtrar pelo nome:</label
          >
          <input
            type="search"
            class="form-control form-control-sm"
            @input="filtro = $event.target.value"
            placeholder="ex. joão"
          />
        </div>
      </div>
    </form>
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
          <tr v-for="cliente of clientesComFiltro" :key="cliente.id">
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.statusAtivo }}</td>
            <td>
              <button class="btn">
                <img
                  src="https://img.icons8.com/ios/24/000000/id-not-verified.png"
                />
                Inativar
              </button>

              <button class="btn">
                <img
                  src="https://img.icons8.com/ios/24/000000/delete--v1.png"
                />
                Excluir
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
      filtro: "",
    };
  },
  created() {
    axios
    //  .get("https://api-asantos-cha.herokuapp.com/cliente/admin/clientes")
      .get("http://localhost:8081/admin/clientes")
      .then((resp) => {
        this.clientes = resp.data;
      });
  },
  computed: {
    clientesComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.clientes.filter((cliente) => exp.test(cliente.nome));
      } else {
        return this.clientes;
      }
    },
  },
};
</script>
<style scoped>
h3 {
  color: #2c3e50;
  font-weight: bold;
}
</style>