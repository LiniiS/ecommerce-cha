<template>
  <div class="container">
    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signin-form" class="flex-item border">
          <h2 class="pt-4 special-title">Entrar</h2>
          <form @submit="signin" class="form-group pt-4 pl-4 pr-4">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="senha">Senha</label>
              <input
                id="senha"
                v-model="senha"
                type="password"
                class="form-control"
                required
              />
            </div>
            <button class="btn btn-special mt-2 mb-3">Continuar</button>
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
      senha: null,
    };
  },
  methods: {
    async signin(e) {
       e.preventDefault();
      const body = {
        email: this.email,
        senha: this.senha,
      };
      await axios
        .post(`${this.baseURL}cliente/signin`, body)
        .then((res) => {
          //botar uma verificação de senha incorreta e informar cm swal
          //this.$router.replace("/");
          //atualiza os dados (carrinho etc)
          this.$emit("fetchData");
          //envia o cliente pro painel admin dele
          this.$router.replace("/");
          //seta o token deste cliente na sessão
          localStorage.setItem("token", res.data.token);
          sweetalert({
            title: "Seja bem vindo(a) à TeaShop!",
            text: "Login realizado com sucesso! Boas Compras!",
            icon: "success",
          });
        })
        .catch((err) => console.log("err", err));
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 992px) {
  #signin-form {
    width: 40%;
  }
}

.special-title {
  color: #312d2d;
  font-weight: bold;
}
</style>
