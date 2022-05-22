<template>
  <div class="container">
    <section id="painel">
      <h1 class="title">Painel Administrador</h1>
      <p>Gerenciamentos disponíveis</p>
     <Line :chart-data="chartData" />
    </section>
  </div>
</template>
<script>
import { Line } from 'vue-chartjs'


export default {
  extends: Line,
  data: () => ({
    chartData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai','Jun', 'Jul', 'Ago', Set, 'Out', 'Nov', 'Dez'],
    datasets: [
        {
            data: [12, 20, 27, 22, 14, 10, 15, 21, 15, 32, 12, 25],
            borderColor: "#08273b",
            pointBackgroundColor: "#08273b",
            pointBorderColor: "#08273b",
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
            data: [3, 12, 17, 10, 15, 21, 15, 12, 25, 20, 30, 40],
            borderColor: "#03273b",
            pointBackgroundColor: "#03273b",
            pointBorderColor: "#03273b",
            backgroundColor: 'rgba(255, 255, 255, 0)'
        }
    ]
    },
    options: {
      responsive: true,
      legend: {
        display: true
      }
    }
  }),

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
<style scoped>
#painel {
  padding-top: 20vh;
}
</style>