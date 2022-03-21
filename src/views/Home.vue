<template>
  <div id="home">
    <div id="background-div" class="page-holder bg-cover special-img">
      <div class="container py-5">
        <header class="text-left text-white py-5">
          <h3 class="mb-4 rounded" id="heading">
            <a href="#start-shopping" class="bg-white px-2 py-2 rounded">TeaShop - Chá Gourmet</a> </h3>
            
        </header>
      </div>

    </div>

    <!--display top  produtos -->

    <div class="container my-5 mb-5" name="top-produtos-display">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="pt-3">Top Produtos</h2>
        </div>
      </div>

      <div class="row">
        <div v-for="index in this.produtoSize" :key="index" class="col-md-4 col-xl-4, col-12 pt-3 justify-content-around d-flex">
          <ProdutoBox :produto="produtos[index-1]" />
        </div>
   
      </div>
    </div>


    <!--display top categorias de produtos -->

    <div class="container my-5 mb-5" name="top-categorias-display">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="pt-3">Top Categorias</h2>
        </div>
      </div>

      <div class="row">
        <div v-for="index in this.categoriaSize" :key="index" class="col-md-4 col-xl-4, col-12 pt-3 justify-content-around d-flex">
          <CategoriaBox :categoria="categorias[index-1]" />
        </div>
   
      </div>
    </div>
  </div>
</template>

<script>
import CategoriaBox from "../components/Categoria/CategoriaBox";
import ProdutoBox from "../components/Produto/ProdutoBox";
export default {
   name: "Home",
   components: {CategoriaBox, ProdutoBox},
   props: ["categorias", "produtos"],
   data() {
     return{
       categoriaSize: 0,
       produtoSize: 0,
     }
   },
    
  mounted() {
    this.categoriaSize = Math.min(3, this.categorias.length);
    this.produtoSize = Math.min(3, this.produtos.length);
  },
};
</script>
<style scoped>

.page-holder {
  min-height: 100vh;
}
.bg-cover {
  background-size: cover !important;
  
}
.special-img {
  filter: grayscale(100%);

}

#background-div {
  background: url(../assets/imagens/banner-img.jpg);
  background-position: center 50%;
  box-shadow: 1px 1px 5px #03273b;
}
#heading {
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  opacity: 0.8;
  font-family: "Josefin Sans", sans-serif;
}
#content {
  opacity: 0.8;
}
h2 {
  font-family: "Josefin Sans", sans-serif;
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
  white-space: normal;
}

h2:hover{
  color: #9c8888;
  letter-spacing: 2.5px;
  box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
</style>
