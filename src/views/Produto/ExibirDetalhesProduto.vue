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
        <div class="features pt-3 text-left">
          <hr>
          <h5><strong>Sobre este produto</strong></h5>
          <ul>
            <li>As embalagens contém 50g do produto</li>
            <li>O produto é destinado à infusão</li>
            <li>Produto produzido de forma artesanal</li>
          </ul>
        </div>
        <button id="btn-wishlist"
        class="btn btn-special mr-3 p-1 py-0" @click="adicionarAListaDeDesejos">{{ wishlistIcone }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import sweetalert from 'sweetalert';
export default {
  data() {
    return {
      produto: {},
      categoria: {},
      wishlistIcone: "Adicionar à Lista de Desejos",
    };
  },

  props: ["baseURL", "produtos", "categorias"],
  methods: {
    //backend não implementado!
    adicionarAListaDeDesejos(){
      //é preciso trazer o token do cliente
      if(!this.token){
        //usuário deslogado
        sweetalert(
          {
            title: "Oops!",
            text: "Faça o Login para adicionar o item à sua lista de Desejos",
            icon: "error"
          })
      }else{
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
        sweetalert(
          {
            title: "Oba!",
            text: "Item adicionado à lista de Desejos",
            icon: "success"
          })
      }

    }
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
#btn-wishlist{
 font-size: 0.7rem;
}
</style>