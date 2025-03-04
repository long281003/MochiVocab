<script setup>
import store from '@/store';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const openModal = () => {
  store.dispatch('openlModalCourse')
}
const router = useRoute()
const id = computed(() => router.params.id);
const listTopics = computed(() => store.getters.getCourseId)
const token = sessionStorage.getItem('authtoken')
const courseName = computed(() => {
  if (listTopics.value && listTopics.value.length > 0) {
    return listTopics.value[0].course.courseName;
  }
  return 'Khóa học không xác định';  
});

const fetchTopics = async () => {
  if (id.value) {
    await store.dispatch('fetchTopic', id.value);
  }
};

onMounted(async () => {
    if (id.value) {
         await fetchTopics()
    }
})

watch(id, async () => {
  await fetchTopics();
});

</script>

<template>
    <div class="flex justify-center items-center">
        <div class=" pt-10 flex-colums justify-center">
            <div class="flex justify-center">
                <div @click="openModal" class=" w-[550px] bg-amber-400 text-center cursor-pointer font-semibold rounded-2xl p-3.5 text-2xl">
                    <p class="text-center">{{ courseName }}</p>
                </div>
            </div>
            <div class="flex justify-center mt-7">
                <div class="w-[600px]">
                    <img src="../assets/start_here.webp" class="relative right-16" />
                    <router-link v-for="topic of listTopics" :key="topic.id" :to="{name: 'learning', params: {id: topic.id}}">
                        <div 
                        :class="['flex p-3 rounded-xl items-center  cursor-pointer my-5 shadow-xl transition-transform duration-700 transform hover:scale-105 hover:shadow-2xl',
                      token ? 'bg-amber-400 hover:bg-amber-300' : 'bg-gray-100 hover:bg-gray-100']">
                        <div class="bg-white rounded-full p-1">
                            <img :src="topic.image" width="80" class="rounded-full" :style="token ? 'filter: grayscale(0%)' : 'filter: grayscale(100%)'"/>
                            
                        </div>
                        <div :class="['ml-4', token ? 'text-black' : 'text-gray-500']">
                            <h3 class="text-2xl font-semibold">{{ topic.topicName }}</h3>
                            <p>{{ topic.description }}</p>
                        </div>
                    </div>
                    </router-link>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.hover-effect {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-effect:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
}
</style>