<template>
  <nav class="navbar navbar-expand-lg navbar-dark special-bg">
    <!-- Navbar content -->
    <!--    Logo-->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img id="logo" src="../assets/imagens/ts-logo.png" />
    </router-link>
    <!--    Burger Button-->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Search Bar  fa v4 icons-->

      <!-- 22/04 refatorar: melhorar a posição dos menus/icones -->
      <!-- dropdown Contas -->
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a
            href="#"
            id="navbarConta"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
          >
            <i
              class="fa fa-sign-in"
              style="font-size: 24px"
              aria-hidden="true"
            ></i>
            Conta
          </a>
          <div class="dropdown-menu special-bg" aria-labelledby="navbarConta">
            <router-link
              v-if="!token"
              :to="{ name: 'Signin' }"
              class="dropdown-item"
            >
              Entre ou
            </router-link>

            <router-link
              v-if="!token"
              :to="{ name: 'Signup' }"
              class="dropdown-item"
            >
              Cadastre-se
            </router-link>
            <router-link
              v-if="token"
              :to="{ name: 'ClienteLogado' }"
              class="dropdown-item"
            >
              Minha Conta
            </router-link>
            <a class="dropdown-item" v-if="token" href="#" @click="signout"
              >Sair</a
            >
          </div>
        </li>
      </ul>

      <!-- Dropdown Navegar -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a
            href="#"
            id="navbarNavegar"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            ><i class="fa fa-th-large m-1" style="font-size: 24px"></i>
          </a>
          <div class="dropdown-menu special-bg" aria-labelledby="navbarConta">
            <!-- Lista de Desejos não implementada ainda -->
            <router-link
              v-if="token"
              :to="{ name: 'ListaTodosProdutos' }"
              class="dropdown-item"
            >
              Produtos
            </router-link>

            <!-- Lista de Categorias de produtos -->
            <!-- Verificar se é um ADMIN, se !ADMIN, esconder os comandos adicionar e editar-->
            <router-link
              v-if="token"
              :to="{ name: 'Categoria' }"
              class="dropdown-item"
            >
              Categorias
            </router-link>

            <!-- Lista de Desejos não implementada ainda -->
            <router-link
              v-if="token"
              :to="{ name: 'Carrinho' }"
              class="dropdown-item"
            >
              Lista de Desejos
            </router-link>
            <!-- Página inicial -->
            <router-link
              v-if="token"
              :to="{ name: 'Home' }"
              class="dropdown-item"
            >
              Home
            </router-link>
          </div>
        </li>
      </ul>

      <div class="icons-navbar">
        <router-link v-if="token" :to="{ name: 'ClienteLogado' }"
          ><i class="fa fa-user-o m-1" style="font-size: 24px"></i
        ></router-link>
        <router-link :to="{ name: 'Admin' }"
          ><i class="fa fa-cog m-1" style="font-size: 24px"></i
        ></router-link>

        <router-link :to="{ name: 'Carrinho' }">
          <!-- badge com o contador de itens no carrinho | verificar a posição dele pra ficar acima do carrinho-->
          <i class="fa fa-shopping-cart m-1" style="font-size: 24px">
            <span id="nav-contador-itens">{{ contadorItensCarrinho }}</span>
          </i></router-link
        >
      </div>
    </div>
  </nav>
</template>
<script>
import sweetalert from 'sweetalert'
export default {
  name: "Navbar",
  //declarar uma prop pra passar dinamicamente o contador
  props: ["contadorItensCarrinho"],
  data() {
    return {
      token: null,
    };
  },
  methods: {
    signout() {
      localStorage.removeItem("token");
      this.token = null;
      sweetalert({
        title : 'Obrigada e volte sempre!',
        text: 'Logout efetuado com sucesso.',
        icon: 'success'
      });
      //emitir um evento qnd fizer o logout que zera o contador de itens do cliente
      this.$emit("resetaContadorItensCarrinho");
      //leva o cliente para a home após logout
      this.$router.push({ name: "Home" });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
};
</script>
<style scoped>
#logo {
  width: 120px;
  margin-left: 20px;
}
a {
  color: #03273b;
}

.special-bg {
  background: #000000;
  background: -webkit-linear-gradient(to right, #ffffff, #e4e4e4);
  background: linear-gradient(to right, #ffffff, #e4e4e4);
  box-shadow: 1px 1px 2px #03273b;
}
.icons-navbar img {
  margin-left: 5px;
  margin-right: 5px;
}
#navbarConta {
  color: #03273b;
}
.nav-link {
  color: #03273b;
}
#navbarNavegar {
  color: #03273b;
}
/*
criar um classe pra refatorar os icones fontawesom fa

*/
#nav-contador-itens {
  background-color: rgb(99, 8, 8);
  color: whitesmoke;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  font-size: 15px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  margin-left: 10px;
}
</style>