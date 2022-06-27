<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mt-5 mb-5">
        <h3>Enderecos Cadastrados</h3>

        <router-link id="adicionar-endereco" :to="{ name: 'AdicionaEndereco' }">
          <button class="btn btn-special">Adicionar Endereco</button>
        </router-link>
        <router-link :to="{ name: 'ClienteLogado' }">
          <button id="voltar" class="btn btn-special">Voltar</button>
        </router-link>
      </div>
    </div>
    <div class="row mb-5">
      <div
        v-for="endereco in enderecos"
        :key="endereco.id"
        class="col-md-3 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">{{ endereco.nome }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ endereco.cidade }}</h6>
            <!--
            <small class="card-title">{{ endereco.tipoEndereco }}</small>
            -->
            <p class="card-text">
              <template v-if="endereco.tipoEndereco == 'COBRANCA_E_ENTREGA'">
                <span class="badge badge-dark">Cobrança e Entrega</span>
              </template>
              <template v-if="endereco.tipoEndereco == 'COBRANCA'">
                <span class="badge badge-secondary">Cobrança</span>
              </template>
              <template v-if="endereco.tipoEndereco == 'ENTREGA'">
                <span class="badge badge-info">Entrega</span>
              </template>
            </p>

            <p class="card-text">
              {{ endereco.observacao }}
            </p>
            <router-link
              class="card-link"
              id="edita-endereco"
              :to="{ name: 'EditaEndereco', params: { id: endereco.id } }"
              >Editar</router-link
            >
            <a href="#" class="card-link" @click="removeEndereco(endereco.id)"
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
  name: "Endereco",
  props: ["baseURL"],

  data() {
    return {
      token: null,
      enderecos: null,
    };
  },
  methods: {
    fetchEnderecos() {
      axios
        .get(`${this.baseURL}endereco/lista/?token=${this.token}`)
        .then((data) => {
          this.enderecos = data.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    removeEndereco(enderecoId) {
      axios
        .delete(`${this.baseURL}endereco/deleta/${enderecoId}/?token=${this.token}`)
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
    this.fetchEnderecos();
  },
};
</script>
<style scoped>
</style>