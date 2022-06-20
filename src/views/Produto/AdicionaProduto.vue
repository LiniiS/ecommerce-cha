<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5">
        <h3>Adicionar Produto</h3>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 px-5 px-md-0">
        <form name="novo-produto">
          <div class="form-group">
            <label >Categoria</label>
            <select id="categoria" class="form-control" v-model="categoriaId" required>
              <option
                v-for="categoria in categorias"
                :key="categoria.id"
                :value="categoria.id"
              >
               {{ categoria.nome }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="label-title">Nome</label>
            <input
            id="nome"
              type="text"
              class="form-control"
              placeholder="Ti Kwan"
              v-model="nome"
            />
          </div>

        <div class="form-group">
            <label class="label-title"
              >Sabor</label
            >
            <input
            id="sabor"
              type="text"
              class="form-control"
              placeholder="suave"
              v-model="sabor"
            />
          </div>


          <div class="form-group">
            <label class="label-title"
              >Imagem Ilustrativa do Produto</label
            >
            <input
            id="imagem"
              type="url"
              class="form-control"
              placeholder="https://via.placeholder.com/500"
              v-model="urlImagem"
            />
          </div>

          <div class="form-group">
            <label class="label-title">Preço</label>
            <input
            id="preco"
              type="text"
              class="form-control"
              placeholder="25.99"
              v-model="preco"
            />
          </div>

          <div class="form-group">
            <label class="label-title"
              >Descrição</label
            >
            <textarea
            id="descricao"
              type="text"
              class="form-control"
              placeholder="chá levemente adocicado, blend de ervas..."
              v-model="descricao"
            />
          </div>

          <button
          id="adicionar-produto"
            type="button"
            class="btn btn-special"
            @click="adicionaProduto"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sweetAlert from 'sweetalert'

export default {

  props: ["baseURL","categorias"],

  data() {
      return {
          id: null,
          categoriaId: null,
          nome: null,
          sabor: null,
          descricao: null,
          urlImagem: null,
          preco: null
      }
  },
  methods: {
      async adicionaProduto(){
          const novoProduto = {
            nome: this.nome,
            urlImagem: this.urlImagem,
            sabor: this.sabor,
            preco: this.preco,
            descricao: this.descricao,
            categoriaId: this.categoriaId
          }
        //outra forma de usar o axios no post
         await axios ({
             method: 'post',
             url: this.baseURL+"produto/adiciona",
             data: JSON.stringify(novoProduto),
             headers: {
                 'Content-Type': 'application/json'
             }
         })
         .then(() => {
             //enviando o evento
             this.$emit("fetchData");
             this.$router.push({name: 'ProdutoAdmin'});
             sweetAlert({
                 text: "Produto adicionado!",
                 icon: "success",

             });
         }).catch(err => console.log(err));
        
      }
  },

  mounted(){

  }
};
</script>

<style scoped>
.label-title {
  font-weight: 700;
  float: left;
}
</style>
