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

      <!--      Search Bar
      <form class="form-inline ml-auto mr-auto">
        <div class="input-group">
          <input
            size="70"
            type="text"
            class="form-control"
            placeholder="pesquise pelos produtos"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="search-button-navbar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </form>
      -->
      <!-- Dropdown Navegar -->

      <!-- dropdown Contas -->
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a
            href="#"
            id="navbarConta"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
          >
            <img
              src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/000000/external-login-arrow-line-royyan-wijaya-detailed-outline-royyan-wijaya.png"
              alt="Painel do Cliente"
            />
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

      <div class="icons-navbar">
        <router-link v-if="token" :to="{ name: 'ClienteLogado' }"
          ><img
            src="https://img.icons8.com/pastel-glyph/24/03273b/person-male--v3.png"
            alt="Painel do Cliente"
        /></router-link>
        <router-link :to="{ name: 'Admin' }"
          ><img
            src="https://img.icons8.com/material-outlined/24/03273b/settings--v1.png"
            alt="Painel do Admin"
        /></router-link>
        <router-link :to="{ name: 'Home' }"
          ><img
            src="https://img.icons8.com/material-outlined/24/03273b/shopping-cart--v1.png"
            alt="Painel do Carrinho"
        /></router-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      token: null,
    };
  },
  methods: {
    signout() {
      localStorage.removeItem("token");
      this.token = null;
      this.$router.push({name: 'Home'});
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
</style>