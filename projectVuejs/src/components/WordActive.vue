<script setup>
import IconTrash from '@/components/icons/IconTrash.vue';


const props = defineProps({
  vocab: {
    type: Array,
    required: true
  },
  onDelete: {
    type: Function,
    required: true
  }
});

</script>

<template>
  <div>
    <div class="overflow-x-auto p-5 vocab-table">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          <tr v-for="(item, index) of props.vocab" :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <p class="text-lg"> {{ item.vocabulary.word }}</p>
              <p class="text-blue-500"> {{ item.vocabulary.pronunciation }}</p>
            </th>
            <td class="px-6 py-4">
              {{ item.vocabulary.meaning }}
            </td>
            <td class="pl-15 py-4">
              <button @click="props.onDelete(item.id)" class="px-4">
                <IconTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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