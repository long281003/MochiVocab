<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import store from '@/store';
const props = defineProps(['show', 'isEditMode', 'topicData'])
const emit = defineEmits(['update:show'])

const topicName = ref('')
const description = ref('')
const course = ref('')
const descriptionError = ref(false)
const imageFile = ref(null);
const imageURL = ref('');
const courseError = ref(false)
const nameErr = ref(false)
const fileInput = ref(null);
const imagePreview = ref(null);
const allCourse = computed(() => store.getters.getAllCourse)

const handleFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file; // Lưu file ảnh
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const closeModal = () => {
    emit('update:show', false)
    description.value = ""
    topicName.value = ""
    course.value = ""
    imagePreview.value = ""
    imageFile.value = null;
  imageURL.value = '';

}
watch(() => props.topicData, (newData) => {
    if (props.isEditMode && newData) {
        topicName.value = newData.topicName
        description.value = newData.description
        imageURL.value = newData.imageURL || '';
    }
})

const uploadImage = async () => {
  try {
    if (imageFile.value) {
      const formData = new FormData();
      formData.append('file', imageFile.value);
        const response = await store.dispatch('uploadImg', formData); 
      console.log(response)
      if (response && response.data && response.data.url) {
        return response.data.url; 
      }
    }
  } catch (error) {
    console.log(error)
    toast.error('Tải ảnh lên thất bại!');
  }
  return null;
};

const handleSubmit = async () => {
    let uploadedImageURL = '';
    if (imageFile.value) {
      uploadedImageURL = await uploadImage(); // Upload ảnh và lấy URL
      if (!uploadedImageURL) {
        return;
      }
    }
         const body = {
            topicName: topicName.value,
            description: description.value,
            course: course.value,
             imageURL: uploadedImageURL || imageURL.value,
        }
    try {
            
             if (props.isEditMode) {
                 const result = await store.dispatch('updateTopic', { id: props.topicData.id, body })
                 if (result) {
                     toast.success('Cập nhập thành công')
                    closeModal()
                 } else {
                    toast.error('Cập nhật thất bại. Vui lòng thử lại!')
                }
             } else {
                if ( !topicName.value.trim() || !description.value.trim() || !course.value.trim()) {
                    toast.error('Vui lòng nhập đủ thông tin')
                    descriptionError.value = false
                        courseError.value = false
                    nameErr.value = false
                        return
                 }
                const result = await store.dispatch('addUser',  body)
                    if (result) {
                        toast.success("Thêm thành công")
                        closeModal()
                    } else {
                        descriptionError.value = false
                        courseError.value = false
                        nameErr.value = false
                        toast.error("thất bại")
                    }
                }
        
        } catch (error) {
            console.log(error)
        }
}

onMounted(async () => {
    await store.dispatch('fetchAllCourse')
})
</script>

<template>
    <div v-if="props.show"
        class="fixed d-login inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-2  bg-white rounded-md shadow-xl">
            <div class="w-[650px] p-5">
                <div class="flex pb-5">
                    <div>
                        <h4 class="text-xl">Thêm mới chủ đề</h4>
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
                <form class="max-w-[600px] mx-auto grid xl:grid-cols-2 gap-5">
                    <div>
                        <label>Tên chủ đề (EN)</label>
                        <input type="text" placeholder="Nhập tên" v-model="topicName"
                            :class="['w-full border text-gray-900 text-sm mb-4 rounded-lg p-3.5', nameErr ? 'border-red-500' : 'border-gray-300']" />
                    </div>
                    <div class="mb-4">
                        <label>Tên chủ đề (VI)</label>
                        <input type='text' placeholder="Nhập description" v-model="description"
                            :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', descriptionError ? 'border-red-500' : 'border-gray-300']" />
                        
                    </div>
                    <div class='relative mb-4'>
                        <label class="block mb-1 font-semibold text-gray-600">Chọn khóa học áp dụng</label>
                        <select
                        v-model="course"
                         :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', courseError ? 'border-red-500' : 'border-gray-300']"
                        >
                        <option v-for="course in allCourse" :key="course.id" :value="course.courseName">
                            {{ course.courseName }}
                        </option>
                        </select>
                    </div>
                    <div class=" mb-4">
                        <label class="block mb-1 font-semibold text-gray-600">Ảnh chủ đề</label>
                        <div
                        class="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-24 cursor-pointer"
                        @click="handleFileInput"
                        >
                        <input
                            ref="fileInput"
                            type="file"
                            accept="image/*"
                            @change="handleFileChange"
                            class="hidden"
                        />
                        <div v-if="imagePreview" class="flex items-center justify-center h-full">
                            <img :src="imagePreview" alt="Preview" class="max-h-full object-cover" />
                        </div>
                        <div v-else class="text-gray-400">+ Tải lên</div>
                        </div>
                    </div>
                </form>
                <div class="flex gap-2 justify-end"> 
                        <div v-if="!isEditMode">
                            <button @click="closeModal" class="border rounded-lg w-20  border-sky-500 p-2">Hủy</button>
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