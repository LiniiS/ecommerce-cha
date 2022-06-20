<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="text-center mb-5">
        <h3>Altere sua senha</h3>
        <small class="card bg-light m-2 p-2">Em desenvolvimento - 05/06</small>
        <router-link :to="{ name: 'ClienteLogado' }">
          <button class="btn btn-special">Voltar</button>
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 px-5 px-md-0">
        <form name="nova-senha">
          <!-- campo da senha -->
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="nova-senha">Nova Senha</label>
                <input
                  type="password"
                  v-model="novaSenha"
                  class="form-control"
                  placeholder="**********"
                  required
                />
              </div>
            </div>
            
            <div class="col">
              <div class="form-group">
                <label class="label-title" for="nova-senha-verificada"
                  >Digite novamente a nova senha</label
                >
                <input
                  type="password"
                  v-model="novaSenhaVerificada"
                  class="form-control"
                  required
                  placeholder="**********"
                />
              </div>
            </div>
            
          </div>
          <button type="button" class="btn btn-special" @click="alteraSenha">
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
  name: "ClienteLogadoTrocaSenha",
  props: ["baseURL"],
  data() {
    return {
      token: null,
      novaSenha: null,
      novaSenhaVerificada: null,
    };
  },
  methods: {
    //post no endpoint de update de senha do cliente
    async alteraSenha(e) {
      e.preventDefault();
      if(this.novaSenha == this.NovaSenhaVerificada) {
        const pswdUpdated = {
          senha: this.novaSenha,
          senhaVerificada: this.novaSenhaVerificada

        };
        console.log(pswdUpdated);
      await axios
          .put(
            `${this.baseURL}cliente/atualiza/senha/${this.token}`,
            pswdUpdated
          )
          .then((response) => {
            if (response.status == 200) {
              this.$router.push({ name: "ClienteLogado" });
              sweetalert({
                text: "Senha alterada com sucesso!",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }else{
        sweetalert({
          text: "As senhas digitadas não conferem. Tente novamente",
          icon: "error",
        });
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
};
</script>
<style scoped>
.btn-special {
  font-size: 0.7rem;
}
</style>