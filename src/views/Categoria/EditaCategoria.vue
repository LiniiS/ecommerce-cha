<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5">
        <h3>Editar Categoria</h3>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div class="col-md-6 px-5 px-md-0">
        <form name="nova-categoria" v-if="categoria">
          <div class="form-group">
            <label for="nome">Nome da Categoria</label>
            <input
              type="text"
              class="form-control"
              v-model="categoria.nome"
              required
            />
          </div>
          <div class="form-group">
            <label for="imgUrl">Url da Imagem</label>
            <input
              type="url"
              class="form-control"
              v-model="categoria.imgUrl"
              required
            />
          </div>
          <div class="form-group">
            <label for="descricao">Descrição da Categoria</label>
            <textarea
              type="text"
              class="form-control"
              v-model="categoria.descricao"
            />
          </div>
          <button type="button" class="btn btn-special" @click="editaCategoria">
            Salvar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const sweetalert = require("sweetalert");
export default {
  data() {
    return {
      categoria: null,
      id: null,
    };
  },
  props: ["baseURL", "categorias"],
  methods: {
    async editaCategoria() {
      delete this.categoria["produtos"];

      await axios
        .put(`${this.baseURL}categoria/atualiza/${this.id}`, this.categoria)
        .then(() => {
          this.$emit("fetchData");
          this.$router.push({ name: "Categoria" });
          sweetalert({
            text: "Categoria atualizada!",
            icon: "success",
          });
        })
        .catch((err) => console.log("err", err));
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.categoria = this.categorias.find(
      (categoria) => categoria.id == this.id
    );
  },
};
</script>

<style scoped>
h3 {
  font-family: "Roboto", sans-serif;
  color: #484848;
  font-weight: 700;
}
textarea {
  min-height: 150px;
}
</style>