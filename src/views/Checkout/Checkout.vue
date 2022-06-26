<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mb-5">
        <h4 class="pt-3">Checkout</h4>
        <hr />
      </div>
    </div>

    <!-- aviso checkout redirection -->
    <div class="jumbotron">
      <h2 class="display-5">Atenção!</h2>
      <p class="lead">Você será redirecionado para sessão de Pagamentos.</p>
      <hr class="my-4" />
      <p class="text-muted">
        Processamento de pagamentos online para empresas da Internet. A Stripe é
        um conjunto de APIs de pagamento para empresas online de todos os
        setores. Saiba mais em
        <a href="https://stripe.com/br">Stripe Pagamentos.</a>
      </p>
      <button
        id="checkout-stripe"
        type="button"
        class="btn btn-special"
        @click="seguirParaCheckout"
      >
        Confirmar
      </button>
    </div>
  </div>
  <!-- Aviso de Redirect pro Stripe-->
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
    // refatorar pra deixar escondido esse token, usar process.env.VUE_APP_STIPEAPITOKEN
      stripeAPIToken:
        "pk_test_51KSrSGIIt1WE4VLO3loOSbVEAc0LoyqQyylb0zQYFzG6WJXCNvDaoQLiVn3F8fI9tjQPdMNMoVKcQbKTgwRJ3IgO00CF9g5JhK",
      stripe: "",
      token: null,
      checkoutBody: [],
      sessaoId: null,
    };
  },
  name: "Checkout",
  props: ["baseURL"],
  methods: {
    //retorna todos os itens que o cliente botou no carrinho e
    //que formam o pedido dele
    buscaItensCarrinho() {
      axios
        .get(`${this.baseURL}carrinho/?token=${this.token}`)
        .then((response) => {
          if (response.status === 200) {
            let produto = response.data;
            let tam = Object.keys(produto.itensCarrinho).length;
            for (let i = 0; i < tam; i++) {
              this.checkoutBody.push({
               // urlImagem: produto.itensCarrinho[i].produto.urlImagem, botar no backend
                produto: produto.itensCarrinho[i].produto.nome,
                //verificar casas decimais -> no stripe não está exibindo, no backend tá ok
                preco: produto.itensCarrinho[i].produto.preco,
                quantidade: produto.itensCarrinho[i].quantidade,
                produtoId: produto.itensCarrinho[i].produto.id,
                clienteId: produto.itensCarrinho[i].clienteId,
              });
            }
          }
        })
        .catch((err) => console.log(err));
    },

    seguirParaCheckout() {
      console.log("checkoutBody", this.checkoutBody);
      axios
        .post(`${this.baseURL}pedido/sessao-checkout`, this.checkoutBody)
        .then((response) => {
          localStorage.setItem("sessaoId", response.data.sessaoId);
          return response.data; 
        })
        .then((session) => {
          //console.log("session", response.data);
          this.stripe.redirectToCheckout({
              sessionId: session.sessaoId
           });
        });
       // .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    //script + library pro Stripe
    this.stripe = window.Stripe(this.stripeAPIToken);
    this.buscaItensCarrinho();

   
  },
};
</script>
<style scoped>
h4 {
  color: #5c3636;
  font-size: 1.7em;
  font-weight: 700;
}
</style>
