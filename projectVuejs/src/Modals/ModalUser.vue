<script setup>
import { ref, watch } from 'vue';
import IconEye from '@/components/icons/IconEye.vue';
import IconClockEye from '@/components/icons/IconClockEye.vue';
import { toast } from 'vue3-toastify';
import store from '@/store';
const props = defineProps(['show', 'isEditMode', 'userData'])
const emit = defineEmits(['update:show'])

const showPassword = ref(false)
const fullName = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const emailError = ref(false)
const passwordError = ref(false)
const nameErr = ref(false)
const roleErr = ref(false)
const toggleshowPassword = () => {
    showPassword.value = !showPassword.value;
};
const closeModal = () => {
    emit('update:show', false)
    email.value = ""
    fullName.value = ""
    password.value = ""
    role.value = ""
}
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

watch(() => props.userData, (newData) => {
    if (props.isEditMode && newData) {
        fullName.value = newData.fullName
        email.value = newData.email
        role.value = newData.role
    }
})

const handleSubmit = async () => {
         const body = {
            fullName: fullName.value,
            email: email.value,
            password: password.value,
            role: role.value,
            subscriptionPlan: "none"
        }
         try {
             if (props.isEditMode) {
                 const result = await store.dispatch('updateUser', { id: props.userData.userId, body })
                 if (result) {
                     toast.success('Cập nhập thành công')
                    closeModal()
                 } else {
                    toast.error('Cập nhật thất bại. Vui lòng thử lại!')
                }
             } else {
                 if ( !fullName.value.trim() || !email.value.trim() || !password.value.trim() || !role.value.trim() || !role.value.trim()) {
                     toast.error('Vui lòng nhập đủ thông tin')
                    emailError.value = false
                        passwordError.value = false
                     nameErr.value = false
                     roleErr.value = false
                        return
                }
                 if (!props.isEditMode || password.value.trim()) {
                    if (!validatePassword(password.value)) {
                        toast.error('Mật khẩu phải có ít nhất 8 ký tự, chứa ký tự đặc biệt, chữ in hoa và chữ thường')
                        passwordError.value = true
                        return;
                    }
                }
                const result = await store.dispatch('addUser',  body)
                    if (result) {
                        toast.success("Thêm thành công")
                        closeModal()
                    } else {
                        emailError.value = false
                        passwordError.value = false
                        nameErr.value = false
                        roleErr.value = false
                        toast.error("thất bại")
                    }
                }
        
        } catch (error) {
            console.log(error)
        }
}
</script>

<template>
    <div v-if="props.show"
        class="fixed d-login inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-2  bg-white rounded-md shadow-xl">
            <div class="w-[450px] p-5">
                <div class="flex pb-5">
                    <div>
                        <h4 class="text-xl">Thêm mới người dùng</h4>
                    </div>
                    <button @click="closeModal"
                        class="flex text-gray-400 cursor-pointer hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <hr class="pb-5"/>
                <form class="max-w-[450px] mx-auto">
                    <div>
                        <label>Tên hiển thị</label>
                        <input type="text" placeholder="Nhập tên" v-model="fullName"
                            :class="['w-full border text-gray-900 text-sm mb-4 rounded-lg p-3.5', nameErr ? 'border-red-500' : 'border-gray-300']" />
                    </div>
                    <div class="mb-4">
                        <label>Email</label>
                        <input type='text' placeholder="Nhập email" v-model="email"
                            :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', emailError ? 'border-red-500' : 'border-gray-300']" />
                        
                    </div>
                    <div :class="['relative mb-4', isEditMode ? 'hidden': 'block']">
                        <label>Mật khẩu</label>
                        <input :type="showPassword ? 'text' : 'password'" placeholder='Nhập mật khẩu' :disabled="isEditMode"
                            v-model="password"
                            :class="['w-full border  text-gray-900 text-sm rounded-lg p-3.5', passwordError ? 'border-red-500' : 'border-gray-300']" />
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            @click="toggleshowPassword">
                            <IconEye :disabled="isEditMode" v-if="showPassword" />
                            <IconClockEye v-else />
                        </span>
                        <span class="text-slate-500">Mật khẩu bao gồm 8 ký tự</span>
                    </div>
                    <div class=" mb-4">
                        <label>Phân loại</label>
                         <select v-model="role"
                        :class="['w-full border  text-gray-900 text-sm rounded-lg p-3.5', roleErr ? 'border-red-500' : 'border-gray-300']">
                        <option value="ROLE_ADMIN">ADMIN</option>
                        <option value="ROLE_USER">USER</option>
                    </select>
                    </div>
                </form>
                <div class="flex gap-2 justify-end"> 
                        <div v-if="!isEditMode">
                            <button  class="border rounded-lg w-20  border-sky-500 p-2">Hủy</button>
                        </div>
                        <div @click="handleSubmit">
                            <button class="bg-sky-500 text-white font-semibold p-2 rounded-lg mb-6">{{ !isEditMode ? "Tạo mới" : "Sửa " }}</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    
</style>