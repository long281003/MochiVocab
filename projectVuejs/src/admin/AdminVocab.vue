<script setup>
import store from '@/store';
import { ref, computed, onMounted } from 'vue';
import IconPen from '@/components/icons/IconPen.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import { toast } from 'vue3-toastify';
import ModalVocab from '@/Modals/ModalVocab.vue';

const showModalVocab = ref(false)
const isEditMode = ref(false)
const voCabData = ref(null)
const word = ref('')
const meaning = ref('')
const topicName = ref('')
const totalPage = ref(0)
const page = ref(0)
const size = ref(5)
const listVocab = computed(() => store.getters.getListVocab)
const allTopic = computed(() => store.getters.getAllTopic)


const openModalAddUser = () => {
    isEditMode.value = false
    voCabData.value = null
    showModalVocab.value = true
}
const openModalUpdateUser = (vocab) => {
    isEditMode.value = true
    voCabData.value = vocab
    showModalVocab.value = true
}

const formattedDate = (dateString) => {
    if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
}

const fetchData = async () => {
    const res = await store.dispatch('fetchListVocab', { page: page.value, size: size.value })
    if (res) {
        totalPage.value = res.data.page.totalPages || 0;
    }
}

const handleDelete = async (id) => {
  const confirmed = confirm('Bạn có chắc chắn muốn xóa chủ đề này không?');
  if (confirmed) {
    const success = await store.dispatch('deleteVocab', id);
    if (success) {
        toast.success('xóa chủ đề thành công!');
      await fetchData()
    } else {
      toast.error('xóa chủ đề thất bại. Vui lòng thử lại!');
    }
      }
};

const handleNextPage = async () => {
    if (page.value < totalPage.value - 1) {
        page.value += 1;
        await fetchData();
    } else {
        toast.info('Bạn đang ở trang cuối cùng.');
    }
};

const handlePrePage = async () => {
    if (page.value > 0) {
        page.value -= 1;
        await fetchData();
    } else {
        toast.info('Bạn đang ở trang đầu tiên.');
    }
};

onMounted(async() => {
    fetchData()
    await store.dispatch('fetchAllTopic')
})

</script>

<template>
<div>

    <div class="bg-white p-2 rounded-lg">
        <div class="flex justify-between items-center">
            <h2>Danh sách người dùng</h2>
            <div @click="openModalAddUser" class="flex items-center gap-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold p-2 rounded-lg cursor-pointer">
                <IconAdd/>
                <button >Thêm mới</button>
            </div>
        </div>
        <div class="relative overflow-x-auto pt-5">
            <table  class="w-full text-sm text-left rtl:text-right">
                <thead class="text-xs  uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                           ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Từ vựng
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nghĩa tiếng việt
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Chủ đề
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ngày cập nhật
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Hành động
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(vocab, index) of listVocab" :key="vocab.id" class="">
                        <th class="px-6 py-4 ">
                            {{ page * size + index + 1 }}
                        </th>
                        <td class="px-6 py-4">
                            {{ vocab.word }}
                        </td>
                        <td class="px-6 py-4">
                            {{ vocab.meaning }}
                        </td>
                        <td class="px-6 py-4">
                            {{ vocab.topic ? vocab.topic?.topicName : 'Không có' }}
                        </td>
                         <td class="px-6 py-4">
                            {{ formattedDate(vocab.createdAt) }}
                        </td>
                        <td class="px-6 py-4">
                            <button @click="handleDelete(vocab.id)" class="px-4"><IconTrash/></button>
                            <button @click="openModalUpdateUser(vocab)"><IconPen/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center gap-3 items-center pt-4">
            <button
                class="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg"
                @click="handlePrePage"
                :disabled="page === 0"
            >
                Trang trước
            </button>
            <span>Trang {{ page + 1 }} / {{ totalPage }}</span>
            <button
                class="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg"
                @click="handleNextPage"
                :disabled="page === totalPage - 1"
            >
                Trang sau
            </button>
         </div>
    </div>
</div>
<ModalVocab :show="showModalVocab" :isEditMode="isEditMode" :voCabData="voCabData" @update:show="showModalVocab = $event"/>
</template>
<style>
.select{
height: 300px; /* Chiều cao tối đa của dropdown */
  overflow-y: auto;
}
</style>