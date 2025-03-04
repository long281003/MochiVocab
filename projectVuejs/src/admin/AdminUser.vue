<script setup>
import store from '@/store';
import { ref, computed, onMounted } from 'vue';
import IconPen from '@/components/icons/IconPen.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import ModalUser from '@/Modals/ModalUser.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import { toast } from 'vue3-toastify';

const showModalUser = ref(false)
const isEditMode = ref(false)
const userData = ref(null)
const fullName = ref('')
const email = ref('')
const role = ref('')
const totalPage = ref(0)
const page = ref(0)
const size = ref(5)
const listUser = computed(() => store.getters.getListUser)

const openModalAddUser = () => {
    isEditMode.value = false
    userData.value = null
    showModalUser.value = true
}
const openModalUpdateUser = (user) => {
    isEditMode.value = true
    userData.value = user
    showModalUser.value = true
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
    const res = await store.dispatch('fetchListUser', { page: page.value, size: size.value })
    if (res) {
        totalPage.value = res.data.page.totalPages || 0;
    }
}

const handleDelete = async (userId) => {
  const confirmed = confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
  if (confirmed) {
    const success = await store.dispatch('deleteUser', userId);
    if (success) {
        toast.success('Xóa người dùng thành công!');
      await fetchData()
    } else {
      toast.error('Xóa người dùng thất bại. Vui lòng thử lại!');
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

const planTranslations = {
        '6_months': '6 tháng',
        '1_year': '1 năm',
        '3_years': '3 năm',
    };
    
// gói dịch vụ
const getSubscriptionPlan = (plan) => {
  if (plan === 'none' || !plan) return 'Chưa đăng ký';
  return planTranslations[plan] || 'Chưa đăng ký';
};

// Ngày hết hạn gói
const getSubscriptionEndDate = (date) => {
  return date ? formattedDate(date) : 'Không có';
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
                            Tên hiển thị
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phân loại
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ngày cập nhập
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Gói sử dụng
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ngày hết gói
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Hành động
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) of listUser" :key="user.id" class="">
                        <th class="px-6 py-4 ">
                            {{ page * size + index + 1 }}
                        </th>
                        <td class="px-6 py-4">
                            {{ user.fullName }}
                        </td>
                        <td class="px-6 py-4">
                            {{ user.email }}
                        </td>
                        <td class="px-6 py-4">
                            {{ user.role }}
                        </td>
                         <td class="px-6 py-4">
                            {{ formattedDate(user.createdAt) }}
                        </td>
                         <td class="px-6 py-4">
                            {{ getSubscriptionPlan(user.subscriptionPlan) }}
                        </td>
                         <td class="px-6 py-4">
                            {{ getSubscriptionEndDate(user.subscriptionEndDate) }}
                        </td>
                        <td class="px-6 py-4">
                            <button @click="handleDelete(user.userId)" class="px-4"><IconTrash/></button>
                            <button @click="openModalUpdateUser(user)"><IconPen/></button>
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
<ModalUser :show="showModalUser" :isEditMode="isEditMode" :userData="userData" @update:show="showModalUser = $event"/>
</template>
