<script setup>
import store from '@/store';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute()
const id = computed(() => router.params.id);

const fetchVocab = async () => {
  if (id.value) {
    await store.dispatch('fetchTopic', id.value);
  }
};

onMounted(async () => {
    if (id.value) {
        await fetchVocab()
    }
})

watch(id, async () => {
    await fetchVocab()
})

// State
const flipped = ref(false); // Trạng thái lật thẻ

const props = defineProps({
  word: {
    type: String,
    required: true,
  },
  pron: {
    type: String,
    required: true,
  },
   mean: {
    type: String,
    required: true,
  },
   exam: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    required: true
  }
});

// Play âm thanh
const playNormal = () => {
  const audio = new Audio(props.audio);
  audio.play();
};

const playSlow = () => {
  const audio = new Audio(props.audio);
  audio.playbackRate = 0.6; // Giảm tốc độ phát
  audio.play();
};

// Lật thẻ
const handleCardClick = () => {
  flipped.value = !flipped.value;
};
</script>

<template>
  <div>
    <div class="flex justify-center items-center pt-28">
      <div class="card-container" @click="handleCardClick">
        <div :class="['card', flipped ? 'flipped' : '']">
          <!-- Mặt trước của thẻ -->
          <div class="card-front" v-if="!flipped">
            <div class="sound-btn">
              <button class="sound-btn__normal" @click.stop="playNormal">🔊</button>
              <button class="sound-btn__slow" @click.stop="playSlow">🐌</button>
            </div>
            <div class="text-center pt-24 ">
              <p class="text-2xl font-bold pb-2">{{ props.word }}</p>
              <p class="px-4 text-lg">{{ props.exam }}</p>
            </div>
          </div>

          <!-- Mặt sau của thẻ -->
          <div class="card-back" v-else>
            <div class="sound-btn">
              <button class="sound-btn__normal" @click.stop="playNormal">🔊</button>
              <button class="sound-btn__slow" @click.stop="playSlow">🐌</button>
            </div>
            <div class="text-center pt-24">
              <b class="text-xl">{{ props.word }}</b>
              <p class="pron">{{ props.pron }}</p>
              <p class="mean">{{ props.mean }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.card-container {
  width: 350px;
  height: 400px;
  perspective: 1000px;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: #e2e1e1;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-front {
  background-color: #e8e6e6;
}

.card-back {
  background-color: #ffeb3b;
  transform: rotateY(180deg);
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

.pron {
  font-style: italic;
  color: #555;
}

.mean {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}
</style>