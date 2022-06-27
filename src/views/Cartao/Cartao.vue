<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mt-5 mb-5">
        <h3>Cartões Cadastrados</h3>

        <router-link id="adicionar-cartao" :to="{ name: 'AdicionaCartao' }">
          <button class="btn btn-special">Adicionar Cartão</button>
        </router-link>
        <router-link :to="{ name: 'ClienteLogado' }">
          <button class="btn btn-special">Voltar</button>
        </router-link>
      </div>
    </div>
    <div class="row mb-5">
      <div
        v-for="cartao in cartoes"
        :key="cartao.id"
        class="col-md-3 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">{{ cartao.nomeImpresso }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {{ cartao.numeroCartao }}
            </h6>
            <small class="card-title">{{ cartao.bandeira }}</small>
            <!--
            <p class="card-text">
              {{ cartao.cartaoPadrao }}
            </p>
            -->
            <p class="card-text">
              <template v-if="cartao.cartaoPadrao == true">
                <span class="badge badge-dark">Cartão Padrão</span>
              </template>
              <template v-else>
                <span class="badge badge-secondary">Cartão Extra</span>
              </template>
            </p>

            <router-link
              class="card-link"
              id="edita-cartao"
              :to="{ name: 'EditaCartao', params: { id: cartao.id } }"
              >Editar</router-link
            >
            <a href="#" class="card-link" @click="removeCartao(cartao.id)"
              >Excluir</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Cartao",
  props: ["baseURL"],

  data() {
    return {
      token: null,
      cartoes: null,
    };
  },
  methods: {
    fetchCartoes() {
      axios
        .get(`${this.baseURL}cartao/lista/?token=${this.token}`)
        .then((data) => {
          this.cartoes = data.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    removeCartao(cartaoId) {
      axios
        .delete(`${this.baseURL}cartao/deleta/${cartaoId}/?token=${this.token}`)
        //após deletar, envia o cliente pro topo da pagina
        .then((res) => {
          if (res.status === 200) {
            this.$router.go(0);
          }
        })
        .catch((err) => console.log("err", err));
    },
  },

  mounted() {
    //token na sessão após login
    this.token = localStorage.getItem("token");
    //token tem um clienteId, mas o clienteId n tem um token
    this.fetchCartoes();
  },
};
</script>
<style scoped>
</style>