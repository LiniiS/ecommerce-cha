<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="text-center mb-5 mt-5">
                <h3>Produtos disponíveis</h3>

                <router-link :to="{ name: 'AdicionaProduto'}">
                    <button class="btn btn-special">Adicionar Produto</button>
                </router-link>   

            </div>
        </div>
        <div class="row mb-5">
            <!-- insert productBoxComponent -->
            <div v-for="produto of produtos" :key="produto.id"
                class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
                <ProdutoBox :produto="produto"/>
            </div>
        </div>
    </div>
</template>
<script>
import ProdutoBox from "../../components/Produto/ProdutoBox"
export default {
  components: {ProdutoBox},
  //this one comes from App.vue
  props: ["produtos"],
};
</script>
<style scoped>


</style>