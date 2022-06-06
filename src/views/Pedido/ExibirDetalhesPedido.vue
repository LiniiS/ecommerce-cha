<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mt-5 mb-5">
        <h3>Detalhes do Pedido nº {{ pedidoId }}</h3>
      </div>
    </div>
    <!--  percorrer a lista de pedidos -->
    <div
      v-for="itemPedido in itemsPedido"
      :key="itemPedido.id"
      class="row mt-2 pt-3 justify-content-around"
    >
      <div class="col-2"></div>
      <div class="col-md-3 border embed-responsive embed-responsive-16by9">
        <img
          :src="itemPedido.produto.urlImagem"
          class="w-100 card-img-top embed-responsive-item"
        />
      </div>
      <div class="col-md-5 px-3">
        <div class="text-left card-block px-3">
          <h6 class="card-title font-weight-bold mt-3">
            {{itemPedido.produto.nome}}
          </h6>
          <p id="status-item" class="mb-0 ">
              Status do item no pedido: {{itemPedido.status}}
          </p>
          <p id="quantidade-item" class="mb-0">
            Quantidade de items:  {{ itemPedido.quantidade }}
          </p>

          <p id="preco-unitario" class="mb-0">
            Valor unitário : R$ {{ itemPedido.valor }}
          </p>
          <p id="preco-total" class="mb-0">
            Valor Total : R$ {{ itemPedido.quantidade * itemPedido.valor }}
          </p>
        </div>
        <a class="card-link btn-special" id="link-troca" href=#>Solicitar Troca</a>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ExibirDetalhesPedido",
  props: ["baseURL", "pedidoId"],

  data() {
    return {
      itemsPedido: [],
      token: null,
      // eslint-disable-next-line vue/no-dupe-keys
      pedido: {},
      // eslint-disable-next-line vue/no-dupe-keys
      pedidoId: 0
      
    };
  },
  methods: {
    getPedido() {
      //buscar este pedido no backend com o array de items dele pra ser exibido item a item
      axios
        .get(`${this.baseURL}pedido/${this.pedidoId}?token=${this.token}`)
        .then(
          (response) => {
            if (response.status === 200) {
              this.pedido = response.data;
              
              this.itemsPedido = this.pedido.itemsPedido
            }
          },
          (err) => console.log(err)
        );
    },
  },
  mounted() {
    // eslint-disable-next-line vue/no-mutating-props
    this.pedidoId = this.$route.params.id;
    this.token = localStorage.getItem("token");
    this.getPedido();
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

#link-troca{
    font-size: 0.7em;
}
</style>
