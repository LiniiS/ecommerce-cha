<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5">
        <h3>Editar Endereço</h3>
        <small class="card bg-light m-2 p-2">Em desenvolvimento - 05/06</small>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 px-5 px-md-0">
        <form name="novo-produto">
          <!-- tipo da residencia -->
          <div class="form-group">
            <label class="label-title">Tipo de Residência</label>
            <select class="form-control" v-model="residencia" required>
              <option value="CASA">Casa</option>
              <option value="APARTAMENTO">Apartamento</option>

              >
            </select>
          </div>
          <!-- logradouro -->
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="logradouro">Logradouro</label>
                <input
                  type="text"
                  v-model="logradouro"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <!-- numero -->
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="numero">Numero</label>
                <input
                  type="text"
                  v-model="numero"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>

          <!-- bairro -->
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="bairro">Bairro</label>
                <input
                  type="text"
                  v-model="bairro"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <!-- cidade -->
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="cidade">Cidade</label>
                <input
                  type="text"
                  v-model="cidade"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <!-- estado -->
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="estado">Estado</label>
                <input
                  type="text"
                  v-model="estado"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <!-- país -->
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="pais">País</label>
                <input
                  type="text"
                  v-model="pais"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <!-- CEP -->
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="genero">CEP</label>
                <input
                  type="text"
                  v-model="cep"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <!-- observação -->
          <div class="form-group">
            <label class="label-title">Observação</label>
            <textarea type="text" class="form-control" v-model="observacao" />
          </div>
          <!-- tipo do endereço -->
          <div class="form-group">
            <label class="label-title">Tipo de Endereco</label>
            <select class="form-control" v-model="tipoEndereco" required>
              <option value="ENTREGA">Entrega</option>
              <option value="COBRANCA">Cobrança</option>
              <option value="COBRANCA_E_ENTREGA">Cobrança e Entrega</option>
              >
            </select>
          </div>

          <!-- nome do endereço -->
          <div class="form-group">
            <label class="label-title">Nome do Endereço</label>
            <input type="text" class="form-control" v-model="nome" />
          </div>

          <button type="button" class="btn btn-special" @click="editaEndereco">
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
  name: "EditaEndereco",
  props: ["baseURL"],

  data() {
    return {
      id: null,
      token: null,
      endereco: {
        nome: "",
        residencia: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "",
        cep: "",
        observacao: "",
        tipoEndereco: "",
      },
    };
  },

  methods: {
    //verificar esse método, retornando 415 media não suportada
    async editaEndereco() {
      await axios
        .put(`${this.baseURL}endereco/atualiza/${this.id}`, this.endereco)
        .then(() => {
          this.$emit("fetchData");
          this.$router.push({ name: "Endereco" });
          sweetalert({
            text: "Endereço foi atualizado!",
            icon: "success",
          });
        })
        .catch((err) => console.log("err", err));
    },

    async fetchEnderecos() {
      await axios
        .get(`${this.baseURL}endereco/lista/${this.token}`)
        .then((data) => {
          this.endereco = data.data;

          // console.log(JSON.parse(JSON.stringify(this.enderecos)));
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchEnderecos();
    this.id = this.$route.params.id;
    //verificar o método find, como obter o valor que tá na resposta Proxy
    //this.endereco = this.enderecos.find((endereco) => endereco.id == this.id);
  },
};
</script>

<style scoped>
.label-title {
  font-weight: 700;
  float: left;
}
</style>
