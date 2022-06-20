<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mt-5 mb-5">
        <h3>Pedidos Realizados</h3>
        <router-link :to="{ name: 'ClienteLogado' }">
          <button class="btn btn-special">Voltar</button>
        </router-link>
      </div>
    </div>
    <!--  percorrer a lista de pedidos -->
    <div
      v-for="pedido in pedidoLista"
      :key="pedido.id"
      class="row mt-2 pt-3 justify-content-around"
    >
      <div class="col-2"></div>
      <div class="col-md-3 border embed-responsive embed-responsive-16by9">
        <!--   exibir a img do primeiro item dos pedidos -->
        <img
          v-bind:src="pedido.urlImagem"
          class="w-100 card-img-top embed-responsive-item"
        />
      </div>
      <div class="col-md-5 px-3">
        <div class="card-block text-left px-3">
          <h6 class="card-title">
            <router-link  id="numero-pedido" v-bind:to="'/cliente/pedido/'+pedido.id"
              >Pedido nº {{ pedido.id }}</router-link
            >
          </h6>
          <p class="mb-0">
            {{ pedido.totalItems }} item<span v-if="pedido.totalItems > 1"
              >s</span
            >
          </p>
          <p id="item-preco" class="mb-0 font-weight-bold">
            Valor total : R$ {{ pedido.valorTotal }}
          </p>
          <p id="item-data-pedido">Pedido em : {{ pedido.dtCriacao }}</p>
        </div>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      token: null,
      pedidoLista: [],
    };
  },
  props: ["baseURL"],
  name: "ListaPedidosCliente",
  methods: {
    //busca a lista de pedidos q vem do endpoint /todos mapeado em /pedido
    listaPedidos() {
      axios.get(`${this.baseURL}pedido/todos/?token=${this.token}`).then(
        (response) => {
          if (response.status == 200) {
            this.pedidos = response.data;
            // percorre a lista de pedidos do cliente e popula
            this.pedidos.forEach((pedido) => {
              this.pedidoLista.push({
                id: pedido.id,
                valorTotal: pedido.valorTotal,

                dtCriacao: pedido.dtCriacao.substring(0, 10),

                urlImagem: pedido.itemsPedido[0].produto.urlImagem,
                // o tamanho dalista será o total de items no pedido
                totalItems: pedido.itemsPedido.length,

                status: pedido.itemsPedido.status,
              });
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.listaPedidos();
  },
};
</script>

<style scoped>
h4,
h5 {
  font-family: "Roboto", sans-serif;
  color: #484848;
  font-weight: 700;
}

.embed-responsive .card-img-top {
  object-fit: cover;
}
</style>