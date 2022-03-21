<template>
    <div class="card h-100">
        <div class="embed-responsive embed-responsive-16by9" >
            <img :src="categoria.imgUrl" alt="Imagem da categoria" class="card-img-top embed-responsive-item">
        </div>
        <div class="card-body">
          <router-link :to="{name: 'ListaProdutos', params: {id: categoria.id}}">
            <h5 class="card-title">{{ categoria.nome }}</h5>      
          </router-link>
            <p class="cart-text">{{ categoria.descricao.substring(0,60) }}...</p>
            <router-link :to="{ name: 'EditaCategoria', params: { id: categoria.id} }" v-show="$route.name == 'Categoria'">
              <button class="btn btn-special">Editar</button>
      </router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: "CategoriaBox",
  props: ["categoria"],
  methods: {},
};
</script>

<style scoped>
.card {
  width: 20rem;
  height: 24rem;
}
.embed-responsive .card-img-top {
  object-fit: cover;
}
a {
  text-decoration: none;
}
.card-title {
  color: #142;
  font-size: 1.2rem;
  font-weight: 400;
}
.card-title:hover {
  font-weight: bold;
  cursor: pointer;
}
.card-text {
  font-size: 0.9rem;
}
#edit-category {
  float: right;
}
</style>