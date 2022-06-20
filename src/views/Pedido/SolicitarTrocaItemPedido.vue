<template>
  <div>
    <!-- formulario cadsatre-se -->
    <div class="row">
      <div class="col-12 justify-content-center d-flex pt-3">
        <div id="signup-form" class="flex-item border mt-5">
          <h2 class="title pt-4">Solicitação de Troca</h2>
          <!-- considerar o uso do ValidationObserver | VeeValidate -->

          <form @submit="troca" class="pt-4 pl-4 pr-4">
            <div class="form-row text-left">
              <div class="col">
                <div class="form-group">
                  <p id="valor-troca" class="mb-1">
                    Valor do Item: <strong> {{ item.valor }}</strong>
                  </p>
                  <p id="item-troca" class="mb-1">
                    Produto: #<strong> {{ item.produtoId }}</strong>
                  </p>
                  <p id="pedido-troca" class="mb-1">
                    Pedido: #<strong> {{ item.pedidoId }}</strong>
                  </p>
                  <p id="status-troca" class="mb-1">
                    Status: <strong> {{ item.pedidoStatus }}</strong>
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div class="form-group">
              <h4 id="titulo-motivo" for="motivo">Motivo da Troca</h4>
              <textarea
                id="motivo"
                type="text"
                v-model="motivo"
                class="form-control"
                placeholder="descreva o motivo da solicitação da troca"
                required
              ></textarea>
            </div>

            <button id="solicitar-troca" class="btn btn-special mt-2 mb-3">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import sweetalert from "sweetalert";

export default {
  props: ["baseURL", " produtos"],
  data() {
    return {
      token: null,
      pedidoTroca: {
        itemId: null,
        motivo: null,
        status: null,
        itemPedido: null,
      },
      item: {},
      produto: {},
      prdId: 0,
    };
  },
  methods: {
    //get
    getItemPedido() {
      //buscar este pedido no backend com o array de items dele pra ser exibido item a item
      axios
        .get(`${this.baseURL}pedido/troca/${this.itemId}/?token=${this.token}`)
        .then(
          (response) => {
            if (response.status === 200) {
              this.item = response.data;

              console.log(this.item);
            }
          },
          (err) => console.log(err)
        );
    },
    //post
    async troca(e) {
      e.preventDefault();
      const pedidoTroca = {
        motivo: this.motivo,
        status: this.item.pedidoStatus,
        pedidoId: this.item.pedidoId,
      };
      //chama api

      console.log(pedidoTroca);
      await axios
        .post(
          `${this.baseURL}pedido/troca/${this.itemId}/?token=${this.token}`,
          pedidoTroca
        )
        .then((res) => {
          if (res.status == 201) {
            this.$router.push({ name: "ListaPedidosCliente" });
            sweetalert({
              title: `Troca Solicitada`,
              text: "Vamos analisar seu pedido de troca.",
              icon: "success",
            });
          } 
        })
        .catch((err) => console.log("err", err));
        
    },
  },
  mounted() {
    this.itemId = this.$route.params.id;
    this.token = localStorage.getItem("token");
    //fazer buscar os dados deste item do pedido
    this.getItemPedido();
  },
};
</script>
<style scoped>
@media screen and (min-width: 992px) {
  #signup-form {
    width: 40%;
  }
}

.motivo {
  width: 700px;
  resize: none;
  min-height: 10px;
}
</style>
