<template>
  <section class="section home">

  </section>
</template>

<script>
//  import Chart from './chart';

export default {
  name: 'Graphs',
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
  components: {}
};
</script>

<style scoped>

</style>
