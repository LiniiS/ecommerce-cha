<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-3"></div>

      <div class="col-md-6 col-12 pt-3 pt-md-0 text-center border">
        <h4 class="card-title font-weight-bold mt-3">
          Pagamento do Pedido #{{ pedido.id }}
        </h4>
        <h6 class="font-italic">Status do pedido: {{ pedido.status }}</h6>
        <h6 class="font-weight-bold"><hr /></h6>
        <p class="font-weight-bold">
          Total a pagar: R$ {{ pedido.valorTotal }}
        </p>
        <!-- form do cartão do cliente -->
        <form @submit="paga" class="mt-4 row justify-content-center">
          <div class="col-md-6 px-5 px-md-0">
            <form name="novo-pedido">
              <div class="form-group text-left">
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
                <label class="mt-2">Selecione um Endereço</label>
                <select id="endereco" class="form-control" v-model="endereco">
                  <option
                    v-for="endereco in enderecos"
                    :key="endereco.id"
                    :value="endereco.id"
                  >
                    {{ endereco.nome }}
                  </option>
                </select>
                <label class="mt-2">Selecione um Cupom</label>
                <select
                  @change="onChange($event)"
                  id="cupom"
                  class="form-control"
                  v-model="cupomSelecionado"
                  required
                >
                  <option
                    v-for="cupom in cupons"
                    :key="cupom.id"
                    :value="cupom.valor"
                  >
                    {{ cupom.codigo }}
                  </option>
                </select>
              </div>
            </form>
            <p href="#" class="mt-2 text-right">
              Desconto R$:
              <i class="fa fa-money text-dark" aria-hidden="true"></i>
              {{ valorDesconto }} <br />Pedido com Desconto: R${{
                pedido.valorTotal - valorDesconto
              }}
            </p>
            <button
              id="solicitar-pagamento"
              class="btn btn-block btn-special mt-2 mb-3"
            >
              Pagar
            </button>
          </div>
        </form>
        <div class="row justify-content-center">
          <router-link :to="{ name: 'ListaPedidosCliente' }">
            <button
              id="ver-pedidos"
              type="button"
              class="btn btn-special float-left mb-2"
              role="group"
            >
              Ver Pedidos
            </button>
          </router-link>
        </div>
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
  name: "PagamentoCartao",

  data() {
    return {
      token: null,
      cupons: [],
      cartoes: [],
      enderecos: [],
      valorDesconto: 0,
      cupomSelecionado: null,
      pagamento: {
        pedidoId: null,
        carrinhoId: null,
        cartaoId: null,
        enderecoId: null,
        cupomId: null,
        valorTotal: 0,
        valorDesconto: 0,
      },
      pedido: {
        id: null,
        valorTotal: null,
        dtCriacao: null,
        totalItems: null,
        status: null,
      },
    };
  },
  props: ["baseURL", "produtos"],
  methods: {
    //verifica o desconto
    onChange: function (event) {
      this.valorDesconto = event.target.value;
      this.valorSemDesconto = this.valorTotal;
      console.log(event.target.value);
      if (this.valorTotal > this.valorDesconto) {
        this.custoTvalorTotalotal = this.valorTotal - this.valorDesconto;
      } else {
        this.valorTotal;
      }
    },

    //cria o pagamento
    async paga() {
      const pagamento = {
        pedidoId: this.pedido.id,
        cartaoId: this.cartaoId,
        valorTotal: this.pedido.valorTotal,
        valorDesconto: this.cupomSelecionado.valor,
      };

      await axios
        .post(`${this.baseURL}pagamento/novo/?token=${this.token}`, pagamento)
        .then((res) => {
          if (res.status == 201) {
            this.$router.push({ name: ListaPedidosCliente });
          }
          this.$router.push({ name: ListaPedidosCliente });
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
    //busca o pedido recém criado -> criar o endpoint pra devolver somente 1 pedido
    listaPedidos() {
      axios.get(`${this.baseURL}pedido/novo/?token=${this.token}`).then(
        (response) => {
          if (response.status == 200) {
            this.pedido = response.data;
            console.log(this.pedido);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    //chamar o post pra efetuar o pagamento
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.listaPedidos();
    this.buscaCupons();
    this.buscaEnderecos();
    this.buscaCartoes();
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
  font-size: 0.8em;
}
#ver-pedidos {
  font-size: 0.6em;
}
</style>