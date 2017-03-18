<template>
  <section class="section home">
    <chart
      :data="chartData"
      :options="{ responsive: false, maintainAspectRatio: false }"
      :width="400"
      :height="200"
    />
  </section>
</template>

<script>
import Chart from './chart';

export default {
  name: 'graphs',
  data() {
    return {
      chartData: {
        labels: ['Completed', 'Pending', 'Delayed'],
        datasets: [
          {
            label: 'Tasks Status',
            backgroundColor: ['green', 'blue', 'red'],
            data: [40, 20, 10]
          }
        ]
      }
    };
  },
  components: {
    Chart
  }
};
</script>

<style scoped>

</style>
