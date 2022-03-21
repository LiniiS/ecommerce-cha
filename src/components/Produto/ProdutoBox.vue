<template>
  <div class="card h-100 w-75">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        :src="produto.urlImagem"
        alt="Imagem ilustrativa do produto"
        class="card-img-top embed-responsive-item"
      />
    </div>
    <div class="card-body">
      <router-link
        :to="{ name: 'ExibirDetalhesProduto', params: {id: produto.id}}"
      >
        <h5 class="card-title text-decoration-none special-title">{{ produto.nome }}</h5>
      </router-link>

      <p class="card-text">{{ produto.descricao.substring(0, 15) }}...</p>
      <p class="card-text">R$ {{ produto.preco }}</p>

      <router-link
        :to="{ name: 'EditaProduto', params: { id: produto.id } }"
        v-show="$route.name == 'ProdutoAdmin'"
      >
        <button class="btn btn-special">Editar</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProdutoBox",
  props: ["produto"],
  methods: {},
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
.special-title{
  color: #312d2d;
  
}
.special-title:hover{
  color: #5c3636;
  font-weight: bold;
  
}
a { 
  text-decoration: none; 
}
</style>