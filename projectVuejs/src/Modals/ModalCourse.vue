<script setup>
import { ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import store from '@/store';
const props = defineProps(['show', 'isEditMode', 'courseData'])
const emit = defineEmits(['update:show'])

const courseName = ref('')
const courseTarget = ref('')
const description = ref('')
const courseNameError = ref(false)
const courseTargetError = ref(false)
const descriptionErr = ref(false)

const closeModal = () => {
    emit('update:show', false)
    courseName.value = ""
    courseTarget.value = ""
    description.value = ""
}

watch(() => props.courseData, (newData) => {
    if (props.isEditMode && newData) {
        courseName.value = newData.courseName
        courseTarget.value = newData.courseTarget
        description.value = newData.description
    }
})

const handleSubmit = async () => {
         const body = {
            courseName: courseName.value,
            courseTarget: courseTarget.value,
            description: description.value,
        }
         try {
             if (props.isEditMode) {
                 const result = await store.dispatch('updateCourse', { id: props.courseData.id, body })
                 if (result) {
                     toast.success('Cập nhập thành công')
                     await store.dispatch('fetchListCourse')
                    closeModal()
                 } else {
                    toast.error('Cập nhật thất bại. Vui lòng thử lại!')
                }
             } else {
                 if ( !courseName.value.trim() || !courseTarget.value.trim() || !description.value.trim()) {
                     toast.error('Vui lòng nhập đủ thông tin')
                    courseNameError.value = false
                        courseTargetError.value = false
                     descriptionErr.value = false
                        return
                 }
                const result = await store.dispatch('addCourse',  body)
                    if (result) {
                        toast.success("Thêm thành công")
                         await store.dispatch('fetchListCourse')
                        closeModal()
                    } else {
                        courseNameError.value = false
                        courseTargetError.value = false
                        descriptionErr.value = false
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
                        <h4 class="text-xl">Thêm khóa học</h4>
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
                        <label>Tên khóa học</label>
                        <input type="text" v-model="courseName" placeholder="Nhập thông tin"
                            :class="['w-full border text-gray-900 text-sm mb-4 rounded-lg p-3.5', courseNameError ? 'border-red-500' : 'border-gray-300']" />
                    </div>
                    <div class="mb-4">
                        <label>Mục tiêu khóa</label>
                        <input type='text' v-model="courseTarget" placeholder="Nhập thông tin"
                            :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', courseTargetError ? 'border-red-500' : 'border-gray-300']" />
                        
                    </div>
                    <div class="relative mb-4">
                        <label>Nội dung khóa học</label>
                        <input type='text' 
                            v-model="description" placeholder="Nhập thông tin"
                            :class="['w-full border  text-gray-900 text-sm rounded-lg p-3.5', descriptionErr ? 'border-red-500' : 'border-gray-300']" />
                    </div>
                </form>
                <div class="flex gap-2 justify-end"> 
                        <div v-if="!isEditMode">
                            <button @click="closeModal" class="border rounded-lg w-20  border-sky-500 p-2">Hủy</button>
                        </div>
                        <div @click="handleSubmit">
                            <button class="bg-sky-500 text-white font-semibold p-2 rounded-lg mb-6">{{ !isEditMode ? "Thêm mới" : "Sửa " }}</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    
</style>