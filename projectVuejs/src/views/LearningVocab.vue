<script setup>
import FlipCard from '@/components/FlipCard.vue';
import InputOtp from './InputOtp.vue';
import { computed, onMounted, ref, watch } from 'vue';
import store from '@/store';
import { useRoute } from 'vue-router';
import ModalExit from '@/Modals/ModalExit.vue';
import TableVocab from './TableVocab.vue';

const router = useRoute()
const id = computed(() => router.params.id)
const vocabularyData = computed(() => store.getters.getVocabLearn)
const audioRef = ref(null);

const incorrectSteps = ref([]);
const showModal = ref(false)
const vocabList = ref(vocabularyData.value); 
const currentIndex = ref(0); 
const currentStep = ref(0); 
const reply = ref('');
const isCorrect = ref(false);
const showNotification = ref(false);
const isCompleted = ref(false);
const modelValue = ref("");
const vocab = computed(() => vocabList.value[currentIndex.value]);
const numInputs = computed(() => vocab.value?.word?.length || 0);

const openModal = () => {
  showModal.value = true
}

const handleCompletion = () => {
  if (incorrectSteps.value.length > 0) {
    // Nếu có step sai, quay lại sửa
    const firstIncorrect = incorrectSteps.value[0];
    currentIndex.value = firstIncorrect.index
    // currentIndex.value = incorrectSteps.value[0].index;
    // currentStep.value = incorrectSteps.value[0].step;
    currentStep.value = 0;
    reply.value = '';
    modelValue.value = '';
    isCorrect.value = false;
    showNotification.value = false;
  } else {
    // Nếu không có step sai, hiển thị bảng từ vựng
    isCompleted.value = true;
  }
};

const nextStep = () => {
  if (currentStep.value < 2) {
    currentStep.value++;
    reply.value = ''
     modelValue.value = '';
    isCorrect.value = false;
    showNotification.value = false
  } else {
    if (currentIndex.value < vocabList.value.length - 1) {
      currentStep.value = 0;
      currentIndex.value++;
    } else {
      // isCompleted.value = true;
      handleCompletion()
    }
    // currentIndex.value = (currentIndex.value + 1) % vocabList.value.length;
  }
};

const nextWord = () => {
  if (currentIndex.value < vocabList.value.length - 1) {
    currentStep.value = 0; 
    currentIndex.value++;
  // currentIndex.value = (currentIndex.value + 1) % vocabList.value.length; // Chuyển sang từ tiếp theo
  reply.value = ''; 
  modelValue.value = ''; 
  isCorrect.value = false; 
    showNotification.value = false; 
    playAudio()
  } else {
    // isCompleted.value = true;
    handleCompletion()
  }
};

const checkAnswer = () => {
  // let isAnswerCorrect = false;
  // if (currentStep.value === 1) {
  //   isCorrect.value = reply.value.trim().toLowerCase() === vocab.value?.word?.toLowerCase();
  //   showNotification.value = true;
  // } else if (currentStep.value === 2) {
  //   isCorrect.value = modelValue.value.trim().toLowerCase() === vocab.value?.word?.toLowerCase();
  //   showNotification.value = true;
  // }
  // isCorrect.value = isAnswerCorrect;
  // showNotification.value = true;
  // if (!isAnswerCorrect) {
  //   incorrectSteps.value.push({ index: currentIndex.value, step: currentStep.value });
  // }
  if (currentStep.value === 1) {
    isCorrect.value = reply.value.trim().toLowerCase() === vocab.value?.word?.toLowerCase();
    if (!isCorrect.value && !incorrectSteps.value.some(step => step.index === currentIndex.value)) {
      incorrectSteps.value.push({ index: currentIndex.value, step: currentStep.value });
    }
    showNotification.value = true;
  } else if (currentStep.value === 2) {
    isCorrect.value = modelValue.value.trim().toLowerCase() === vocab.value?.word?.toLowerCase();
    
    if (!isCorrect.value && !incorrectSteps.value.some(step => step.index === currentIndex.value)) {
      incorrectSteps.value.push({ index: currentIndex.value, step: currentStep.value });
    }
    showNotification.value = true;
  }
};


const fetchVocabulary = () => {
  return new Promise((resolve) => setTimeout(() => resolve(vocabularyData.value), 1000));
};

const fetchData = async () => {
  if (id.value) {
    await store.dispatch('fetchVocabLearn', id.value)
  }
}

watch(incorrectSteps, (newVal) => {
  if (newVal.length === 0 && !isCompleted.value) {
    isCompleted.value = true;
  }
});

onMounted(async () => {
  if (id.value) {
    await fetchData()
  }
  const data = await fetchVocabulary();
  vocabList.value = data;
  // Play audio on initial step 0
  if (currentStep.value === 0) {
    playAudio();
  }
});

