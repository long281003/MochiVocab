<script setup>
import IconGraph from './icons/IconGraph.vue';
import store from '@/store';

const openModal = () => {
  store.dispatch('openlModalCourse')
}
</script>

<template>
    <div>
        <div class="flex gap-32 ">
            <router-link to="/">
                <IconGraph class="ml-2" />
                <p>Ôn tập</p>
            </router-link>
            <div @click="openModal" class="cursor-pointer">
                <img src="../assets/icon_vocab.webp" width="35" class="ml-5" />
                <p>Học từ mới</p>
            </div>
            <router-link to="/notebook">
                <img src="../assets/icon_notebook.webp" width="23" class="ml-2" />
                <p>Sổ tay</p>
            </router-link>
            <router-link to="/conversation">
                <img src="../assets/speaker.png" width="30" class="ml-2" />
                <p>Sự kiện</p>
            </router-link>
        </div>
    </div>
</template>