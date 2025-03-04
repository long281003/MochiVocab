<template>
    <div class="">
        <div class="bar-chart">
            <div class="bars">
                <div class="bar-container" v-for="(item, index) in data" :key="index">
                            <span class="count" :style="{ animationDelay: `${index * 0.2}s` }"
                            >
                                <b>{{ item.count }}</b> từ
                            </span>
                        <div class="bar" :style="{
                                height: `${(item.count / maxCount) * 200}px`,
                                animationDelay: `${index * 0.2}s`,
                                backgroundColor: item.color,}">
                        </div>
                        <div class="thanh-bars"></div>
                        <span class="level">{{ item.level }}</span>
                        
                </div>
            </div>
        </div>
        <div class="text-center">
            <button class="btn-next" @click="handleNext">Ôn tập ngay</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['learningModeChange']);

const maxCount = Math.max(1, ...props.data.map((item) => item.count));

// Handle the "Ôn tập ngay" button click
const handleNext = () => {
  emit('learningModeChange', true); 
};
</script>

<style scoped>
.bar-chart {
    display: flex;
    justify-content: center;
    text-align: center;   
}

.bars {
  width: 500px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 400px;
  position: relative;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  width: 60px;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: var(--height, 0);
  transition: height 0.3s ease, background-color 0.3s ease;
}

.count {
  color: black;
  font-weight: bold;
  padding: 5px 0;
  opacity: 0;
  animation: fade-in 0.5s forwards;
}

.level {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}

.thanh-bars {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  height: 8px;
  background-color: #b5b5b5;
  border-radius: 50px;
}

.btn-next {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-next:hover {
  background-color: #0056b3;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>