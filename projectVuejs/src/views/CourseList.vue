<script setup>
import store from '@/store';
import { computed, onMounted } from 'vue';

const isOpen = computed(() => store.getters.isModalCourse)

const closeModal = () => {
    store.dispatch('closeModalCourse')
}
const listCourse = computed(() => store.getters.getCourse)

const handleClick = () => {
  closeModal()
}

onMounted( async () => {
  await store.dispatch('fetchCourseList')
})
</script>

<template>
    <div>
        <div v-show="isOpen" class="popup-overlay flex justify-center items-center dia-log">
        <div class="max-w-[800px] popup ">
            <div class="relative bg-amber-400 text-center font-semibold rounded-b-2xl p-3.5 text-2xl">
                <img src="../assets/close.png" width="40" class="absolute cursor-pointer "
                 @click="closeModal" />
                <p class="text-center font-semibold text-3xl">Danh sách khóa học</p>
            </div>
            <h1 class="text-center text-2xl font-semibold my-5">Lộ trình gợi ý cho bạn</h1>
            <div class="flex justify-center">
                <div class="w-[750px] px-24">
                  <router-link v-for="course of listCourse" :key="course.id" :to="{name: 'topic', params: {id: course.id}}" @click="handleClick">
                    <div class="py-4 cursor-pointer">
                        <div  class="relative bg-amber-400 p-5 rounded-xl w-full shadow-xl transition-transform duration-700 transform hover:scale-105 hover:shadow-2xl">
                            <h3 class="text-2xl font-semibold ml-5">{{ course.courseName }}</h3>
                            <div class="m-6 flex items-center gap-5">
                                <img src="../assets/target_icon.png" width="60" />
                                <p class=" text-xl">{{ course.courseTarget }}</p>
                            </div>
                            <div class="mx-6 flex items-center gap-5">
                                <img src="../assets/icon_vocab.webp" width="60" />
                                <p class="text-xl">{{ course.description }}</p>
                            </div>
                        </div>
                    </div>
                  </router-link>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<style>
.dia-log {
    z-index: 999;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup {
  background: #fff;
  max-height: 100%;
  overflow-y: scroll;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}
.popup::-webkit-scrollbar {
  display: none; /* Chrome, Safari và Edge */
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7c72e;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-size: 18px;
}

.popup-header button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.popup-subtitle {
  margin: 15px 0;
  font-size: 14px;
  color: #666;
}

.popup-content {
  padding: 10px 0;
}

.course-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.course-card.highlight {
  background: #fef4d3;
  border-color: #f7c72e;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.start-badge {
  background: #f7c72e;
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 15px;
}

h3 {
  font-size: 16px;
  margin: 0;
}

ul {
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}

li {
  font-size: 14px;
  line-height: 1.6;
}
.hover-effect {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-effect:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
}
</style>