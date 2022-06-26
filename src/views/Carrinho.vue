<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mb-5">
        <h4 class="pt-3">Carrinho de Compras</h4>
        <hr />
      </div>
    </div>

    <!-- v-for para os itens do carrinho deste cliente -->
    <div class="col-3"></div>
    <div
      v-for="itemCarrinho in itensCarrinho"
      :key="itemCarrinho.id"
      class="row mt-2 pt-3 d-flex flex-row border"
    >
      <!-- apenas espaçamento pra centralizar os cards facilmente-->

      <!-- 22/04 refatorar pra usar um component que monta esse produto, como no ProdutoBox-->
      <div class="col-md-2 m-3">
        <img
          v-bind:src="itemCarrinho.produto.urlImagem"
          alt=""
          class="w-100 img-thumbnail embed-responsive embed-responsive-1by1"
          style="object-fit: cover"
        />
      </div>

      <div class="col-md-3 p-1 text-left">
        <div class="card-block px-3">
          <h4 class="card-title text-decoration-none special-title">
            <router-link
              :to="{
                name: 'ExibirDetalhesProduto',
                params: { id: itemCarrinho.produto.id },
              }"
            >
              {{ itemCarrinho.produto.nome }}
            </router-link>
          </h4>

          <p class="mb-0 font-weight-bold" id="item-preco">
            R$ {{ itemCarrinho.produto.preco }} a unidade
          </p>
          <p class="mb-0">
            Unidades selecionadas:{{ itemCarrinho.quantidade }}
          </p>
        </div>
        <div class="col-12">
          <hr />

          <a
            href="#"
            class="text-right"
            @click="removeItemDoCarrinho(itemCarrinho.id)"
            ><i class="fa fa-times text-dark" aria-hidden="true"></i> Remover
            produto</a
          >
        </div>
        <p class="mb-3 mr-3 mt-3 float-right">
          Total:
          <span class="font-weight-bold">
            R$
            {{
              (itemCarrinho.produto.preco * itemCarrinho.quantidade).toFixed(2)
            }}
          </span>
        </p>
      </div>
      <!-- ações -->

      <!-- espaçamento pra centralizar os cards -->
    </div>
    <div class="row justify-content-right">
      <div class="col-md-6 px-5  mt-2 px-md-0">
        <select name="cupom" class="form-control" @change="onChange($event)" v-model="cupomSelecionado">
          <option v-for="cupom in cupons" :key="cupom.id" :value="cupom.valor">
            {{ cupom.codigo }}
          </option>
        </select>
        <p href="#" class="mt-2 text-right" 
          >Desconto R$: <i class="fa fa-money text-dark" aria-hidden="true"></i> {{ valorDesconto }} 
          <br />Total da compra: R${{valorSemDesconto}}</p
        >
      </div>
    </div>
    <div class="col-3"></div>
    <!-- valor total dos produtos neste carrinho | FORA DO LOOP -->
    <div class="pt-2 text-right">
      <h5>
        Total a pagar:<strong> R${{ custoTotal.toFixed(2) }} </strong>
      </h5>
     
      <button
        id="pagamento-stripe"
        type="button"
        class="btn btn-special"
        @click="checkout"
      >
        Seguir para Pagamento
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    
    return {
      //itens do carrinho inicialmente vazia
      itensCarrinho: [],
      token: null,
      custoTotal: 0,
      cupons: [],
      cupomSelecionado: 0,
      valorDesconto: null,
      valorSemDesconto: null,

    };
  },
  name: "Carrinho",
  props: ["baseURL", "produtos"],

  methods: {
    //aplicar  desconto no valor do cupom
    onChange:function(event){  
    
      this.valorDesconto = event.target.value;
       console.log(event.target.value);
       if(this.custoTotal > this.valorDesconto){
       this.custoTotal = this.custoTotal - this.valorDesconto;
       }else{
        this.custoTotal;
       }
    },
    //lista cupons disponíveis do cliente
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
    removeItemDoCarrinho(itemCarrinhoId) {
      //chama o endpoint mapeado pra deletar o item do carrinho, passando o token via params @RequestParam no backend
      axios
        .delete(
          `${this.baseURL}carrinho/deleta/${itemCarrinhoId}/?token=${this.token}`
        )
        //após deletar, envia o cliente pro topo da pagina
        .then((res) => {
          if (res.status === 200) {
            this.$router.go(0);
          }
        })
        .catch((err) => console.log("err", err));
    },

    checkout() {
      this.$router.push({ name: "Checkout" });
    },
  },
 
    
 

  //a seção mounted é chamada antes da pagian ser carregada
  mounted() {
    this.token = localStorage.getItem("token");
    //busca os itens do carrinho e salva na variável itemsCarrinho[]
    this.listaItensDoCarrinho();
    this.buscaCupons();
  },
};
</script>
<style scoped>
.special-title {
  color: #312d2d;
  font-size: 1.5rem;
}
.special-title:hover {
  color: #5c3636;
  font-weight: bold;
}

#item-preco {
  font-style: italic;
}

a {
  color: #312d2d;
  text-decoration: none;
}
a:hover {
  color: #5c3636;
  font-weight: 700;
}
h4 {
  color: #5c3636;
  font-size: 1.7em;
  font-weight: 700;
}
</style>
