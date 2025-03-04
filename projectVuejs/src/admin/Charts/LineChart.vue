<template>
  <canvas ref="lineChart" class="line-chart"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const dailyActiveUsers = ref({
  labels: ['Premium','Free', 'Premium', 'Free', 'Premium', 'Free', 'Premium', 'Free', 'Premium', 'Free', 'Premium', 'Free', 'Premium', 'Free'],
  data: [20, 32, 50, 60, 58, 70, 67, 54, 72, 80, 33, 45, 88, 54],
}); 
const lineChart = ref(null);

onMounted(() => {
  new Chart(lineChart.value, {
    type: 'line',
    data: {
      labels: dailyActiveUsers.value.labels,
      datasets: [
        {
          label: 'Số lượng',
          data: dailyActiveUsers.value.data,
          backgroundColor: '#007bff',
        },
      ],
    },
  });
});
</script>
<style scoped>
.line-chart{
    width: 100%;   /* Chiếm hết chiều rộng của container */
  height: 50px;
}
</style>