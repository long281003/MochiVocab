<script setup>
import store from '@/store';
import { computed, onMounted, ref, watch } from 'vue';

const levels = ref([             
        {id: 1, label: "Cấp độ 1", width: "100%", color: "#FF6B6B" },
        {id: 2, label: "Cấp độ 2", width: "100%", color: "#FFD93D" },
        {id: 3, label: "Cấp độ 3", width: "100%", color: "#4CD3C2" },
        {id: 4, label: "Cấp độ 4", width: "100%", color: "#4A90E2" },
        {id: 5, label: "Cấp độ 5", width: "100%", color: "#2D3E89" },
])

const selectedLevel = ref(levels.value.id)
const keyWord = ref('')
const vocab = computed(() => store.getters.getVocabLever)

const selectLevel = (index) => {
  selectedLevel.value = index;
}
const fetchVocab = async () => {
  await store.dispatch('fetchVocabLever', { keyWord: keyWord.value, level: selectedLevel.value });
};
watch(keyWord, () => {
  fetchVocab()
})

onMounted(async () => {
  if (selectedLevel.value !== null) {
   await fetchVocab();
  }
});
</script>

<template>
  <div>
     <div class="progress-container p-10">
    <div class="level"
      v-for="level in levels" :key="level.id" @click="selectLevel(level.id)">
        <div class="level-label pb-4">
           <span :class="{ activeLabel: selectedLevel === level.id }">
            {{ level.label }}
          </span> 
        </div>
        <div
          class="progress-bar"
          :class="{ active: selectedLevel === level.id }"
          :style="{ width: level.width, backgroundColor: level.color }"
        ></div>
      </div>
    </div>
     <div class="flex justify-center my-5 ml-20">
        <div class="w-[650px] flex justify-center">
        <input placeholder="Gõ vào đây từ bạn muốn tìm" v-model="keyWord"
          class="relative bg-gray-200 p-3 rounded-full w-full " />
          <button
            class="btn bg-lime-500 hover:bg-lime-400 rounded-full h-10 p-4 flex justify-center items-center">Search</button>
          </div>
      </div>
        

      <div v-if="vocab" class="overflow-x-auto p-5">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                  <tr v-for="(item, index) of vocab" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <p> {{ item.vocabulary.word }}</p>
                        <p>{{ item.vocabulary.pronunciation }}</p>
                      </th>
                      <td class="px-6 py-4">
                          {{ item.vocabulary.meaning }}
                      </td>
                      <td class="px-6 py-4">
                          Laptop
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div>
         <div class="flex justify-center items-center pt-8">
          <img src="../assets/cry.webp" width="250"/>
        </div>
        <p class="text-center font-semibold text-xl">Mochi không tìm được từ này trong danh sách từ đã ôn của bạn. <br/> Bạn thử tìm từ khác nha.</p>
      </div>
     
  </div>
 
</template>

<style>
.progress-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.level {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;
}

.progress-bar {
  height: 8px;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: all 0.3s ease;
}

/* Thanh được click sẽ to hơn */
.progress-bar.active {
  height: 12px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.level-label {
  color: #787676;
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
}

.activeLabel {
  font-weight: bold;
  color: #3d3d3d;
}
.stars {
  font-size: 14px;
  color: #ffbc00;
  margin-left: 5px;
}
.btn{
  position: relative;
  right: 85px;
  top: 4px;
}
</style>