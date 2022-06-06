<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5">
        <h3>Atualize os Dados do Cartão</h3>
        <small class="card bg-light m-2 p-2">Em desenvolvimento - 05/06</small>
         <router-link :to="{ name: 'Cartao' }">
          <button class="btn btn-special">Voltar</button>
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 px-5 px-md-0">
        <form name="novo-cartao">
          <!-- tipo da Bandeira do Cartão -->
          <div class="form-group">
            <label class="label-title">Bandeiras aceitas</label>
            <select class="form-control" v-model="bandeira" required>
              <option disabled value="">Selecione uma bandeira</option>
              <option value="AMERICAN_EXPRESS">American Express</option>
              <option value="ELO">Elo</option>
              <option value="HIPERCARD">Hipercard</option>
              <option value="MASTERCARD">Mastercard</option>
              <option value="VISA">Visa</option>

              >
            </select>
          </div>
          <!-- numero do cartão -->
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="numero-cartao">Número</label>
                <input
                  type="text"
                  v-model="numeroCartao"
                  class="form-control"
                  placeholder="424242424242"
                  required
                />
              </div>
            </div>
            <!-- nome Impresso no cartão -->
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="nome-impresso"
                  >Nome Impresso</label
                >
                <input
                  type="text"
                  v-model="nomeImpresso"
                  class="form-control"
                  required
                  placeholder="NOME SOBRENOME"
                />
              </div>
            </div>
          </div>

          <!-- valor de verificaçaõ do cartão - cvv -->
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="cvv">CVV</label>
                <input
                  type="text"
                  v-model="cvv"
                  class="form-control"
                  placeholder="XXX"
                  required
                />
              </div>
            </div>
            <!-- cartão padrão s/n -->
          </div>
          <div class="form-check my-1 mr-sm-2 mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="cartao-padrao"
              v-model="cartaoPadrao"
              required
            />
            <label class="form-check-label" for="cartao-padrao"
              >Cartão Padrão</label
            >
          </div>
          <div class="col">
          
          </div>
         
          <button type="button" class="btn btn-special" @click="editaCartao">
            Salvar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
//import sweetalert from "sweetalert";

export default {
  props: ["baseURL"],

  data() {
    return {
      clientes: null,
      bandeira: '',
      numeroCartao: '',
      nomeImpresso: '',
      cvv: null,
      cartaoPadrao: '',
    };
  },
  methods: {
    //buscar os dados do cartão deste usuario
  
    //salvar os dados em um objt


    //capturar os novos dados


    //enviar os novos dados do obj




  },
  //antes de renderizar o dDOM
  created(){
      this.id = this.$route.params.id;

  },
  //depois de renderizar o DOM
   mounted(){
    this.token = localStorage.getItem("token");
    
    
  }
};
</script>

<style scoped>
.label-title {
  font-weight: 700;
  float: left;
}
</style>
