<script setup>
import store from '@/store';
import { ref } from 'vue';
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
});
const selectedVocab = ref([]);

// Khi người dùng chọn checkbox
// const toggleSelection = (word) => {
//     const index = selectedVocab.value.indexOf(word);
//     if (index === -1) {
//         selectedVocab.value.push(word);
//     } else {
//         selectedVocab.value.splice(index, 1);
//     }
// };
const saveSelectedVocab = async () => {
    if (selectedVocab.value.length === 0) {
        alert("Vui lòng chọn ít nhất một từ vựng!");
        return;
    }
    try {
        await store.dispatch('saveSelectedVocab', selectedVocab.value);
    } catch (error) {
        console.error("Lỗi khi lưu từ vựng:", error);
        alert("Đã xảy ra lỗi!");
    }
};
</script>

<template>
    <div class="py-10">
        <div class="text-center text-2xl py-5 font-semibold">
            <h1>Chọn từ vựng muốn thêm vào sổ tay</h1>
        </div>
        <div class="overflow-x-auto p-5 vocab-table">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr v-for="(item, index) of props.data" :key="index"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <input type="checkbox" :value="item.word " v-model="selectedVocab"
                                class="mr-3 cursor-pointer">
                            <div>
                                <p class="text-lg"> {{ item.word }}</p>
                                <p class="text-blue-500">{{ item.pronunciation }}</p>
                            </div>
                        </th>
                        <td class="px-6 py-4">
                            {{ item.meaning }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex my-4 justify-center pt-5">
            <div class='relative  w-40 h-12 font-semibold mt-2 rounded-full bg-lime-600 '></div>
            <button @click="saveSelectedVocab" class='absolute w-40 h-12 font-semibold p-2 rounded-full mb-6 bg-lime-500 '>Tiếp tục</button>
        </div>
    </div>
</template>

<style>
        .vocab-table {
            max-height: 400px;
            /* Điều chỉnh chiều cao theo nhu cầu */
            overflow-y: auto;
            border-radius: 8px;
        }
    
        /* Tùy chỉnh thanh cuộn */
        .vocab-table::-webkit-scrollbar {
            width: 8px;
        }
    
        .vocab-table::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
    
        .vocab-table::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
    
        .vocab-table::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
</style>