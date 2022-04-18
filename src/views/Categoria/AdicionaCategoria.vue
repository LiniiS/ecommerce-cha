<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="text-center mt-5 mb-5">
                <h3>Adicionar Categoria de Chás</h3>
            </div>
        </div>
       
        <div class="row justify-content-center">
            <div class="col-md-6 px-5 px-md-0">   
                <form name="new-category">
                    <div class="form-group">
                        <label for="nome">Nome da Categoria</label>
                        <input type="text" class="form-control" placeholder="oolong" v-model="nome"/>
                    </div>
                    <div class="form-group">
                        <label for="imgUrl">URL da Imagem da Categoria</label>
                        <input type="url" class="form-control" placeholder="https://via.placeholder.com/150" v-model="imgUrl"/>
                    </div>
                    <div class="form-group">
                        <label for="descricao">Descrição da Categoria</label>
                        <textarea type="text" class="form-control" placeholder="chá tradicional chinês" v-model="descricao"/>
                    </div>
                    <button type="button" class="btn btn-special" @click="adicionaCategoria">Salvar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
const sweetalert = require("sweetalert");
export default {
    data(){
        return {
            nome: "",
            imgUrl: "",
            descricao: ""
        };
    },
    methods: {
        adicionaCategoria(){
            //mesmo nome do backend
            const novaCategoria = {
                nome: this.nome,
                descricao: this.descricao,
                imgUrl: this.imgUrl
            };

           // const baseURL = "https://api-asantos-cha.herokuapp.com";
           const baseURL = "http://localhost:8081";

            axios({
                method: 'post',
                url: `${baseURL}/categoria/adiciona`,
                data: JSON.stringify(novaCategoria),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then (() => {
                this.$emit("fetchData");
                this.$router.push({name: 'Categoria'})
                sweetalert({
                    text: 'Nova categoria de Chá adicionada',
                    icon: 'success'
                });
            }).catch((err) => {
                    console.log(err);

            });
        }
    }
}


</script>

<style scoped>


</style>


       