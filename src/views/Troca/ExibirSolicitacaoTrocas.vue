<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center mb-5 mt-5">
        <h3>Solicitações de Trocas</h3>
        <span>Painel do Administrador</span>

        <!--
                <router-link :to="{ name: 'AdicionaCliente'}">
                    <button class="btn btn-special">Novo Cliente</button>
                </router-link>   
                -->
      </div>
    </div>
    <!-- search cliente -->
    <hr />
    <router-link :to="{ name: 'Admin' }">
      <button
        type="button"
        class="btn btn-special float-left mb-2"
        role="group"
      >
        Voltar
      </button>
    </router-link>
    <form class="float-right mb-2">
      <div class="form-row">
        <div class="form-group">
          <label class="text-muted text-left" for="cliente"
            >Filtrar pelo defeito:</label
          >
          <input
            type="search"
            class="form-control form-control-sm"
            @input="filtro = $event.target.value"
            placeholder="ex. defeito na embalagem"
          />
        </div>
      </div>
    </form>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Troca</th>
             <th>Cliente</th>
            <th>Motivo da Troca</th>
            <th>Id do Item</th>
            <th>Status</th>

            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="troca of trocasComFiltro" :key="troca.id">
            <td>{{ troca.id }}</td>
            <td>{{ troca.clienteId }}</td>
            <td>{{ troca.motivo }}</td>
            <td>{{ troca.itemPedidoId }}</td>
            <td>{{ troca.status }}</td>

            <td>
              <button
                class="btn btn-special mr-2"
                @click="autorizarTroca(troca.id)"
              >
                <img src="https://img.icons8.com/ios/20/ffffff/ok--v1.png" />
                Autorizar
              </button>

              <button class="btn btn-special" @click="rejeitarTroca(troca.id)">
                <img
                  src="https://img.icons8.com/ios/20/ffffff/delete--v1.png"
                />
                Rejeitar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import sweetAlert from "sweetalert";

export default {
  name: "ExibirSolicitacaoTrocas",

  data() {
    return {
      trocas: null,
      filtro: "",
      solicitacoes: [],
    };
  },
  props: ["baseURL"],
  methods: {
    /*
    listaTrocas(){
      axios.get(`${this.baseURL}pedido/trocas`).then((res) => {
        const result = res.data;
        this.solicitacoes = result.trocas;        
        })
    },

  */
    //"trocas.2.id"

    autorizarTroca(id) {
      //mover pra controller de trocas
      axios.post(`${this.baseURL}admin/troca/autoriza/${id}`).then(
        (response) => {
          if (response.status === 201) {
            sweetAlert({
              text: "Troca autorizada! Cupom gerado com sucesso!",
              icon: "success",
            });
          }
        },
        (err) => console.log(err)
      );
    },

    rejeitarTroca(id) {
      //mover pra controller de trocas
      axios.post(`${this.baseURL}admin/troca/rejeita/${id}`).then(
        (response) => {
          if (response.status === 200) {
            sweetAlert({
              text: "Troca rejeitada!",
              icon: "success",
            });
          }
        },
        (err) => console.log(err)
      );
    },
  },
  created() {
    axios
      //  .get("https://api-asantos-cha.herokuapp.com/cliente/admin/clientes")
      .get(`${this.baseURL}pedido/trocas`)
      .then((resp) => {
        this.trocas = resp.data;
      });
  },
  computed: {
    trocasComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.trocas.filter((troca) => exp.test(troca.motivo));
      } else {
        return this.trocas;
      }
    },
  },
};
</script>
<style scoped>
h3 {
  color: #2c3e50;
  font-weight: bold;
}
.btn-special {
  font-size: 0.7em;
}
</style>