<script setup>
import store from '@/store';
import { ref, computed, onMounted } from 'vue';
import IconPen from '@/components/icons/IconPen.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import { toast } from 'vue3-toastify';
import ModalTopic from '@/Modals/ModalTopic.vue';

const showModalTopic = ref(false)
const isEditMode = ref(false)
const topicData = ref(null)
const fullName = ref('')
const email = ref('')
const role = ref('')
const totalPage = ref(0)
const page = ref(0)
const size = ref(5)
const listTopic = computed(() => store.getters.getListTopic)
const allCourse = computed(() => store.getters.getAllCourse)

const openModalAddUser = () => {
    isEditMode.value = false
    topicData.value = null
    showModalTopic.value = true
}
const openModalUpdateUser = (user) => {
    isEditMode.value = true
    topicData.value = user
    showModalTopic.value = true
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
    const res = await store.dispatch('fetchListTopic', { page: page.value, size: size.value })
    if (res) {
        totalPage.value = res.data.page.totalPages || 0;
    }
}

const handleDelete = async (userId) => {
  const confirmed = confirm('Bạn có chắc chắn muốn xóa chủ đề này không?');
  if (confirmed) {
    const success = await store.dispatch('deleteTopic', userId);
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
    await store.dispatch('fetchAllCourse')
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
                            Tên chủ đề (EN)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tên chủ đề (VI)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Khóa học
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
                    <tr v-for="(topic, index) of listTopic" :key="topic.id" class="">
                        <th class="px-6 py-4 ">
                            {{ page * size + index + 1 }}
                        </th>
                        <td class="px-6 py-4">
                            {{ topic.topicName }}
                        </td>
                        <td class="px-6 py-4">
                            {{ topic.description }}
                        </td>
                        <td class="px-6 py-4">
                            {{ topic.course ? topic.course?.courseName : 'Không có' }}
                        </td>
                         <td class="px-6 py-4">
                            {{ formattedDate(topic.createdAt) }}
                        </td>
                        <td class="px-6 py-4">
                            <button @click="handleDelete(topic.id)" class="px-4"><IconTrash/></button>
                            <button @click="openModalUpdateUser(topic)"><IconPen/></button>
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
<ModalTopic :show="showModalTopic" :isEditMode="isEditMode" :topicData="topicData" @update:show="showModalTopic = $event"/>
</template>
