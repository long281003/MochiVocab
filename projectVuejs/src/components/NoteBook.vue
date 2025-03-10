<script setup>
import WordActive from './WordActive.vue';
import store from '@/store';
import { computed, onMounted, ref, watch } from 'vue';
import Exception from './Exception.vue';
import { toast } from 'vue3-toastify';
const levels = ref([
    { id: 1, label: "Cấp độ 1", width: "100%", color: "#FF6B6B" },
    { id: 2, label: "Cấp độ 2", width: "100%", color: "#FFD93D" },
    { id: 3, label: "Cấp độ 3", width: "100%", color: "#4CD3C2" },
    { id: 4, label: "Cấp độ 4", width: "100%", color: "#4A90E2" },
    { id: 5, label: "Cấp độ 5", width: "100%", color: "#2D3E89" },
])

const selectedLevel = ref(levels.value[0].id)
const keyWord = ref('')
const vocab = computed(() => store.getters.getVocabLever)

const selectLevel = (id) => {
    selectedLevel.value = id;
    fetchVocab()
}
const fetchVocab = async () => {
    await store.dispatch('fetchVocabLever', { keyWord: keyWord.value, level: selectedLevel.value });
};
watch(selectedLevel, () => {
    fetchVocab()
})
onMounted(async () => {
    if (selectedLevel.value !== null) {
        await fetchVocab();
    }
});

const handleDelete = async (id) => {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa từ vựng này không?');
    if (confirmed) {
        const success = await store.dispatch('deleteWorlBook', id);
        if (success) {
            toast.success('xóa từ vựng thành công!');
            await fetchVocab()
        } else {
            toast.error('xóa từ vựng thất bại. Vui lòng thử lại!');
        }
    }
};
</script>

<template>
    <div>
        <div class="progress-container p-10">
            <div class="level" v-for="level in levels" :key="level.id" @click="selectLevel(level.id)">
                <div class="level-label pb-4">
                    <span :class="{ activeLabel: selectedLevel === level.id }">
                        {{ level.label }}
                    </span>
                </div>
                <div class="progress-bar" :class="{ active: selectedLevel === level.id }"
                    :style="{ width: level.width, backgroundColor: level.color }"></div>
            </div>
        </div>
        <div class="flex justify-center my-5 ml-20">
            <div class="w-[650px] flex justify-center">
                <input placeholder="Gõ vào đây từ bạn muốn tìm" v-model="keyWord"
                    class="relative bg-gray-200 p-3 rounded-full w-full " />
                <button @click="fetchVocab"
                    class="btn bg-lime-500 hover:bg-lime-400 rounded-full h-10 p-4 flex justify-center items-center">Search</button>
            </div>
        </div>
        <div class="p-5">
            <div>
                <WordActive v-if="vocab.length > 0" :vocab="vocab" :onDelete="handleDelete" />
                <div v-else-if="vocab.length === 0 ">
                    <div class="flex justify-center items-center pt-8">
                        <img src="../assets/cry.webp" width="250" />
                    </div>
                    <p class="text-center font-semibold text-xl">Mochi không tìm được từ này trong danh sách từ đã ôn
                        của bạn.
                        <br />
                        Bạn thử tìm từ khác nha.
                    </p>
                </div>
                <Exception v-else />
            </div>
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