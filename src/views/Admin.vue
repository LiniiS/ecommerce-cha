<template>
  <div class="container">
    <section id="painel">
      <h1 class="title">Painel Administrador</h1>
      <p>Gerenciamentos disponíveis</p>
      <div class="btn-group-justified" role="group">
        <router-link :to="{ name: 'Cliente' }">
          <button type="button" class="btn btn-special" role="group">
            Clientes
          </button>
        </router-link>
        <router-link :to="{ name: 'ProdutoAdmin' }">
          <button type="button" class="btn btn-special" role="group">
            Produtos
          </button>
        </router-link>
        <router-link :to="{ name: 'Categoria' }">
          <button type="button" class="btn btn-special" role="group">
            Categorias
          </button>
        </router-link>
        <router-link :to="{ name: 'Categoria' }">
          <button type="button" class="btn btn-special" role="group">
            Cupons
          </button>
        </router-link>
        <router-link :to="{ name: 'Categoria' }">
          <button type="button" class="btn btn-special" role="group">
            Trocas e Devoluções
          </button>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#painel {
  padding-top: 20vh;
}
</style>