<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mb-5 mt-5">
        <h3>Solicitações de Trocas</h3>
        <span>Trocas solicitadas</span>
      </div>
    </div>
    <!-- search cliente -->
    <hr />
    <router-link :to="{ name: 'ClienteLogado' }">
      <button
        type="button"
        class="btn btn-special float-left mb-2"
        role="group"
      >
        Voltar
      </button>
    </router-link>
    <form class="float-right mb-2">
      <div class="form-row">
        <div class="form-group">
          <label class="text-muted text-left" for="cliente"
            >Filtrar pelo defeito:</label
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
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Troca</th>
            <th>Pedido</th>
            <th>Motivo da Troca</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="troca of trocasComFiltro" :key="troca.id">
            <td>{{ troca.id }}</td>
            <td ><router-link class="text-decoration-none special-title" v-bind:to="'/cliente/pedido/' + troca.pedidoId">
              {{ troca.pedidoId }}</router-link
            ></td>
            <td>{{ troca.motivo }}</td>
            <td>{{ troca.status }}</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ExibirSolicitacaoTrocasDoCliente",

  data() {
    return {
      trocas: null,
      filtro: "",
      solicitacoes: [],
      token: null,
    };
  },
  props: ["baseURL"],

  methods: {
    listaItensDeTrocaDoCliente() {
      axios
        .get(`${this.baseURL}pedido/cliente/trocas/?token=${this.token}`)
        .then((resp) => {
          this.trocas = resp.data;
        });
    },
  },
  /*
  created() {
    axios
      .get(`${this.baseURL}pedido/cliente/trocas/?token=${this.token}`)
      .then((resp) => {
        this.trocas = resp.data;
      });
  },
  */
  mounted() {
    this.token = localStorage.getItem("token");
    this.listaItensDeTrocaDoCliente();
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
.btn-special {
  font-size: 0.7em;
}

.special-title{
  color: #312d2d;
  
}
.special-title:hover{
  color: #5c3636;
  font-weight: bold;
  
}
a { 
  text-decoration: none; 
}
</style>