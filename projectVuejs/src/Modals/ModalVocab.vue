<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import store from '@/store';
const props = defineProps(['show', 'isEditMode', 'voCabData'])
const emit = defineEmits(['update:show'])

const word = ref('')
const meaning = ref('')
const topicName = ref('')
const wordError = ref(false)
const meaningError = ref(false)
const topicNameErr = ref(false)
const allTopic = computed(() => store.getters.getAllTopic)
const allVocab = computed(() => store.getters.getAllVocab)

const closeModal = () => {
    emit('update:show', false)
    word.value = ""
    meaning.value = ""
    topicName.value = ""
}

watch(() => props.voCabData, (newData) => {
    if (props.isEditMode && newData) {
        word.value = newData.word
        meaning.value = newData.meaning
        topicName.value = newData.topicName
    }
}, { immediate: true })
onMounted(() => {
    if (props.isEditMode && props.voCabData) {
        word.value = props.voCabData.word || '';
        meaning.value = props.voCabData.meaning || '';
        topicName.value = props.voCabData.topicName || '';
    }
})

const fetchData = async () => {
    await store.dispatch('fetchListVocab', {page: 1, size: 5})
}

const handleSubmit = async () => {
         const body = {
            word: word.value,
            meaning: meaning.value,
            topicName: topicName.value,
        }
         try {
             if (props.isEditMode) {
                 const result = await store.dispatch('updateVocab', { id: props.voCabData.id, body })
                 if (result) {
                     toast.success('Cập nhập thành công')
                     fetchData()
                 } else {
                    toast.error('Cập nhật thất bại. Vui lòng thử lại!')
                }
             } else {
                const isDuplicate = allVocab.value.some((vocab) =>
                    vocab.word.toLowerCase() === word.value.toLowerCase() &&
                    vocab.topic?.topicName === topicName.value
                );
                if (isDuplicate) {
                    toast.error('Từ vựng đã tồn tại!');
                    return;
                }
                 if ( !word.value.trim() || !meaning.value.trim() || !topicName.value.trim()) {
                     toast.error('Vui lòng nhập đủ thông tin')
                     wordError.value = false
                        meaningError.value = false
                     topicNameErr.value = false
                        return
                 }
                const result = await store.dispatch('addVocab',  body)
                    if (result) {
                        toast.success("Thêm thành công")
                        fetchData()
                        closeModal()
                    } else {
                        wordError.value = false
                        meaningError.value = false
                        topicNameErr.value = false
                        toast.error("thất bại")
                    }
                }
        
        } catch (error) {
            console.log(error)
        }
}
onMounted(async() => {
    await store.dispatch('fetchAllTopic')
    await store.dispatch('fetchAllVocab')
})
</script>

<template>
    <div v-if="props.show"
        class="fixed d-login inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-2  bg-white rounded-md shadow-xl">
            <div class="w-[450px] p-5">
                <div class="flex pb-5">
                    <div>
                        <h4 class="text-xl">Thêm mới từ vựng</h4>
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
                        <label>Từ vựng</label>
                        <input type="text" v-model="word" placeholder="Nhập thông tin"
                            :class="['w-full border text-gray-900 text-sm mb-4 rounded-lg p-3.5', wordError ? 'border-red-500' : 'border-gray-300']" />
                    </div>
                    <div class="mb-4">
                        <label>nghĩa từ vựng</label>
                        <input type='text' v-model="meaning" placeholder="Nhập thông tin"
                            :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', meaningError ? 'border-red-500' : 'border-gray-300']" />
                        
                    </div>
                    <div class="relative mb-4">
                        <label>chọn chủ đề</label>
                        <select v-model="topicName"
                        :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', topicNameErr ? 'border-red-500' : 'border-gray-300']">
                        <option  v-for="(topic, index) of allTopic" :key="index" :value="topic.topicName">{{ topic.topicName }}</option>
                    </select>
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