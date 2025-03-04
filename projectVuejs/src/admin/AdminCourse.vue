<script setup>
import store from '@/store';
import { ref, computed, onMounted } from 'vue';
import IconPen from '@/components/icons/IconPen.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import { toast } from 'vue3-toastify';
import ModalCourse from '@/Modals/ModalCourse.vue';

const showModalCourse = ref(false)
const isEditMode = ref(false)
const courseData = ref(null)
const courseName = ref('')
const description = ref('')
const courseTarget = ref('')
const totalPage = ref(0)
const page = ref(0)
const size = ref(5)
const listCourse = computed(() => store.getters.getListCourse)

const openModalAddUser = () => {
    isEditMode.value = false
    courseData.value = null
    showModalCourse.value = true
}
const openModalUpdateUser = (user) => {
    isEditMode.value = true
    courseData.value = user
    showModalCourse.value = true
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
    const res = await store.dispatch('fetchListCourse', {
        page: page.value, size: size.value,
        courseName: courseName.value || '',
        description: description.value || '',
        courseTarget: courseTarget.value || '',
    })
    if (res) {
        totalPage.value = res.data.page.totalPages || 0;
    }
}

const handleDelete = async (id) => {
  const confirmed = confirm('Bạn có chắc chắn muốn xóa khóa học này không?');
  if (confirmed) {
    const success = await store.dispatch('deleteCourse', id);
    if (success) {
        toast.success('Xóa khóa học thành công!');
      await fetchData()
    } else {
      toast.error('Xóa khóa học thất bại. Vui lòng thử lại!');
    }
      }
};

const handleNextPage = async () => {
    if (page.value < totalPage.value - 1) {
        page.value += 1;
        await fetchData();
    } 
};

const handlePrePage = async () => {
    if (page.value > 0) {
        page.value -= 1;
        await fetchData();
    } 
};

onMounted(() => {
    fetchData()
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
                            Tên khóa học
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Mục tiêu
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nội dung
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ngày cập nhập
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(course, index) of listCourse" :key="course.id" class="">
                        <th class="px-6 py-4 ">
                            {{ page * size + index + 1 }}
                        </th>
                        <td class="px-6 py-4">
                            {{ course.courseName }}
                        </td>
                        <td class="px-6 py-4">
                            {{ course.courseTarget }}
                        </td>
                        <td class="px-6 py-4">
                            {{ course.description }}
                        </td>
                         <td class="px-6 py-4">
                            {{ formattedDate(course.createdAt) }}
                        </td>
                        <td class="px-6 py-4">
                            <button @click="handleDelete(course.id)" class="px-4"><IconTrash/></button>
                            <button @click="openModalUpdateUser(course)"><IconPen/></button>
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
<ModalCourse :show="showModalCourse" :isEditMode="isEditMode" :courseData="courseData" @update:show="showModalCourse = $event"/>
</template>
