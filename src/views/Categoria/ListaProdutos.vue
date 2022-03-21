<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">{{ categoria.nome }}</h4>
        <h5>{{ msg }}</h5>
      </div>
    </div>
    <div class="row">
      <div
        v-for="produto of categoria.produtos"
        :key="produto.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <ProdutoBox :produto="produto" />
      </div>
    </div>
  </div>
</template>
<script>
import ProdutoBox from "../../components/Produto/ProdutoBox.vue"
export default {
    components: {ProdutoBox},
  data() {
    return {
      id: null,
      categoria: {},
      msg: ''
    };
  },
  props: ["categorias"],
  mounted() {
    this.id = this.$route.params.id;
    this.categoria = this.categorias.find(
      (categoria) => categoria.id == this.id);
    const qntdProdutos = this.categoria.produtos.length;
    if(qntdProdutos == 0){
        this.msg = "Nenhum produto encontrado nesta categoria"
    }else if(qntdProdutos == 1){
        this.msg = "Apenas 1 produto encontrado nesta categoria"
    }else{
        this.msg = qntdProdutos + " produtos encontrados"
    }

  },
};
</script>
<style scoped>
h4{
    color: #142;
    font-size: 1.7em;
    font-weight: 700;
}

</style>
