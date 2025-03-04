<script setup>
  import { computed, onMounted } from 'vue';
import BarChart from './Charts/BarChart.vue';
import PieChart from './Charts/PieChart.vue';
import LineChart from './Charts/LineChart.vue';
import store from '@/store';
// Dữ liệu thống kê
const totalRevenue = computed(() => store.getters.getRevenue)
const totalUser = computed(() => store.getters.getTotalUser)
const totalVip = computed(() => store.getters.getTotalVip)
const totalCourse = computed(() => store.getters.getTotalCourse)
const totalVocab = computed(() => store.getters.getTotalVocab)

onMounted(async () => {
  if (!totalRevenue.value) {
    await store.dispatch('fetchTotalRevenue')
  }
  if (!totalUser.value) {
    await store.dispatch('fetchTotalUser')
  }
   if (!totalVip.value) {
    await store.dispatch('fetchTotalVip')
  }
  if (!totalCourse.value) {
    await store.dispatch('fetchTotalCourse')
  }
  if (!totalVocab.value) {
    await store.dispatch('fetchTotalVocab')
  }
})
const formatNumber = (num) => (num ? num.toLocaleString('vi-VN') : '0');

</script>

<template>
    <div class="dashboard">
    <!-- Thống kê tổng quan -->
    <div class="stats-grid">
      <div  class="stat-card">
        <h3>Tổng doanh thu</h3>
        <p>{{ formatNumber(totalRevenue) }}</p>
      </div>
      <div  class="stat-card">
        <h3>Tổng số người dùng</h3>
        <p>{{ formatNumber(totalUser) }}</p>
      </div>
      <div  class="stat-card">
        <h3>Số người dùng VIP</h3>
        <p>{{ formatNumber(totalVip) }}</p>
      </div>
      <div  class="stat-card">
        <h3>Số khóa học</h3>
        <p>{{ formatNumber(totalCourse) }}</p>
      </div>
      <div  class="stat-card">
        <h3>Số từ vựng</h3>
        <p>{{ formatNumber(totalVocab) }}</p>
      </div>
    </div>
    <div class="flex">
        <div>
                <!-- Biểu đồ người dùng mới theo tháng -->
                <div class="chart-container w-[920px]">
                    <h3 class="p-3">Số lượng người dùng mới theo tháng</h3>
                    <bar-chart class="p-3"/>
                </div>
        </div>
        <div class="pl-3 w-[365px]">
            <!-- Tỷ lệ người dùng theo loại gói đăng ký -->
                <div class="chart-container">
                    <h3 class="p-3">Tỷ lệ người dùng theo loại gói đăng ký</h3>
                    <pie-chart class="p-3"/>
                </div>

                <!-- Số lượng người dùng hoạt động hàng ngày -->
                <div class="chart-container mt-3">
                    <h3>Số lượng người dùng hoạt động hàng ngày</h3>
                    <line-chart :data="dailyActiveUsers" />
                </div>
        </div>
                
    </div>
  </div>
</template>

<style>
    .dashboard {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.stat-card {
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.chart-container {
  background-color: #fff;
  padding: 1px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>