<template>
  <canvas ref="barChart"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import store from '@/store';
const barChart = ref(null); 

onMounted(async () => {
   if (!store.getters.getMonth) {
    await store.dispatch('fetchMonth');
  }
  const monthData = store.getters.getMonth;
  const labels = Object.keys(monthData).map((key) => `Tháng ${key}`);
  const data = Object.values(monthData);
  new Chart(barChart.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Số lượng',
          data: data,
          backgroundColor: '#0fdaf5',
        },
      ],
    },
  });
});
</script>