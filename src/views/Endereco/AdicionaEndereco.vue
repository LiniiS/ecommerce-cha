<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5">
        <h3>Novo Endereço</h3>
        <router-link :to="{ name: 'Endereco' }">
          <button id="voltar" class="btn btn-special">Voltar</button>
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 px-5 px-md-0">
        <form name="novo-produto">
          <!-- tipo da residencia -->
          <div class="form-group">
            <label class="label-title">Tipo de Residência</label>
            <select id="tipo-residencia" class="form-control" v-model="residencia" required>
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
                  id="logradouro"
                  type="text"
                  v-model="logradouro"
                  class="form-control"
                  placeholder="Avenida Santista"
                  required
                />
              </div>
            </div>
            <!-- numero -->
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="numero">Numero</label>
                <input
                  id="numero"
                  type="text"
                  v-model="numero"
                  class="form-control"
                  required
                  placeholder="13"
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
                  id="bairro"
                  type="text"
                  v-model="bairro"
                  class="form-control"
                  placeholder="Centro"
                  required
                />
              </div>
            </div>
            <!-- cidade -->
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="cidade">Cidade</label>
                <input
                  id="cidade"
                  type="text"
                  v-model="cidade"
                  class="form-control"
                  required
                  placeholder="Bonito"
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
                  id="estado"
                  type="text"
                  v-model="estado"
                  class="form-control"
                  placeholder="SP"
                  required
                />
              </div>
            </div>
            <!-- país -->
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="pais">País</label>
                <input
                  id="pais"
                  type="text"
                  v-model="pais"
                  class="form-control"
                  required
                  placeholder="Brasil"
                />
              </div>
            </div>
            <!-- CEP -->
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="cep">CEP</label>
                <input
                  id="cep"
                  type="text"
                  v-model="cep"
                  class="form-control"
                  required
                  placeholder="08775541"
                />
              </div>
            </div>
          </div>
          <!-- observação -->
          <div class="form-group">
            <label class="label-title">Observação</label>
            <textarea
              id="observacao"
              type="text"
              class="form-control"
              placeholder="próximo à ponte do Pina"
              v-model="observacao"
            />
          </div>
          <!-- tipo do endereço -->
          <div class="form-group">
            <label class="label-title">Tipo de Endereco</label>
            <select id="tipo-endereco" class="form-control" v-model="tipoEndereco" required>
              <option value="ENTREGA">Entrega</option>
              <option value="COBRANCA">Cobrança</option>
              <option value="COBRANCA_E_ENTREGA">Cobrança e Entrega</option>
              >
            </select>
          </div>

          <!-- nome do endereço -->
          <div class="form-group">
            <label class="label-title">Nome do Endereço</label>
            <input
              id="nome-endereco"
              type="text"
              class="form-control"
              placeholder="Casa de Praia"
              v-model="nome"
            />
          </div>

          <button
            id="salvar-endereco"
            type="button"
            class="btn btn-special"
            @click="adicionaEndereco"
          >
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
  props: ["baseURL", "enderecos"],

  data() {
    return {
      clientes: null,
      residencia: null,
      logradouro: null,
      bairro: null,
      cidade: null,
      estado: null,
      pais: null,
      observacao: null,
      cep: null,
      numero: null,
      tipoEndereco: null,
      nome: null,
    };
  },
  methods: {
    async adicionaEndereco() {
      const novoEndereco = {
        residencia: this.residencia,
        logradouro: this.logradouro,
        bairro: this.bairro,
        cidade: this.cidade,
        estado: this.estado,
        pais: this.pais,
        observacao: this.observacao,
        cep: this.cep,
        numero: this.numero,
        tipoEndereco: this.tipoEndereco,
        nome: this.nome,
      };
      console.log(this.novoEndereco);

      await axios
        //o token é passado via params, não usar o configs headers por enquanto
        .post(
          `${this.baseURL}endereco/adiciona?token=${this.token}`,
          novoEndereco,
          {}
        )
        .then(() => {
          this.$router.push({ name: "Endereco" });
          console.log(this.novoEndereco);
          sweetalert({
            text: "Endereço adicionado com sucesso!",
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
      // .get("https://api-asantos-cha.herokuapp.com/cliente/admin/clientes")
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
