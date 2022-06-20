<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mb-5 mt-5">
        <h3>Solicitações de Trocas</h3>
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
            placeholder="ex. defeito na embalagem"
          />
        </div>
      </div>
    </form>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Id do Cliente</th>
            <th>Motivo da Troca</th>
            <th>Id do Item</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="troca of trocasComFiltro" :key="troca.id">
            <td>{{ troca.clienteId }}</td>
            <td>{{ troca.motivo }}</td>
            <td>{{ troca.itemPedidoId }}</td>
            <td>
              <button class="btn">
                <img
                  src="https://img.icons8.com/ios/24/000000/id-not-verified.png"
                />
                Autorizar troca
              </button>

              <button class="btn">
                <img
                  src="https://img.icons8.com/ios/24/000000/delete--v1.png"
                />
                Rejeitar troca
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
  name: "ExibirSolicitacaoTrocas",

  data() {
    return {
      trocas: null,
      filtro: "",
    };
  },
  props: ["baseURL"],
  created() {
    axios
    //  .get("https://api-asantos-cha.herokuapp.com/cliente/admin/clientes")
      .get(`${this.baseURL}pedido/trocas`)
      .then((resp) => {
        this.trocas = resp.data;
      });
  },
  computed: {
    trocasComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.trocas.filter((troca) => exp.test(troca.motivo));
      } else {
        return this.trocas;
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