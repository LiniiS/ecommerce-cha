<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-1"></div>

      <div class="col-md-4 col-12">
        <img :src="produto.urlImagem" class="img-fluid" />
      </div>

      <div class="col-md-6 col-12 pt-3 pt-md-0 text-left">
        <h4>{{ produto.nome }}</h4>
        <h6 class="categoria font-italic">{{ categoria.nome }}</h6>
        <h6 class="font-weight-bold">R$ {{ produto.preco }}</h6>
        <p>
          {{ produto.descricao }}
        </p>
        <!-- btn quantidade -->
        <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-4 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text">Quantidade</span>
            </div>
            <input id="quantidade" type="number" class="form-control" v-model="quantidade" />
          </div>
          <div class="input-group col-md-4 col-4 p-0">
            <button
            
              class="btn btn-special"
              id="btn-carrinho"
              @click="adicionarAoCarrinho"
            >
              Adicione ao carrinho
            </button>
          </div>
        </div>

        <div class="features pt-3 text-left">
          <hr />
          <h5><strong>Sobre este produto</strong></h5>
          <ul>
            <li>As embalagens contém 50g do produto</li>
            <li>O produto é destinado à infusão</li>
            <li>Produzido, preparado e embalado artesanalmente</li>
          </ul>
        </div>
        <!-- btn Lista de Desejos 
        <button
          id="btn-wishlist"
          class="btn btn-special mr-3 p-1 py-0"
          @click="adicionarAListaDeDesejos"
        >
          {{ wishlistIcone }}
        </button>
         -->
        
        <router-link id="ver-carrinho" :to="{name: 'Carrinho'}" class="btn btn-special mr-3 p-1 py-0" >
          <i class="fa fa-shopping-cart" aria-hidden="true"> Ver Carrinho</i>
        </router-link>
        <router-link id="ver-produtos" :to="{name: 'ListaTodosProdutos'}" class="btn btn-special mr-3 p-1 py-0" >
          <i class="fa fa-coffee" aria-hidden="true"> Ver Produtos</i>
        </router-link>
        
        
      </div>
    </div>
  </div>
</template>
<script>
import sweetalert from "sweetalert";
import axios from "axios";
export default {
  data() {
    return {
      produto: {},
      categoria: {},
      quantidade: 1, //valor default da variável
      //settar um icone que muda de cor ao clicar(adicionar/remover)
      wishlistIcone: "Adicionar à Lista de Desejos",
    };
  },

  props: ["baseURL", "produtos", "categorias"],
  methods: {
    //backend não implementado!
    adicionarAListaDeDesejos() {
      //é preciso trazer o token do cliente
      if (!this.token) {
        //usuário deslogado
        sweetalert({
          title: "Oops!",
          text: "Faça o Login para adicionar o item à sua lista de Desejos",
          icon: "error",
        });
      } else {
        //cliente logado
        /*
        axios.post(`${this.baseURL}listaDesejos/adiciona?token=${this.token}`, {
          id: this.produto.id
        }).then({(res) => {
          if(res.status === 201){
            this.wishlistIcone = "Adicionado à lista de Desejos"
          }
        }).catch((err) => {
          console.log("err", err);
        });
        */
        sweetalert({
          title: "Oba!",
          text: "Item adicionado à lista de Desejos",
          icon: "success",
        });
      }
    },
    adicionarAoCarrinho() {
      //verifica se o cliente tá logado
      if (!this.token) {
        sweetalert({
          title: "Oops!",
          text: "Faça o login para adcionar este produto ao carrinho de compras!",
          icon: "error",
        });
        return;
      }
      //chama o backend endpoint de add item ao carrinho
      axios
        .post(`${this.baseURL}carrinho/adiciona?token=${this.token}`, {
          //nome no back : nome na view
          produtoId: this.produto.id,
          quantidade: this.quantidade,
        })
        .then((res) => {
          if (res.status === 201) {
            sweetalert({
              title: "Oba!",
              text: "Produto adicionado ao carrinho!",
              icon: "success",
            });
            //dispara um evento pra atualizar os itens adicionados e o contador de item no carrinho
            //será atualizado ao adicionar um novo item
            this.$emit("fetchData");
          }
        })
        .catch((err) => console.log("err", err));
    },
  },

  mounted() {
    this.id = this.$route.params.id;
    this.produto = this.produtos.find((produto) => produto.id == this.id);
    this.categoria = this.categorias.find(
      (categoria) => categoria.id == this.produto.categoriaId
    );
    this.token = localStorage.getItem("token");
  },
};
</script>
<style scoped>
#btn-wishlist {
  font-size: 0.7rem;
}

#btn-carrinho {
  font-size: 12px;
  background-color: #2c3e50;
  padding: 5px;
  min-height: 30px;
  max-height: 50px;
  border-radius: 5px;
}

#btn-carrinho:hover {
  background: #9c8888;
  max-height: 50px;
  letter-spacing: 1.1px;
  box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
</style>