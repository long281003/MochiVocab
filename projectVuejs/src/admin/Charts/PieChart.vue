<template>
  <canvas ref="pieChart"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import store from '@/store';

const pieChart = ref(null);

onMounted( async () => {

   if (!store.getters.getSegement) {
    await store.dispatch('fetchSegement');
  }
   const segmentData = store.getters.getSegement;
  const labels = Object.keys(segmentData).map((key) => `Tháng ${key}`);
  const data = Object.values(segmentData);
  new Chart(pieChart.value, {
    type: 'pie',
    data: {
      labels:labels,
      datasets: [
        {
          label: 'Tỷ lệ',
          data: data,
          backgroundColor: ['#007bff', '#f748f4', '#f7dd48', '#dc3545'],
        },
      ],
    },
  });
});
</script>