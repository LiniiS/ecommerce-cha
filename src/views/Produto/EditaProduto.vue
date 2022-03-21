<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5">
        <h3>Editar Produto</h3>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 px-5 px-md-0">
        <form name="edita-produto" v-if="produto">
          <div class="form-group">
            <label>Categoria</label>
            <select class="form-control" v-model="produto.categoriaId" required>
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
            <input type="text" class="form-control" v-model="produto.nome" required/>
          </div>

          <div class="form-group">
            <label class="label-title">Sabor</label>
            <input type="text" class="form-control" v-model="produto.sabor" required/>
          </div>

          <div class="form-group">
            <label class="label-title">Imagem Ilustrativa do Produto</label>
            <input
              type="url"
              class="form-control"
              v-model="produto.urlImagem"
            required/>
          </div>

          <div class="form-group">
            <label class="label-title">Preço</label>
            <input type="text" class="form-control" v-model="produto.preco" required/>
          </div>

          <div class="form-group">
            <label class="label-title">Descrição</label>
            <textarea
              type="text"
              class="form-control"
              v-model="produto.descricao"
            />
          </div>

          <button type="button" class="btn btn-special" @click="editaProduto">
            Salvar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import sweetalert from 'sweetalert'
export default {
  data(){
     return { 
        produto: null,
        id: null
      }
    },
  //this one comes from App.vue
    props: ["baseURL", "categorias", "produtos"],
    methods: {
        async editaProduto(){
            await axios.put(`${this.baseURL}produto/atualiza/${this.id}`, 
            this.produto).then(() => {
                this.$emit("fetchData");
                this.$router.push({name: 'ProdutoAdmin'})
                sweetalert({
                    text: "Produto foi atualizado!",
                    icon: "success"
                })
            }).catch(err => console.log('err', err));
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        this.produto = this.produtos.find(produto => produto.id == this.id)
    }
};
</script>
<style scoped>
</style>