<template>
  <div class="container">
    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signin-form" class="flex-item">
          <h2 class="pt-4 special-title">Oba!</h2>
          <p class="text-dark">
            Deu tudo certo com o processo de Pagamento. <br />
            Estamos processando o seu pedido.
          </p>

          <div class="text-center">
            <img
              src="../../assets/imagens/successful-purchase-pana.png"
              class="rounded special-width"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Sucesso',
  props: ["baseURL"],
  data(){
    return {
      token: null,
      sessaoId: null
    }
  }, 
  methods: {
    salvaPedido(){
      axios.post(this.baseURL + "pedido/novo/?token="+this.token+"&sessaoId="+this.sessaoId)
      .then(() => {
        window.location.href = ' /cliente/pedidos'
        }).catch((error) => {
          console.log(error);
        })
        
    }
  },
  mounted(){
    this.token = localStorage.getItem("token");
    this.sessaoId = localStorage.getItem("sessaoId");
    this.salvaPedido();
  }
};
</script>
<style scoped>
.special-width {
  width: 40%;
}
</style>
