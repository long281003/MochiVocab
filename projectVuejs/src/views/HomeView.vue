<script setup>
import store from '@/store';
import ReviewChart from '../admin/Charts/ReviewChart.vue';
import { computed, onMounted, ref } from 'vue';

const openModal = () => {
  store.dispatch('openlModalCourse')
}
const token = sessionStorage.getItem('authtoken')
const chartData = ref([
  { count: 0, level: 1, color: '#EC5858' },
  { count: 0, level: 2, color: '#FCCC0A' },
  { count: 0, level: 3, color: '#56CCF0' },
  { count: 0, level: 4, color: '#307FEC' },
  { count: 0, level: 5, color: '#20367F' },
]);

const totalWords = computed(() => {
  return chartData.value.reduce((sum, item) => sum + item.count, 0);
});

onMounted( async () => {
   try {
    const response = await store.dispatch('fetchChartData');
    const data = response.data || {}; // Lấy dữ liệu từ phản hồi API

    // Cập nhật `chartData` với dữ liệu từ API
    chartData.value.forEach((item) => {
      const level = item.level.toString(); // Chuyển level thành chuỗi để so sánh với key của API
      item.count = data[level] || 0; // Nếu không có giá trị tương ứng, mặc định là 0
    });
  } catch (error) {
    console.log(error)
  }
});
</script>

<template>
  <main>
    <div v-if="!token || totalWords === 0" class="pt-40">
      <div>
        <div class="flex justify-center items-center">
          <img src="../assets/has_no_word.webp" width="220" />
        </div>
        <p class="text-center font-semibold text-xl pt-7 px-2">Để kích hoạt tính năng "Thời điểm vàng" hãy học 1 bài
          học từ
          mới</p>
        <div class="flex my-4 justify-center">
          <button @click="openModal" class=" bg-lime-500 text-white  w-60 h-12 font-semibold p-2 rounded-full mt-8">Học
            từ
            mới</button>
        </div>
      </div>
    </div>
    <div v-else >
      <ReviewChart 
      :data="chartData" 
  />
    </div>
  </main>
</template>
