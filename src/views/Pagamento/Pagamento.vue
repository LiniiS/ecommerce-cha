<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-3"></div>

      <div class="col-md-6 col-12 pt-3 mt-3 pt-md-0 text-center border">
        <div class="pt-3">
          <h4>Pagamento do Pedido</h4>

          <!-- form do cartão do cliente -->
          <form class="row justify-content-center">
            <div class="col-md-6 px-5 px-md-0">
              <p>Efetue o pagamento na sessão a seguir</p>
            </div>
          </form>
        </div>
      
      </div>
    </div>
  </div>
  <div class="col-3"></div>
</template>
<script>
import axios from "axios";

//import sweetAlert from "sweetalert";

export default {
  name: "Pagamento",

  data() {
    return {
      token: null,
      cupons: [],
      cartoes: [],
      enderecos: [],
      itensCarrinho: [],
      pagamento: {
        carrinhoId: null,
        cartaoId: null,
        enderecoId: null,
        cupomId: null,
        valorTotal: 0,
        valorDesconto: 0,
      },
    };
  },
  props: ["baseURL"],
  methods: {
    //confirmar pagamento
    //buscar todos os itens no carrinho
    listaItensDoCarrinho() {
      axios
        .get(`${this.baseURL}carrinho/?token=${this.token}`)
        .then((res) => {
          //salva os itens do backend na variavel itemsCarrinho do front
          const result = res.data;
          //ao array de itensCarrinho da view recebe é atribuído os dados que vêm do backend {baseURL}carrinho/get
          this.itensCarrinho = result.itensCarrinho;
          console.log(result);
          this.custoTotal = result.custoTotal;
          this.valorSemDesconto = result.custoTotal;
        })
        .catch((err) => console.log("err", err));
    },
    //chamar o post pra efetuar o pagamento
    salvaPedido() {
      axios
        .post(this.baseURL + "pedido/novo-pedido/?token=" + this.token)
        .then(() => {
          window.location.href = " /pagamento/cartao";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.listaItensDoCarrinho;
    this.salvaPedido();
  },
  created() {},
  computed: {},
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
</style>