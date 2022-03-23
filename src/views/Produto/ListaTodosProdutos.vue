<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">{{ titulo }}</h4>
        <h5>{{ msg }}</h5>
        <hr />
        <p class="title">Categorias</p>
        <div class="categorias d-flex justify-content-center mb-5">
          <a href="#" class="badge badge-special mr-2 ml-2">Todos</a>
          <a href="#" class="badge badge-special mr-2 ml-2">Verde</a>
          <a href="#" class="badge badge-special mr-2 ml-2">Preto</a>
          <a href="#" class="badge badge-special mr-2 ml-2">Ervas</a>
          <a href="#" class="badge badge-special mr-2 ml-2">Oolong</a>
        </div>
      </div>
    </div>

    <!-- filtra produto
    <div class="container d-flex align-items-start ">
      <form class="float-left mb-2">
        <div class="form-row">
          <div class="form-group">
            <label class="text-muted text-left" for="cliente"
              >Filtrar pelo nome:</label
            >
            <input
              type="search"
              class="form-control form-control-sm"
              @input="filtro = $event.target.value"
              placeholder="ex. black"
            />
          </div>
        </div>
      </form>

      <div class="card-link mb-2">
        <h6 class="title">Categorias</h6>
        <ul>
          <li>
            <a href="#">Chá Verde</a>
          </li>
          <li>
            <a href="#">Chá Verde</a>
          </li>
          <li>
            <a href="#">Chá Verde</a>
          </li>
          <li>
            <a href="#">Chá Verde</a>
          </li>
        </ul>
      </div>
    </div>
-->

    <div class="row">
      <div
        v-for="produto of produtos"
        :key="produto.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <ProdutoBox :produto="produto" />
      </div>
    </div>
  </div>
</template>
<script>
import ProdutoBox from "../../components/Produto/ProdutoBox.vue";
export default {
  name: "ListaTodosProdutos",
  components: { ProdutoBox },
  data() {
    return {
      titulo: "Todos os produtos",
      id: null,
      categoria: {},
      msg: "",
    };
  },
  props: ["categorias", "produtos"],
  mounted() {},
};
</script>
<style scoped>
h4 {
  color: #142;
  font-size: 1.7em;
  font-weight: 700;
}

.badge-special {
  background: #e4e4e4;
  color: #2c3e50;
  font-size: 1.1em;
}
.title {
  color: #142;
}
</style>
