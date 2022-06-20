<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5">
        <h3>Novo Cartão de Crédito</h3>
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
            <select id="bandeira-cartao" class="form-control" v-model="bandeira" required>
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
                id="numero-cartao"
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
                  id="nome-cartao"
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
                id="cvv-cartao"
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
         
          <button id="salvar-cartao" type="button" class="btn btn-special" @click="adicionaCartao">
            Salvar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sweetalert from "sweetalert";

export default {
  props: ["baseURL", "cartoes"],

  data() {
    return {
      clientes: null,
      bandeira: null,
      numeroCartao: null,
      nomeImpresso: null,
      cvv: null,
      cartaoPadrao: null,
    };
  },
  methods: {
    async adicionaCartao() {
      const novoCartao = {
        nomeImpresso: this.nomeImpresso,
        numeroCartao: this.numeroCartao,
        bandeira: this.bandeira,
        cartaoPadrao: this.cartaoPadrao,
        cvv: this.cvv,
      };
      console.log(this.novoCartao);

      await axios
        //o token é passado via params, não usar o configs headers por enquanto
        .post(
          `${this.baseURL}cartao/adiciona?token=${this.token}`,
          novoCartao,
          {}
        )
        .then(() => {
          this.$router.push({ name: "Cartao" });
          console.log(this.novoCartao);
          sweetalert({
            text: "Cartão adicionado com sucesso!",
            icon: "success",
          });
        })
        .catch((err) => console.log("err", err));
    },
  },

  mounted() {
    //token na sessão após login
    this.token = localStorage.getItem("token");
    //token tem um clienteId, mas o clienteId n tem um token
  },
  //verificar esse created
  created() {
    axios
      //.get("https://api-asantos-cha.herokuapp.com/cliente/admin/clientes")
      .get("http://localhost:8081/cliente/admin/clientes")
      .then((resp) => {
        this.clientes = resp.data;
      });
  },
};
</script>

<style scoped>
.label-title {
  font-weight: 700;
  float: left;
}
</style>