const playAudio = () => {
  if (audioRef.value && vocab.value?.audio) {
    audioRef.value.src = vocab?.value.audio;
    audioRef.value.play();
  }
};

const playNormal = () => {
  const audio = new Audio(vocab?.value.audio);
  audio.play();
};

const playSlow = () => {
  const audio = new Audio(vocab?.value.audio);
  audio.playbackRate = 0.6; // Giảm tốc độ phát
  audio.play();
};

watch(currentStep, (newStep) => {
  if (newStep === 0 || newStep === 1) {
    playAudio();
  }
});
watch(incorrectSteps, (newVal) => {
  if (newVal.length === 0 && !isCompleted.value) {
    isCompleted.value = true;
  }
});



</script>

<template>
  <div class="flex justify-center">
    <div class="w-[850px] h-screen bg-white">
      <button @click="openModal"
        class="flex mr-1 text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <div v-if="isCompleted">
        <TableVocab :data="vocabList" />
      </div>
      <div v-else>
        <!-- Step 0: FlipCard -->
        <div v-if="currentStep === 0">
          <FlipCard :word="vocab?.word" :exam="vocab?.exampleSentence" :pron="vocab?.pronunciation"
            :mean="vocab?.meaning" :audio="vocab?.audio" />
          <div class="flex pt-12 justify-center">
            <button @click="nextStep" class="w-52 h-12 font-semibold p-2 rounded-full bg-lime-500">Tiếp tục</button>
          </div>
          <div @click="nextWord" class="flex justify-center pt-3 text-gray-500 font-semibold cursor-pointer">Mình đã
            thuộc từ này</div>
        </div>
        <!-- Step 1: Nghe và viết lại -->
        <div v-if="currentStep === 1">
          <div class="flex flex-col py-36 items-center space-y-6">
            <h2 class="text-gray-500 text-2xl font-medium">Nghe và viết lại</h2>
            <div class="sound-btn py-10">
              <button class="sound-btn__normal" @click.stop="playNormal">🔊</button>
              <button class="sound-btn__slow" @click.stop="playSlow">🐌</button>
            </div>
            <input type="text" v-model="reply" placeholder="Nhập câu trả lời của bạn"
              class="w-full max-w-lg border rounded-lg p-4 text-gray-900 focus:ring focus:ring-sky-300 focus:outline-none shadow-lg" />
          </div>
          <div class="flex pt-14 justify-center">
            <button @click="checkAnswer" class="w-52 h-12 font-semibold p-2 rounded-full bg-lime-500">Kiểm tra</button>
          </div>
        </div>

        <!-- Step 2: Điền từ -->
        <div v-if="currentStep === 2">
          <div class="flex flex-col items-center space-y-6 py-36">
            <h2 class="text-gray-500 text-lg font-medium">Điền từ</h2>
            <div class="text-2xl font-bold text-gray-900">{{ vocab?.meaning }}</div>
            <InputOtp v-model="modelValue" :num-inputs="numInputs" />
          </div>
          <div class="flex pt-40 justify-center">
            <button @click="checkAnswer" class="w-52 h-12 font-semibold p-2 rounded-full bg-lime-500">Kiểm tra</button>
          </div>
        </div>
      </div>

      <!--Thông báo-->
      <div v-if="showNotification && !(currentStep === 0)" class="relative left-6 bottom-48 w-[800px]">
        <div
          :class="['flex flex-col items-center justify-center rounded-lg text-white p-6', isCorrect ? 'bg-lime-400' : 'bg-red-500']">
          <div class="flex items-center mb-4 space-x-4">
            <button @click="playAudio" class="bg-white rounded-full p-4 shadow-lg">
              🔊
            </button>
            <div>
              <h1 class="text-2xl font-bold">{{ vocab?.word }}</h1>
              <p class="text-lg italic">{{ vocab?.pronunciation }}</p>
               <p class="text-lg mb-2">{{ vocab?.meaning }}</p>
            </div>
          </div>
         
          <p class="text-xl mb-6">{{ vocab?.exampleSentence }}</p>
          <button @click="nextStep"
            class="bg-white text-red-500 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-100">
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  </div>
  <audio ref="audioRef"></audio>
  <ModalExit :show="showModal" @update:show="showModal = $event" />
</template>

<style scoped>
input {
  outline: none;
}
.sound-btn {
  bottom: 30px;
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  position: relative;
}

.sound-btn__normal,
.sound-btn__slow {
  border: none;
  background-color: #f3f2f2;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2)
}

.sound-btn__normal:hover,
.sound-btn__slow:hover {
  background-color: #dcdada;
}

</style>