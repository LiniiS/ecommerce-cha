<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5 mt-5">
        <h2>Olá Cliente!</h2>
        <h6 class="text-dark">Painel Administrativo</h6>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header mb-2 text-muted">Acesso Rápido</div>

          <router-link
            id="detalhes-cupons"
            class="card-link"
            :to="{ name: 'ExibirCuponsDoCliente' }"
            >Meus Cupons
          </router-link>

          <router-link
            id="detalhes-trocas"
            class="card-link"
            :to="{ name: 'ExibirSolicitacaoTrocasDoCliente' }"
            >Trocas Solicitadas
          </router-link>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
    <div class="row justify-content-center">
      <!-- insert productBoxComponent -->
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-header mb-2 text-title font-weight-bold">
          Endereços
        </div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Meus Endereços</h6>
          <p class="card-text">
            Cadastre novos endereços ou edite os endereços atuais
          </p>
          <router-link
            id="detalhes-enderecos"
            class="card-link"
            :to="{ name: 'Endereco' }"
            >Detalhes
          </router-link>
        </div>
      </div>
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-header mb-2 text-title font-weight-bold">
          Dados Pessoais
        </div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Meus Dados</h6>
          <p class="card-text">Revise todos os seus dados, altere senhas</p>
          <router-link
            id="detalhes-dados"
            class="card-link"
            :to="{ name: 'ClienteLogadoDetalhes' }"
            >Detalhes
          </router-link>
        </div>
      </div>
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-header mb-2 text-title font-weight-bold">Cartões</div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Meus Cartões</h6>
          <p class="card-text">Adicione ou altere seus cartões</p>
          <router-link
            id="detalhes-cartoes"
            class="card-link"
            :to="{ name: 'Cartao' }"
            >Detalhes
          </router-link>
        </div>
      </div>
      <div class="card m-5 cardbox-special" style="width: 18rem">
        <div class="card-header mb-2 text-title font-weight-bold">Pedidos</div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Meus Pedidos</h6>
          <p class="card-text">Revise todos os seus pedidos</p>
          <router-link
            id="detalhes-pedidos"
            class="card-link"
            :to="{ name: 'ListaPedidosCliente' }"
            >Detalhes
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      cliente: null,
    };
  },
  props: ["baseURL"],

  methods: {
   async buscaCliente() {
      axios
        .get(`${this.baseURL}cliente/dados/?token=${this.token}`)
        .then((res) => {
          //salva os itens do backend na variavel itemsCarrinho do front
          const result = res.data;
          //ao array de itensCarrinho da view recebe é atribuído os dados que vêm do backend {baseURL}carrinho/get
          this.cliente = result;          
        })
        .catch((err) => console.log("err", err));
    },
  },
  beforeMount(){
    
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.buscaCliente();
    
    
  },
  
  
};
</script>

<style scoped>
.cardbox-special {
  box-shadow: 2px 2px 2px #312d2d;
}

.cardbox-special:hover {
  box-shadow: 1px 1px #312d2d;
}
</style>