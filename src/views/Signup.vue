<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pt-3">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
          <img id="logo" src="../assets/imagens/ts-logo.png" />
        </router-link>
      </div>
    </div>

    <!-- formulario cadsatre-se -->
    <div class="row">
      <div class="col-12 justify-content-center d-flex pt-3">
        <div id="signup-form" class="flex-item border">
          <h2 class="title pt-4">Crie sua Conta</h2>
          <!-- considerar o uso do ValidationObserver | VeeValidate -->
          <form @submit="signup" class="pt-4 pl-4 pr-4">
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    v-model="email"
                    class="form-control"
                    required
                    placeholder="email@email.com"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="nome">Nome Completo</label>
                  <input
                    id="nome"
                    type="text"
                    v-model="nome"
                    class="form-control"
                    required
                    placeholder="Nome Sobrenome"
                  />
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label for="telefone">Telefone</label>
                  <input
                    id="telefone"
                    type="text"
                    v-model="telefone"
                    class="form-control"
                    required
                    placeholder="1199875632"
                  />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label for="cpf">CPF</label>
                  <input
                    id="cpf"
                    type="text"
                    v-model="cpf"
                    class="form-control"
                    required
                    placeholder="70974989002"
                  />
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label for="dtNascimento">Data de Nascimento</label>
                  <input
                    id="dt-nascimento"
                    type="text"
                    v-model="dtNascimento"
                    class="form-control"
                    pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                    placeholder="dd-mm-aaaa"
                    required
                  />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label for="genero">Genero</label>
                  <input
                    id="genero"
                    type="text"
                    v-model="genero"
                    class="form-control"
                    required
                    placeholder="feminino"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="senha">Senha</label>
              <input
                id="senha"
                type="password"
                v-model="senha"
                class="form-control"
                placeholder="**************"
                required
              />
            </div>
            <div class="form-group">
              <label for="senhaVerificada">Confirme sua senha</label>
              <input
                id="senha-verificada"
                type="password"
                v-model="senhaVerificada"
                class="form-control"
                placeholder="**************"
                required
              />
            </div>
            <button class="btn btn-special mt-2 mb-3">Criar Conta</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import sweetalert from "sweetalert";
export default {
  props: ["baseURL"],
  data() {
    return {
      email: null,
      nome: null,
      senha: null,
      senhaVerificada: null,
      genero: null,
      dtNascimento: null,
      telefone: null,
      cpf: null,
    };
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      if (this.senha == this.senhaVerificada) {
        //chama api
        const cliente = {
          nome: this.nome,
          genero: this.genero,
          dtNascimento: this.dtNascimento,
          cpf: this.cpf,
          telefone: this.telefone,
          email: this.email,
          senha: this.senha,
          senhaVerificada: this.senhaVerificada,
        };
        console.log(cliente);
        await axios
          .post(`${this.baseURL}cliente/signup`, cliente)
          .then(() => {
            this.$router.replace("/");
            sweetalert({
              title: `Seja bem-vindo(a) ${this.nome}!`,
              text: "Cadastro completo! Faça o Login.",
              icon: "success",
            });
          })
          .catch((err) => console.log("err", err));
      } else {
        //msg de erro
        sweetalert({
          text: "As senhas digitadas não conferem. Tente novamente",
          icon: "error",
        });
      }
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 992px) {
  #signup-form {
    width: 40%;
  }
}
</style>