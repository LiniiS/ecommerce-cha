<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-3"></div>

      <div class="col-md-6 col-12 pt-3 pt-md-0 text-center border">
        <h4>Pagamento do Pedido</h4>
        <h6 class="font-italic"></h6>
        <h6 class="font-weight-bold">Valor sem desconto</h6>
        <p>R$ {{ custoTotal }}</p>
        <!-- form do cartão do cliente -->
        <form @submit="paga" class="row justify-content-center">
          <div class="col-md-6 px-5 px-md-0">
            <form name="novo-pedido">
              <div class="form-group">
                <label>Selecione um Cartão para Pagamento</label>
                <select
                  id="cartao"
                  class="form-control"
                  v-model="cartao"
                  required
                >
                  <option
                    v-for="cartao in cartoes"
                    :key="cartao.id"
                    :value="cartao.id"
                  >
                    {{ cartao.nomeImpresso }}
                  </option>
                </select>
                <label>Selecione um Endereço</label>
                <select
                  id="endereco"
                  class="form-control"
                  v-model="endereco"
                  required
                >
                  <option
                    v-for="endereco in enderecos"
                    :key="endereco.id"
                    :value="endereco.id"
                  >
                    {{ endereco.nome }}
                  </option>
                </select>
                <label>Selecione um Cupom</label>
                <select
                  id="cupom"
                  class="form-control"
                  v-model="cupom"
                  required
                >
                  <option
                    v-for="cupom in cupons"
                    :key="cupom.id"
                    :value="cupom.id"
                  >
                    {{ cupom.codigo }}
                  </option>
                </select>
              </div>
            </form>
            <button id="solicitar-pagamento" class="btn btn-special mt-2 mb-3">
              Pagar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="col-3"></div>
</template>
<script>
import axios from "axios";
import ListaPedidosCliente from "../Pedido/ListaPedidosCliente.vue";
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
    //cria o pagamento
    async paga() {
      const pagamento = {
        cartaoId: this.cartaoId,
        enderecoId: this.cartaoId,
        cupomId: this.cupomId,
        valorTotal: this.carrinho.custoTotal,
        valorDesconto: this.cupom.valor,
      };

      await axios
        .post(`${this.baseURL}pagamento/novo/?token=${this.token}`, pagamento)
        .then((res) => {
          if (res.status == 201) {
            this.$router.push({ name: ListaPedidosCliente });
          }
        });
    },

    //buscar cupons do cliente
    buscaCupons() {
      axios
        .get(`${this.baseURL}pedido/cliente/cupons/?token=${this.token}`)
        .then((data) => {
          this.cupons = data.data;
          console.log(this.cupons);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    //buscar endereços do cliente
    buscaEnderecos() {
      axios
        .get(`${this.baseURL}endereco/lista/?token=${this.token}`)
        .then((data) => {
          this.enderecos = data.data;
          console.log(this.enderecos);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    //buscar cartoes do cliente
    buscaCartoes() {
      axios
        .get(`${this.baseURL}cartao/lista/?token=${this.token}`)
        .then((data) => {
          this.cartoes = data.data;
          console.log(this.cartoes);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    //busca os itens pra remontar o carrinho
    buscaItensCarrinho() {
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

    //confirmar pagamento

    //chamar o post pra efetuar o pagamento
    salvaPedido(){
    axios.post(this.baseURL + "pagamento/novo-pedido/?token="+this.token)
    .then(() => {
    window.location.href = ' /pagamento/cartao'
    }).catch((error) => {
        console.log(error);
    })
    
}
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.buscaCupons();
    this.buscaEnderecos();
    this.buscaCartoes();
    this.buscaItensCarrinho();
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