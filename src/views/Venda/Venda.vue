<template>
  <div class="container">
    <section id="painel">
      <h1 class="title">Painel Administrador</h1>
      <small class="text-muted">verificar em um outro momento -> https://vue-chartjs.org/guide/#chart-with-api-data</small><br>
            <small class="text-muted">verificar em um outro momento -> https://www.chartjs.org/docs/master/getting-started/integration.html#bundlers-webpack-rollup-etc</small>
      <h2 class="title mt-3 mb-3"> Gráfico de Volume de Vendas por Categoria (mockado)</h2>
      <Line :chart-data="chartdata" />
    </section>
  </div>
</template>
<script>
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale, LineElement)

export default {
  name: "LineChart",
  components: { Line },
  extends: Line,
  data() {
    return {
      chartdata: {
        labels: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ],
        datasets: [
          {
            label:"Ervas",
            data: [12, 15, 16, 20, 16, 14, 15, 21, 15, 16, 12, 25],
            borderColor: "#bd7946",
            pointBackgroundColor: "#bd7946",
            pointBorderColor: "#bd7946",
            backgroundColor: "rgba(255, 255, 255, 0)",
          },
          {
            label:"Oolong",
            data: [10, 15, 10, 19, 20, 25, 20, 22, 25, 28, 30, 27],
            borderColor: "#674b96",
            pointBackgroundColor: "#674b96",
            pointBorderColor: "#674b96",
            backgroundColor: "rgba(255, 255, 255, 0)",
          },
          {
            label:"Verde",
            data: [20, 12, 14, 18, 20, 21, 22, 18, 25, 24, 26, 30],
            borderColor: "#258057",
            pointBackgroundColor: "#258057",
            pointBorderColor: "#258057",
            backgroundColor: "rgba(255, 255, 255, 0)",
          },
          {
            label:"Preto",
            data: [15, 20, 13, 15, 22, 22, 23, 20, 25, 24, 15, 23],
            borderColor: "#010804",
            pointBackgroundColor: "#010804",
            pointBorderColor: "#010804",
            backgroundColor: "rgba(255, 255, 255, 0)",
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          display: false,
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
<style scoped>
#painel {
  padding-top: 10vh;
}

</style>